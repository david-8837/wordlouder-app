# How Keys Are Assigned to the Macro Pad: End-to-End Pipeline
### The Complete Journey of a Key Assignment from UI Click to Microcontroller Flash Memory

This guide explains **exactly how the software and hardware communicate** when you assign a key in a configurator application (like Work Louder, VIA, or your own custom software) and how that keycode gets written into the macro pad's hardware memory so it works permanently, even on another computer without software installed.

---

## Table of Contents
1. [The Big Picture](#1-the-big-picture)
2. [Step 1: Frontend User Interaction (UI State Mutation)](#2-step-1-frontend-user-interaction-ui-state-mutation)
3. [Step 2: Keycode Encoding (String to 16-Bit Binary Scancode)](#3-step-2-keycode-encoding-string-to-16-bit-binary-scancode)
4. [Step 3: USB Packet Construction (The 64-Byte Raw HID Frame)](#4-step-3-usb-packet-construction-the-64-byte-raw-hid-frame)
5. [Step 4: Transmission over USB (WebHID API)](#5-step-4-transmission-over-usb-webhid-api)
6. [Step 5: Microcontroller Reception (Firmware Interrupt)](#6-step-5-microcontroller-reception-firmware-interrupt)
7. [Step 6: Writing to Non-Volatile Flash / EEPROM](#7-step-6-writing-to-non-volatile-flash--eeprom)
8. [The Runtime Execution: What Happens When You Press the Button](#8-the-runtime-execution-what-happens-when-you-press-the-button)
9. [Complete Side-by-Side Code Blueprint](#9-complete-side-by-side-code-blueprint)

---

## 1. The Big Picture

When you change a key from `A` to `Ctrl + C` or `Volume Up`, the data flows through 6 distinct stages:

```text
[ Browser / Software UI ]
       │
       │ 1. User clicks Keycap #4 on Layer 0 and selects "Ctrl + C"
       ▼
[ String-to-Binary Encoder ]
       │
       │ 2. Translates "Ctrl + C" into 16-bit binary integer: 0x0106
       ▼
[ Raw HID Packet Builder ]
       │
       │ 3. Builds 64-byte array: [ 0x03, 0x00, 0x04, 0x06, 0x01, 0x00, ... ]
       ▼
[ WebHID API / USB Cable ]
       │
       │ 4. device.sendReport(0, packet) -> Transmitted over USB wires
       ▼
[ Microcontroller RAM ]
       │
       │ 5. Firmware interrupt receives packet and updates keymaps[0][4] = 0x0106
       ▼
[ Flash / EEPROM Memory ]
       │ 6. Writes RAM buffer permanently to Flash sectors
       │    (Key stays saved forever even when unplugged)
       ▼
[ Physical Switch Pressed ] ──► Firmware sends USB Keyboard Report [0x01, 0x06]
```

---

## 2. Step 1: Frontend User Interaction (UI State Mutation)

In the user interface, the user selects a key on the canvas and chooses a binding from the drawer.

### What Happens in the Frontend React Code:
1. Clicking a keycap sets the active target:
   ```javascript
   setKeySelected({
     row: 1,      // Matrix Row
     index: 2,    // Matrix Column (Key ID #5)
     keyType: "base"
   });
   ```
2. The user picks a key (e.g. `"KC_C"` with `"Ctrl"` modifier) from the Action Drawer.
3. The store updates the active layer's layout object in memory:
   ```javascript
   // Inside the configurator state store:
   const updatedLayer = currentProfile.layers[activeLayerIndex].copy();
   updatedLayer.layout.base[1][2].keycode = "KC_C";
   updatedLayer.layout.base[1][2].modifiers = ["KC_LCTRL"];
   
   // Zustand store update:
   setLayerState(updatedLayer);
   ```

---

## 3. Step 2: Keycode Encoding (String to 16-Bit Binary Scancode)

Microcontrollers do **not** understand strings like `"KC_C"` or `"Ctrl"`. Everything must be converted into a compact **16-bit unsigned integer (`uint16_t`)**.

### How the 16-Bit Keycode is Formatted:
We pack modifiers and standard USB HID scancodes into 2 bytes (16 bits):

```text
Bit:    15  14  13  12  11  10   9   8   7   6   5   4   3   2   1   0
       ┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┐
Field: │ T   Y   P   E │GUI│ALT│SFT│CTL│       USB HID SCANCODE        │
       └───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┘
```

- **Bits 0–7 (Low Byte)**: The standard USB HID Keyboard Usage ID.
  - `0x04` = `A`, `0x05` = `B`, `0x06` = `C`, `0x29` = `Esc`, `0x2C` = `Space`.
- **Bits 8–11 (High Byte Flags)**: Modifier bitmasks.
  - Bit 8: `CTRL` (`0x0100`)
  - Bit 9: `SHIFT` (`0x0200`)
  - Bit 10: `ALT` (`0x0400`)
  - Bit 11: `GUI` / Win / Cmd (`0x0800`)
- **Bits 12–15 (Type Indicator)**:
  - `0x0` = Basic Keyboard Key
  - `0xE` = Consumer / Media Key (Volume Up, Mute, Play)
  - `0x8` = Macro Action (`KA_*`)
  - `0x9` = Multi-Action (`KM_*`)
  - `0xA` = Smart Action (`SA_*`)

### Example Encoding in JavaScript:
```javascript
function encodeKeycode(stringCode, modifiers = []) {
  const HID_MAP = {
    "KC_A": 0x04, "KC_B": 0x05, "KC_C": 0x06,
    "KC_ESC": 0x29, "KC_ENT": 0x28, "KC_SPC": 0x2C,
    "KC_VOLU": 0xE0E9, "KC_VOLD": 0xE0EA, "KC_MUTE": 0xE0E2
  };

  let code = HID_MAP[stringCode] || 0x0000;

  // Add modifier bit flags
  if (modifiers.includes("KC_LCTRL"))  code |= (1 << 8);  // 0x0100
  if (modifiers.includes("KC_LSHIFT")) code |= (1 << 9);  // 0x0200
  if (modifiers.includes("KC_LALT"))   code |= (1 << 10); // 0x0400
  if (modifiers.includes("KC_LGUI"))   code |= (1 << 11); // 0x0800

  return code; // For Ctrl + C: returns 0x0106 (Decimal: 262)
}
```

---

## 4. Step 3: USB Packet Construction (The 64-Byte Raw HID Frame)

Raw HID communications transfer fixed-size packets (standard USB full-speed interrupt size is **64 bytes**).

### Packet Anatomy for `CMD_SET_KEY`:
```text
Byte 0:  0x03   (Command ID: CMD_SET_KEY)
Byte 1:  0x00   (Target Layer: Layer 0)
Byte 2:  0x05   (Target Key Index: Key #5)
Byte 3:  0x06   (Keycode Low Byte: 0x06 = Key 'C')
Byte 4:  0x01   (Keycode High Byte: 0x01 = Ctrl Modifier)
Byte 5..63: 0x00 (Zero Padding to fill 64 bytes)
```

### Building the Packet in JavaScript:
```javascript
function buildSetKeyPacket(layerIndex, keyIndex, rawKeycode) {
  const packet = new Uint8Array(64);

  packet[0] = 0x03;                   // CMD_SET_KEY
  packet[1] = layerIndex;             // e.g. 0
  packet[2] = keyIndex;               // e.g. 5
  packet[3] = rawKeycode & 0xFF;        // Low byte (0x06)
  packet[4] = (rawKeycode >> 8) & 0xFF; // High byte (0x01)

  return packet;
}
```

---

## 5. Step 4: Transmission over USB (WebHID API)

In the web browser, the **WebHID API** (`navigator.hid`) allows dispatching raw packets directly to the microcontroller without any driver or desktop server:

```javascript
async function sendKeyAssignment(hidDevice, layerIndex, keyIndex, keycodeString, modifiers) {
  // 1. Encode into 16-bit integer
  const binaryKeycode = encodeKeycode(keycodeString, modifiers);

  // 2. Build 64-byte frame
  const packet = buildSetKeyPacket(layerIndex, keyIndex, binaryKeycode);

  // 3. Send over USB Raw HID Interface (Report ID 0)
  await hidDevice.sendReport(0, packet);
  
  console.log(`[USB Out] Successfully sent Key ${keyIndex} -> 0x${binaryKeycode.toString(16)}`);
}
```

---

## 6. Step 5: Microcontroller Reception (Firmware Interrupt)

When the USB host dispatches the packet, the microcontroller's USB hardware triggers an **interrupt service routine (ISR)**.

In Arduino / RP2040 using `Adafruit_TinyUSB`, this is delivered to your callback:

```cpp
// Microcontroller Live RAM Memory Table
#define NUM_LAYERS 4
#define TOTAL_KEYS 9

uint16_t live_keymaps[NUM_LAYERS][TOTAL_KEYS];

// Callback executed instantly when a 64-byte USB packet arrives:
void raw_hid_receive_cb(uint8_t report_id, hid_report_type_t report_type, uint8_t const* buffer, uint16_t bufsize) {
  uint8_t command = buffer[0];

  if (command == 0x03) { // CMD_SET_KEY
    uint8_t layer = buffer[1];
    uint8_t key_index = buffer[2];
    uint16_t keycode = buffer[3] | (buffer[4] << 8); // Reconstruct 16-bit integer

    if (layer < NUM_LAYERS && key_index < TOTAL_KEYS) {
      // 1. Update active RAM matrix
      live_keymaps[layer][key_index] = keycode;
      
      Serial.printf("Assigned Key %d on Layer %d to 0x%04X\n", key_index, layer, keycode);
      
      // 2. Send acknowledgment back to Web App
      uint8_t ack_packet[64] = { 0x83, layer, key_index, 0x01 }; // 0x83 = ACK_SET_KEY
      usb_hid.sendReport(3, ack_packet, sizeof(ack_packet));
    }
  }
}
```

At this moment, **the key is already active in RAM**! If you press the physical button right now, it immediately outputs `Ctrl + C`.

---

## 7. Step 6: Writing to Non-Volatile Flash / EEPROM

RAM is volatile: if the user unplugs the macro pad, RAM is wiped. To make assignments permanent, the data must be written to **Flash Memory / LittleFS / EEPROM**.

```text
[ Live RAM Matrix ]  ──►  CMD_SAVE_FLASH (0x04)  ──►  [ Onboard SPI Flash Sector ]
```

### 1. The Save Trigger:
When the user clicks **"Save"** in the software, the frontend sends:
```javascript
async function commitChangesToFlash(hidDevice) {
  const savePacket = new Uint8Array(64);
  savePacket[0] = 0x04; // CMD_SAVE_FLASH
  await hidDevice.sendReport(0, savePacket);
}
```

### 2. Microcontroller Flash Write Logic:
```cpp
#include <LittleFS.h>

void save_keymap_to_flash() {
  File file = LittleFS.open("/keymap.bin", "w");
  if (file) {
    // Write the entire 2D matrix directly to Flash as binary bytes:
    file.write((uint8_t*)live_keymaps, sizeof(live_keymaps));
    file.close();
    Serial.println("Keymap successfully committed to permanent Flash memory!");
  }
}

// In raw_hid_receive_cb:
if (command == 0x04) { // CMD_SAVE_FLASH
  save_keymap_to_flash();
}
```

### 3. The Boot Sequence:
When you plug the macro pad into any computer, `setup()` runs and loads the saved configuration into RAM:
```cpp
void setup() {
  LittleFS.begin();
  
  if (LittleFS.exists("/keymap.bin")) {
    File file = LittleFS.open("/keymap.bin", "r");
    file.read((uint8_t*)live_keymaps, sizeof(live_keymaps));
    file.close();
    Serial.println("Loaded custom keymap from Flash memory.");
  } else {
    // First boot: load factory default keys
    load_factory_defaults();
  }
}
```

---

## 8. The Runtime Execution: What Happens When You Press the Button

Now that `0x0106` (`Ctrl + C`) is stored at `live_keymaps[0][4]`, here is what happens when you physically press that switch:

```cpp
void on_physical_switch_press(uint8_t key_index) {
  // 1. Look up the assigned 16-bit keycode from RAM:
  uint16_t keycode = live_keymaps[current_layer][key_index];

  // 2. Extract modifiers and base scancode:
  uint8_t scancode = keycode & 0xFF;         // 0x06 ('C')
  uint8_t modifiers = (keycode >> 8) & 0x0F; // 0x01 (CTRL)

  // 3. Construct USB HID Keyboard Report (8 bytes standard format):
  // Byte 0: Modifier mask
  // Byte 1: Reserved (0x00)
  // Byte 2..7: Up to 6 active keypress scancodes (6KRO)
  uint8_t keyboard_report[8] = { 0 };
  
  keyboard_report[0] = modifiers; // Sets CTRL bit
  keyboard_report[2] = scancode;  // Sets 'C' scancode

  // 4. Send report to operating system
  usb_hid.sendReport(1, keyboard_report, sizeof(keyboard_report));
}

void on_physical_switch_release(uint8_t key_index) {
  // Clear report to release keys
  uint8_t release_report[8] = { 0 };
  usb_hid.sendReport(1, release_report, sizeof(release_report));
}
```

The computer receives standard USB HID scancodes and immediately performs the **Copy (`Ctrl + C`)** operation!

---

## 9. Complete Side-by-Side Code Blueprint

### Frontend Helper (Pure JavaScript):
```javascript
// Complete function to rebind any key on any macro pad from your web browser:
async function assignKey(device, layer, keyIndex, keyName, modifiers = []) {
  const HID_KEYS = {
    "A": 0x04, "B": 0x05, "C": 0x06, "D": 0x07, "E": 0x08,
    "1": 0x1E, "2": 0x1F, "3": 0x20, "SPACE": 0x2C, "ENTER": 0x28,
    "VOL_UP": 0xE0E9, "VOL_DOWN": 0xE0EA, "MUTE": 0xE0E2
  };

  let code = HID_KEYS[keyName] || 0;
  if (modifiers.includes("CTRL"))  code |= (1 << 8);
  if (modifiers.includes("SHIFT")) code |= (1 << 9);
  if (modifiers.includes("ALT"))   code |= (1 << 10);
  if (modifiers.includes("GUI"))   code |= (1 << 11);

  // Send assignment to device RAM
  const packet = new Uint8Array(64);
  packet[0] = 0x03;               // CMD_SET_KEY
  packet[1] = layer;              // Target Layer
  packet[2] = keyIndex;           // Target Key
  packet[3] = code & 0xFF;        // Low byte
  packet[4] = (code >> 8) & 0xFF; // High byte
  await device.sendReport(0, packet);

  // Commit permanently to Flash memory
  const savePacket = new Uint8Array(64);
  savePacket[0] = 0x04;           // CMD_SAVE_FLASH
  await device.sendReport(0, savePacket);
}
```

### Firmware Receiver (Arduino / RP2040 C++):
```cpp
// Complete firmware handler for dynamic remapping:
void handle_raw_hid_packet(uint8_t const* packet) {
  switch (packet[0]) {
    case 0x03: { // CMD_SET_KEY
      uint8_t layer = packet[1];
      uint8_t key_id = packet[2];
      uint16_t keycode = packet[3] | (packet[4] << 8);
      
      keymaps[layer][key_id] = keycode;
      break;
    }
    case 0x04: { // CMD_SAVE_FLASH
      File f = LittleFS.open("/keys.dat", "w");
      f.write((uint8_t*)keymaps, sizeof(keymaps));
      f.close();
      break;
    }
  }
}
```

---

## 10. Summary

1. **In Software**: The user selects a visual keycap and an action.
2. **Encoding**: The software converts strings like `"Ctrl + C"` into a 16-bit integer (`0x0106`).
3. **Transport**: A 64-byte Raw HID frame is sent over USB via `navigator.hid.sendReport`.
4. **Execution in RAM**: The microcontroller updates its active lookup table in memory in less than 1 millisecond.
5. **Persistence in Flash**: The table is committed to Flash / LittleFS so it survives power loss and reboots.
6. **Hardware Firing**: When the switch contacts close, the firmware reads `keymaps[layer][key_id]` and dispatches standard USB Keyboard reports to the PC.
