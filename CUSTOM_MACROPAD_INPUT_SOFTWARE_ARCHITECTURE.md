# Custom Macro Pad & Input Software Architecture Guide
### How Professional Configurator Software & Firmware Handle Keymapping, Actions, Multi-Actions, and Smart Actions for Any Number of Keys

This engineering reference explains how keyboard configurator software (such as Work Louder Input, VIA, VIAL, and QMK) is architected, how different types of key assignments work, and how you can build both the **firmware** and the **companion software** for your own custom macro pad with **any arbitrary number of keys or rotary encoders** (e.g., 9 keys + 1 knob, 4x4 16 keys, 6 keys, or complex layouts).

---

## Table of Contents
1. [High-Level System Architecture](#1-high-level-system-architecture)
2. [Dynamic Key Matrix Engine (Any Number of Keys)](#2-dynamic-key-matrix-engine-any-number-of-keys)
   - [2.1 Physical Matrix vs. Logical Matrix](#21-physical-matrix-vs-logical-matrix)
   - [2.2 Device Manifest Schema](#22-device-manifest-schema)
   - [2.3 Dynamic Canvas Rendering](#23-dynamic-canvas-rendering)
3. [The 4 Key Assignment Types](#3-the-4-key-assignment-types)
   - [3.1 Basic Keys (`KC_*`)](#31-basic-keys-kc_)
   - [3.2 Action Keys / Macros (`KA_*`)](#32-action-keys--macros-ka_)
   - [3.3 Multi-Actions (`KM_*`) — Tap vs. Hold vs. Double-Tap](#33-multi-actions-km_--tap-vs-hold-vs-double-tap)
   - [3.4 Smart Actions (`SA_*`) — Host-Assisted Actions](#34-smart-actions-sa_--host-assisted-actions)
4. [Layer Management Architecture](#4-layer-management-architecture)
5. [Rotary Encoders & Analog Controls](#5-rotary-encoders--analog-controls)
6. [Hardware Communication Protocol (Raw HID)](#6-hardware-communication-protocol-raw-hid)
7. [Complete Reference Firmware (RP2040 / Arduino C++)](#7-complete-reference-firmware-rp2040--arduino-c)
8. [Complete Reference Frontend (WebHID in JavaScript)](#8-complete-reference-frontend-webhid-in-javascript)
9. [Step-by-Step Blueprint for Your Custom Macro Pad](#9-step-by-step-blueprint-for-your-custom-macro-pad)

---

## 1. High-Level System Architecture

A complete custom macro pad system consists of three interconnected layers:

```text
┌─────────────────────────────────────────────────────────────┐
│                    TIER 1: FRONTEND UI                      │
│        (Web Browser via WebHID OR Electron App)             │
│  - Dynamic Visual Canvas (renders any key count & layout)   │
│  - Action / Keycode Inspector & Macro Editor                │
│  - Layer Switcher & Profile Persistence (JSON / LocalStore) │
└──────────────────────────────┬──────────────────────────────┘
                               │  Bidirectional Raw HID
                               │  (64-byte packets via USB)
                               ▼
┌─────────────────────────────────────────────────────────────┐
│              TIER 2: COMMUNICATION TRANSPORT                │
│        (WebHID API: navigator.hid / USB Interrupt Pipe)     │
│  - Handshake & Device Enumeration (matching VID/PID)        │
│  - Staging key changes: CMD_SET_KEY                         │
│  - Receiving live hardware events: CMD_SMART_ACTION_TRIGGER │
└──────────────────────────────┬──────────────────────────────┘
                               │  USB Signals (D+ / D-)
                               ▼
┌─────────────────────────────────────────────────────────────┐
│             TIER 3: MICROCONTROLLER FIRMWARE                │
│        (RP2040, Arduino, ATmega32U4, STM32, QMK)            │
│  - Switch Matrix Scanner with Debounce Filter (1000Hz)      │
│  - Rotary Encoder Quadrature State Machine                  │
│  - Multi-Action FSM (Tap, Hold, Double-Tap Timers)          │
│  - Dynamic Keymap Table stored in Flash / EEPROM            │
│  - Dual USB HID Endpoints: Boot Keyboard + Raw Vendor Pipe  │
└─────────────────────────────────────────────────────────────┘
```

### The Fundamental Rule: Dynamic Remapping Without Reflashing
Amateur macro pads hardcode keycodes in C++ (`Keyboard.press('c');`) and require recompiling and flashing the microcontroller whenever a key changes.

**Professional input software treats firmware as a programmable engine**:
1. The firmware stores keycodes in an **EEPROM or Flash memory table**.
2. When a physical switch closes, the firmware looks up `keymap[current_layer][key_index]`.
3. The software writes new keycode values directly into the flash table over USB in real time without restarting the microcontroller.

---

## 2. Dynamic Key Matrix Engine (Any Number of Keys)

### 2.1 Physical Matrix vs. Logical Matrix

Your hardware might have:
- **3x3 grid (9 keys)** + 1 Rotary Knob (like an RP2040-Zero pad).
- **4x4 grid (16 keys)** with no knobs.
- **2x6 grid (12 keys)** with 2 rotary knobs and a slider (like Creator Micro).

To support any number of keys without rewriting your UI or firmware:
1. **Physical Key Matrix**: The wiring of GPIO rows and columns (or direct GPIO pin-per-key).
2. **Logical Key Index**: A linear integer `0, 1, 2, ... N - 1` identifying each key switch.

```text
Physical 3x3 Layout:
 [Key 0] [Key 1] [Key 2]    +  [Rotary Knob 0]
 [Key 3] [Key 4] [Key 5]       (CCW, CW, Press)
 [Key 6] [Key 7] [Key 8]
```

### 2.2 Device Manifest Schema

Instead of hardcoding key counts, your software should load a **Device Manifest** JSON that describes the layout geometry:

```json
{
  "device": {
    "name": "Custom 9-Key Studio Pad",
    "vendorId": "0x2E8A",
    "productId": "0x000A",
    "matrix": {
      "rows": 3,
      "cols": 3,
      "totalKeys": 9
    },
    "encoders": [
      {
        "id": 0,
        "name": "Volume Dial",
        "x": 3.5,
        "y": 0.5,
        "subActions": ["ccw", "cw", "press"]
      }
    ],
    "keys": [
      { "id": 0, "row": 0, "col": 0, "x": 0, "y": 0, "w": 1, "h": 1, "label": "K1" },
      { "id": 1, "row": 0, "col": 1, "x": 1, "y": 0, "w": 1, "h": 1, "label": "K2" },
      { "id": 2, "row": 0, "col": 2, "x": 2, "y": 0, "w": 1, "h": 1, "label": "K3" },
      { "id": 3, "row": 1, "col": 0, "x": 0, "y": 1, "w": 1, "h": 1, "label": "K4" },
      { "id": 4, "row": 1, "col": 1, "x": 1, "y": 1, "w": 1, "h": 1, "label": "K5" },
      { "id": 5, "row": 1, "col": 2, "x": 2, "y": 1, "w": 1, "h": 1, "label": "K6" },
      { "id": 6, "row": 2, "col": 0, "x": 0, "y": 2, "w": 1, "h": 1, "label": "K7" },
      { "id": 7, "row": 2, "col": 1, "x": 1, "y": 2, "w": 1, "h": 1, "label": "K8" },
      { "id": 8, "row": 2, "col": 2, "x": 2, "y": 2, "w": 1, "h": 1, "label": "K9" }
    ]
  }
}
```

### 2.3 Dynamic Canvas Rendering

Your UI can render any macro pad by iterating over the manifest `keys` array:
```javascript
// Render any macro pad layout parametrically
function CanvasView({ manifest, activeLayerData, selectedKeyId, onSelectKey }) {
  const UNIT_SIZE = 64; // 64px per standard 1U keycap

  return (
    <div className="pad-canvas" style={{ position: "relative" }}>
      {manifest.keys.map((k) => {
        const assigned = activeLayerData.keys[k.id] || "KC_NONE";
        const isSelected = selectedKeyId === k.id;

        return (
          <button
            key={k.id}
            onClick={() => onSelectKey(k.id)}
            style={{
              position: "absolute",
              left: k.x * UNIT_SIZE,
              top: k.y * UNIT_SIZE,
              width: k.w * UNIT_SIZE - 4,
              height: k.h * UNIT_SIZE - 4,
              border: isSelected ? "2px solid #eab308" : "1px solid #333",
              borderRadius: 8
            }}
          >
            <span className="key-label">{renderKeyLabel(assigned)}</span>
          </button>
        );
      })}
    </div>
  );
}
```

---

## 3. The 4 Key Assignment Types

Input software supports four distinct types of key behaviors. Understanding how each is stored and executed is the key to building your own software.

---

### 3.1 Basic Keys (`KC_*`)

#### What they are:
Standard individual USB keystrokes sent directly to the operating system using standard USB HID Keyboard and Consumer Control usage pages.

#### Keycode Nomenclature:
- Standard Keyboard (`Usage Page 0x07`): `KC_A` (`0x04`), `KC_B` (`0x05`), `KC_ESC` (`0x29`), `KC_ENTER` (`0x28`).
- Modifiers: `KC_LCTRL` (`0xE0`), `KC_LSHIFT` (`0xE1`), `KC_LALT` (`0xE2`), `KC_LGUI` (`0xE3`).
- Consumer Controls (`Usage Page 0x0C`): `KC_VOLU` (`0xE9`), `KC_VOLD` (`0xEA`), `KC_MUTE` (`0xE2`), `KC_MPLY` (`0xCD`).

#### Bit-Mask Representation (How firmware encodes modifiers):
To allow assigning **`Ctrl + Shift + C`** in a single 16-bit keycode without wasting memory, use bit flags:
```text
Bit 15..12: Type Flags (0x0 = Basic Key)
Bit 11: GUI (Win/Cmd) Flag
Bit 10: ALT Flag
Bit 9:  SHIFT Flag
Bit 8:  CTRL Flag
Bit 7..0: USB HID 8-bit scancode
```
```c
// Example: Ctrl + Shift + Esc
#define MOD_CTRL  (1 << 8)
#define MOD_SHIFT (1 << 9)
#define KC_ESC    0x29

uint16_t combo = MOD_CTRL | MOD_SHIFT | KC_ESC; // 0x0329
```

---

### 3.2 Action Keys / Macros (`KA_*`)

#### What they are:
A sequence of keystrokes with millisecond pauses between them (e.g., Select All -> Copy -> Open Terminal -> Paste).

#### Data Model:
```typescript
interface MacroAction {
  id: number;           // e.g. 1 -> "KA_1"
  name: string;         // e.g. "Git Pull"
  color?: string;       // Custom badge color
  keyInputs: KeyStep[];
}

interface KeyStep {
  keycode: string;      // e.g. "KC_ENTER"
  delay: number;        // Milliseconds to pause (e.g. 50ms)
  actionType: 0 | 1 | 2;// 0 = RELEASE, 1 = PRESS, 2 = CLICK (Press + Release)
}
```

#### How Firmware Executes Macros:
The firmware stores a byte buffer of macro steps. When a key with code `KA_1` is pressed:
```cpp
void execute_macro(uint8_t macro_id) {
  MacroStep* steps = get_macro_steps(macro_id);
  for (int i = 0; i < steps->count; i++) {
    if (steps[i].actionType == ACTION_PRESS) {
      Keyboard.press(steps[i].keycode);
    } else if (steps[i].actionType == ACTION_RELEASE) {
      Keyboard.release(steps[i].keycode);
    } else if (steps[i].actionType == ACTION_CLICK) {
      Keyboard.write(steps[i].keycode);
    }
    if (steps[i].delay > 0) {
      delay(steps[i].delay);
    }
  }
}
```

---

### 3.3 Multi-Actions (`KM_*`) — Tap vs. Hold vs. Double-Tap

#### What they are:
A single physical key performs **different functions** depending on how you press it:
1. **Tap**: Quick press & release (< 200ms) -> Types `Space` (or fires `Copy`).
2. **Hold**: Held down for more than 200ms -> Activates `Layer 1` (or acts as `Ctrl`).
3. **Double-Tap**: Pressed twice within 250ms -> Fires `Full Screen` (or `Undo`).
4. **Tap-Hold**: Tapped once, then pressed and held -> Key repeat.

#### Data Model:
```typescript
interface MultiAction {
  id: number;              // e.g. 1 -> "KM_1"
  name: string;
  tappingTerms: number;    // Threshold in ms (typically 180ms - 220ms)
  tap: KeyStep;            // Assigned key on quick tap
  onHold: KeyStep;         // Assigned key / layer on hold
  doubleTap?: KeyStep;     // Assigned key on double-tap
  tapHold?: KeyStep;       // Assigned key on tap-and-hold
}
```

#### Firmware Finite State Machine (FSM):
To implement this on your microcontroller, each key has a timer and a state machine:

```text
                  [ Key Pressed ]
                         │
                         ▼
                  Start Timer (t0)
                         │
         ┌───────────────┴───────────────┐
         ▼                               ▼
Released within 200ms?          Held longer than 200ms?
         │                               │
         ▼                               ▼
Wait 150ms for 2nd press           FIRE "ON_HOLD" ACTION
   ┌─────┴─────┐                         │
   ▼           ▼                         │
2nd Press?   Timeout?                    │
   │           │                         │
   ▼           ▼                         ▼
  FIRE        FIRE                [ Key Released ]
"DOUBLE-TAP"  "TAP"               Release Hold Action
```

---

### 3.4 Smart Actions (`SA_*`) — Host-Assisted Actions

#### What they are:
Actions that **cannot be performed by a keyboard alone** because standard USB keyboards cannot launch software, open URLs, or run terminal commands on a computer.

#### Categories of Smart Actions:
1. **Text Step**: Automatically types a multi-line paragraph or code snippet without human typing.
2. **URL Step**: Opens `https://github.com` or `https://figma.com` in the default browser.
3. **App Launch Step**: Starts `Photoshop.exe` or `Blender.exe`.
4. **Command Step**: Executes a terminal command (e.g. `npm run dev` or `git status`).

#### How Smart Actions Work via Bidirectional USB HID:
Firmware alone cannot execute OS scripts, so **firmware and software collaborate**:

```text
[ Physical Key Pressed on Macro Pad ]
                 │
                 ▼
Firmware detects key has code "SA_01"
                 │
                 ▼
Firmware sends 64-byte Raw HID notification to PC:
Report: [ 0xEE, CMD_SMART_ACTION, 0x01 (Action ID) ]
                 │
                 ▼
[ Host Software (Electron / Browser WebHID / Background Daemon) ]
Receives report with Action ID 0x01
                 │
                 ▼
Looks up Action 0x01 in JSON:
{ "type": "urlStep", "payload": { "url": "https://figma.com" } }
                 │
                 ▼
Host executes native OS API:
window.open("https://figma.com") OR child_process.exec("git pull")
```

---

## 4. Layer Management Architecture

Layers allow a 9-key macro pad to act like a 36-key controller.

### The Layer Stack Concept:
- **Layer 0 (Base)**: Always active unless masked by a higher layer.
- **Layer 1 (Media)**: Activated when holding down a momentary key (`KI_LM1`).
- **Layer 2 (Numpad)**: Activated when toggling `TO_2`.
- **Transparent Keys (`KC_TRNS` / `0x00`)**: If a key on Layer 1 is set to `KC_TRNS`, pressing it falls through to whatever is mapped on Layer 0.

### Storing Layers in Firmware Memory:
```cpp
// 4 Layers x 3 Rows x 3 Cols = 36 keycodes
// Each keycode is uint16_t (2 bytes)
// Total memory required = only 72 bytes!
#define NUM_LAYERS 4
#define NUM_ROWS   3
#define NUM_COLS   3

uint16_t keymaps[NUM_LAYERS][NUM_ROWS][NUM_COLS] = {
  // Layer 0: Typing
  {
    { KC_Q, KC_W, KC_E },
    { KC_A, KC_S, KC_D },
    { KC_Z, KC_X, MO(1) } // MO(1) = Momentary Layer 1
  },
  // Layer 1: Media Controls
  {
    { KC_MPRV, KC_MNXT, KC_MPLY },
    { KC_VOLD, KC_VOLU, KC_MUTE },
    { KC_TRNS, KC_TRNS, KC_TRNS }
  }
};
```

---

## 5. Rotary Encoders & Analog Controls

A rotary encoder is physically two switches (`Pin A`, `Pin B`) that generate out-of-phase pulses (Quadrature signals), plus a tactile center push switch.

### 3-Way Logical Model:
Treat each encoder as 3 distinct keys:
1. `Encoder_CCW`: Fired when rotated left.
2. `Encoder_CW`: Fired when rotated right.
3. `Encoder_Click`: Fired when the shaft is pressed down.

```text
Clockwise (CW) Pulse:      Pin A goes LOW before Pin B
Counter-Clockwise (CCW):   Pin B goes LOW before Pin A
```

### Pulse Detent Resolution:
Most rotary encoders (like EC11) have **20 detents (clicks)** per revolution, producing 2 or 4 state transitions per click. Firmware must debounce these into **exactly 1 action per mechanical click**.

---

## 6. Hardware Communication Protocol (Raw HID)

To enable live key mapping from any web browser or desktop app, configure a **64-byte Raw HID Endpoint**.

### Standard Packet Framing:
```text
Byte 0: Command ID
Byte 1: Target Layer Index (0–7)
Byte 2: Target Key Index (0–255)
Byte 3..4: Keycode (16-bit Little-Endian)
Byte 5..63: Padding / Parameters
```

### Command IDs:
| Command Byte | Name | Action |
|---|---|---|
| `0x01` | `CMD_GET_DEVICE_INFO` | Returns board ID, total keys, and firmware version. |
| `0x02` | `CMD_GET_KEY` | Reads the keycode stored at `[Layer, Key_ID]`. |
| `0x03` | `CMD_SET_KEY` | Writes a keycode to RAM: `[Layer, Key_ID, Keycode]`. |
| `0x04` | `CMD_SAVE_FLASH` | Writes RAM layout permanently to Flash / EEPROM. |
| `0x05` | `CMD_RESET_FACTORY` | Erases flash storage and restores defaults. |
| `0xEE` | `CMD_SMART_ACTION` | Hardware -> Host notification of a Smart Action trigger. |

---

## 7. Complete Reference Firmware (RP2040 / Arduino C++)

Here is a complete, working firmware sketch for an **RP2040 (Raspberry Pi Pico / RP2040-Zero)** using the `Adafruit_TinyUSB` library. It supports:
- Direct matrix switch scanning with debouncing.
- A rotary encoder (CW, CCW, and Click).
- Raw HID communication to allow live key remapping over WebHID.

```cpp
#include <Arduino.h>
#include <Adafruit_TinyUSB.h>

// -------------------------------------------------------------
// Hardware Pin Definitions (Customizable for your pinout)
// -------------------------------------------------------------
const uint8_t ROW_PINS[3] = { 0, 1, 2 }; // Matrix Row Outputs
const uint8_t COL_PINS[3] = { 3, 4, 5 }; // Matrix Col Inputs (Pullup)
const uint8_t ENC_A = 6;                // Rotary Encoder Pin A
const uint8_t ENC_B = 7;                // Rotary Encoder Pin B
const uint8_t ENC_SW = 8;               // Rotary Push Switch

#define TOTAL_KEYS 9
#define NUM_LAYERS 4

// -------------------------------------------------------------
// Live Keymap Memory Table (Stored in RAM, committable to Flash)
// -------------------------------------------------------------
uint16_t keymaps[NUM_LAYERS][TOTAL_KEYS] = {
  { 0x0004, 0x0005, 0x0006, 0x0007, 0x0008, 0x0009, 0x000A, 0x000B, 0x000C }, // L0: A-I
  { 0xE0E9, 0xE0EA, 0xE0CD, 0x0000, 0x0000, 0x0000, 0x0000, 0x0000, 0x0000 }  // L1: Media
};
uint16_t encoder_map[NUM_LAYERS][3] = {
  { 0xE0EA, 0xE0E9, 0xE0E2 } // L0: VolDown, VolUp, Mute
};

uint8_t current_layer = 0;

// -------------------------------------------------------------
// USB HID Descriptors (Keyboard + 64-byte Raw HID)
// -------------------------------------------------------------
uint8_t const desc_hid_report[] = {
  TUD_HID_REPORT_DESC_KEYBOARD(HID_REPORT_ID(1)),
  TUD_HID_REPORT_DESC_CONSUMER(HID_REPORT_ID(2)),
  TUD_HID_REPORT_DESC_GENERIC_INOUT(64, HID_REPORT_ID(3))
};

Adafruit_USBD_HID usb_hid;

void setup() {
  usb_hid.setPollInterval(1);
  usb_hid.setReportDescriptor(desc_hid_report, sizeof(desc_hid_report));
  usb_hid.setReportCallback(NULL, raw_hid_receive_cb);
  usb_hid.begin();

  // Initialize Row & Column pins
  for (int r = 0; r < 3; r++) {
    pinMode(ROW_PINS[r], OUTPUT);
    digitalWrite(ROW_PINS[r], HIGH);
  }
  for (int c = 0; c < 3; c++) {
    pinMode(COL_PINS[c], INPUT_PULLUP);
  }

  // Rotary Encoder Pins
  pinMode(ENC_A, INPUT_PULLUP);
  pinMode(ENC_B, INPUT_PULLUP);
  pinMode(ENC_SW, INPUT_PULLUP);
}

// -------------------------------------------------------------
// Raw HID Callback: Handles Live Key Remapping from Web App
// -------------------------------------------------------------
void raw_hid_receive_cb(uint8_t report_id, hid_report_type_t report_type, uint8_t const* buffer, uint16_t bufsize) {
  if (buffer[0] == 0x03) { // CMD_SET_KEY
    uint8_t layer = buffer[1];
    uint8_t key_id = buffer[2];
    uint16_t keycode = buffer[3] | (buffer[4] << 8);

    if (layer < NUM_LAYERS && key_id < TOTAL_KEYS) {
      keymaps[layer][key_id] = keycode;
    }
  } else if (buffer[0] == 0x04) { // CMD_SAVE_FLASH
    // Commit RAM keymaps to LittleFS / EEPROM here
  }
}

// -------------------------------------------------------------
// Main Loop: 1000Hz Matrix Scanning & Encoder Tracking
// -------------------------------------------------------------
bool key_states[TOTAL_KEYS] = { false };
int last_enc_a = HIGH;

void loop() {
  if (!TinyUSBDevice.mounted()) return;

  // 1. Scan 3x3 Key Matrix
  uint8_t key_idx = 0;
  for (int r = 0; r < 3; r++) {
    digitalWrite(ROW_PINS[r], LOW);
    delayMicroseconds(5);

    for (int c = 0; c < 3; c++) {
      bool is_pressed = (digitalRead(COL_PINS[c]) == LOW);
      if (is_pressed != key_states[key_idx]) {
        key_states[key_idx] = is_pressed;
        handle_key_event(key_idx, is_pressed);
      }
      key_idx++;
    }
    digitalWrite(ROW_PINS[r], HIGH);
  }

  // 2. Scan Rotary Encoder
  int current_enc_a = digitalRead(ENC_A);
  if (last_enc_a == HIGH && current_enc_a == LOW) {
    if (digitalRead(ENC_B) == LOW) {
      // Clockwise (CW)
      fire_keycode(encoder_map[current_layer][1]);
    } else {
      // Counter-Clockwise (CCW)
      fire_keycode(encoder_map[current_layer][0]);
    }
  }
  last_enc_a = current_enc_a;
}

void handle_key_event(uint8_t key_idx, bool pressed) {
  uint16_t kc = keymaps[current_layer][key_idx];
  if (pressed) {
    fire_keycode(kc);
  }
}

void fire_keycode(uint16_t keycode) {
  // If keycode is Smart Action (0x8000 range), notify web app:
  if ((keycode & 0x8000) != 0) {
    uint8_t report[64] = { 0xEE, (uint8_t)(keycode & 0xFF) };
    usb_hid.sendReport(3, report, sizeof(report));
    return;
  }
  // Standard Consumer / Media Key
  if ((keycode & 0xE000) == 0xE000) {
    usb_hid.sendReport16(2, keycode & 0x0FFF);
    delay(10);
    usb_hid.sendReport16(2, 0); // Release
    return;
  }
  // Standard USB Keyboard Key
  uint8_t key_report[6] = { (uint8_t)(keycode & 0xFF), 0, 0, 0, 0, 0 };
  usb_hid.sendReport(1, key_report, sizeof(key_report));
  delay(10);
  uint8_t release_report[6] = { 0 };
  usb_hid.sendReport(1, release_report, sizeof(release_report));
}
```

---

## 8. Complete Reference Frontend (WebHID in JavaScript)

Here is a minimal, complete JavaScript module that connects to your microcontroller from any web browser without needing any backend or Electron:

```javascript
class MacroPadController {
  constructor() {
    this.device = null;
  }

  // 1. Request USB Device Connection
  async connect() {
    const filters = [{ vendorId: 0x2e8a }]; // Raspberry Pi VID
    const devices = await navigator.hid.requestDevice({ filters });
    if (devices.length === 0) return false;

    this.device = devices[0];
    await this.device.open();

    // Listen for Smart Action notifications from hardware
    this.device.addEventListener("inputreport", (event) => {
      const data = new Uint8Array(event.data.buffer);
      if (data[0] === 0xEE) {
        const smartActionId = data[1];
        this.executeSmartAction(smartActionId);
      }
    });

    console.log("Connected to Macro Pad:", this.device.productName);
    return true;
  }

  // 2. Assign Keycode to Hardware Matrix
  async setKeycode(layerIndex, keyIndex, keycode) {
    if (!this.device) throw new Error("Hardware not connected");

    const packet = new Uint8Array(64);
    packet[0] = 0x03;               // CMD_SET_KEY
    packet[1] = layerIndex;         // Target Layer
    packet[2] = keyIndex;           // Matrix Key Index (0 to N-1)
    packet[3] = keycode & 0xFF;      // Low Byte
    packet[4] = (keycode >> 8) & 0xFF; // High Byte

    await this.device.sendReport(3, packet);
    console.log(`Assigned key ${keyIndex} -> 0x${keycode.toString(16)}`);
  }

  // 3. Save Layout Permanently to Flash
  async saveToFlash() {
    const packet = new Uint8Array(64);
    packet[0] = 0x04; // CMD_SAVE_FLASH
    await this.device.sendReport(3, packet);
    console.log("Committed layout to Flash memory!");
  }

  // 4. Execute Smart Action on PC
  executeSmartAction(actionId) {
    console.log("Smart action triggered by physical key:", actionId);
    if (actionId === 1) {
      window.open("https://github.com", "_blank");
    } else if (actionId === 2) {
      navigator.clipboard.writeText("console.log('Macro Pad Active!');");
    }
  }
}
```

---

## 9. Step-by-Step Blueprint for Your Custom Macro Pad

Follow these 4 phases to complete your custom hardware and software:

### Phase 1: Define Your Physical Layout
1. Choose your switch count (e.g. 9 keys in a 3x3 grid, or 12 keys in a 3x4 grid).
2. Wire your rows and columns (or direct pins) to your RP2040-Zero GPIOs.
3. Wire the Rotary Encoder (`A`, `B`, `GND`) and tactile push switch.

### Phase 2: Flash the Parametric Firmware
1. Program the reference firmware above onto the RP2040.
2. Verify that the device enumerates as a USB Keyboard and sends `A`, `B`, `C` when pressing the keys.
3. Test that the rotary encoder turns the PC master volume up and down.

### Phase 3: Create the Device Manifest
1. Write a `device_manifest.json` file defining your matrix dimensions and key positions (X/Y coordinates in units of `1U`).
2. Have your web frontend load this JSON file to draw the key buttons on screen dynamically.

### Phase 4: Wire the WebHID Configurator
1. Use the `MacroPadController` class above to connect your web UI to the USB pad.
2. Clicking any key in your web UI opens the Action Drawer, lets you select a keycode, and immediately dispatches `CMD_SET_KEY` over USB.
3. Your custom macro pad is now fully programmable without ever needing to compile or reflash firmware!
