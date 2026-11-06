# Work Louder Input — Comprehensive Features & Architecture Guide

This guide provides an end-to-end breakdown of every screen, feature, data model, and internal mechanism in the standalone Work Louder web application, as well as instructions on how to repurpose this frontend for your own custom DIY macro pad hardware (RP2040, Arduino, ESP32, STM32, QMK, VIA).

---

## Table of Contents
1. [Overview & Philosophy](#1-overview--philosophy)
2. [Screen-by-Screen Feature Walkthrough](#2-screen-by-screen-feature-walkthrough)
   - [2.1 Keymap Configurator](#21-keymap-configurator)
   - [2.2 Action Drawer & Key Assignment](#22-action-drawer--key-assignment)
   - [2.3 Presets & Profile Manager](#23-presets--profile-manager)
   - [2.4 Device Settings & RGB Lighting](#24-device-settings--rgb-lighting)
   - [2.5 Choose Device Screen](#25-choose-device-screen)
   - [2.6 Wallpaper & Display Editor](#26-wallpaper--display-editor)
   - [2.7 Permissions Guide](#27-permissions-guide)
   - [2.8 Cheat Sheet HUD Overlay](#28-cheat-sheet-hud-overlay)
   - [2.9 Radial Pie Menu Overlay](#29-radial-pie-menu-overlay)
3. [Core Functional Modules & Mechanics](#3-core-functional-modules--mechanics)
   - [3.1 Device Detection and Connection Status](#31-device-detection-and-connection-status)
   - [3.2 Key Assignment Interface](#32-key-assignment-interface)
   - [3.3 Layer / Channel Management](#33-layer--channel-management)
   - [3.4 Rotary Encoder Configuration](#34-rotary-encoder-configuration)
   - [3.5 RGB Lighting Customization](#35-rgb-lighting-customization)
   - [3.6 Profile Saving and Loading](#36-profile-saving-and-loading)
   - [3.7 Configuration File Formats](#37-configuration-file-formats)
4. [Internal Architecture & Data Models](#4-internal-architecture--data-models)
   - [4.1 Zustand Store Architecture](#41-zustand-store-architecture)
   - [4.2 The Keyboard Factory](#42-the-keyboard-factory)
   - [4.3 Keycode & Action Taxonomy](#43-keycode--action-taxonomy)
5. [How the Mock Bridge Works (`mock_bridge.js`)](#5-how-the-mock-bridge-works)
6. [Reusing This UI for Your Custom DIY Macro Pad](#6-reusing-this-ui-for-your-custom-diy-macro-pad)
   - [6.1 WebHID Integration Architecture](#61-webhid-integration-architecture)
   - [6.2 Communication Protocol (Raw HID Packets)](#62-communication-protocol-raw-hid-packets)
   - [6.3 Firmware Implementation Guide (QMK / RP2040 Arduino)](#63-firmware-implementation-guide-qmk--rp2040-arduino)
7. [Summary](#7-summary)

---

## 1. Overview & Philosophy

The Work Louder Input interface is a high-polish, modular keyboard and macro pad configurator originally built as an Electron desktop application.

In this standalone distribution:
- **Zero Backend / Zero Electron**: All Node.js, Electron IPC, and native USB binary dependencies have been extracted and replaced with client-side JavaScript (`mock_bridge.js`).
- **Complete Visual Fidelity**: 100% of the original CSS styling, SVG vector keycaps, animations, icons, and components render directly in any standard web browser (Chrome, Edge, Firefox, Safari).
- **Hardware-Free Simulation**: The app immediately mounts simulated hardware profiles (Creator Micro 2, Nomad [E], Work Louder Knob) without requiring proprietary physical devices connected via USB.

---

## 2. Screen-by-Screen Feature Walkthrough

### 2.1 Keymap Configurator
**Route**: `/#/main` (Keymap Tab)

The centerpiece of the application. It provides an interactive canvas displaying the physical device layout.

- **Interactive Canvas**:
  - **Pan & Zoom**: Drag anywhere on the background canvas to pan.
  - **Auto-Center**: Double-click anywhere on the blank canvas to smoothly animate and re-center the device in the viewport.
- **Layers Bar** (Top center above device):
  - Shows active layer badges (e.g. `Layer 1`).
  - Click `+` to add a new layer (supports up to 4–8 layers depending on device type).
  - Each layer can be assigned a custom identification color used on RGB backlighting and layer status indicators.
- **Physical Key Selection**:
  - Click any key on the canvas to select it. The selected key is outlined with a bright yellow focus border.
  - Selecting a key automatically expands the **Action Drawer** from the left.
- **Rotary Encoders / Dials**:
  - Creator Micro V2 and Knob models feature rotary knobs.
  - Each encoder has 3 distinct assignable trigger points (Clockwise, Counter-Clockwise, Push Button).
- **Touch Sliders / Radial Tracks**:
  - The black vertical bar on the Creator Micro represents a capacitive slider / jog track.
  - Supports continuous scrubbing or segmented mode.

---

### 2.2 Action Drawer & Key Assignment
**Location**: Slides out from the left edge of the screen upon key selection.

The Action Drawer houses the entire catalog of keys, macros, and smart shortcuts:

1. **Basic Keys**:
   - **Letters & Numbers**: Full ANSI/ISO alphanumeric keyboard keys (`A`–`Z`, `0`–`9`).
   - **Modifiers**: `Shift`, `Ctrl`, `Alt / Option`, `Cmd / Super / Win`.
   - **Navigation**: Arrow keys, `Home`, `End`, `Page Up`, `Page Down`, `Insert`, `Delete`.
   - **Media Controls**: `Play/Pause`, `Next Track`, `Prev Track`, `Volume Up`, `Volume Down`, `Mute`.
   - **Function Keys**: `F1` through `F24`.
2. **Actions (Macros)**:
   - Combine multiple keystrokes with precision timing delays (e.g. `Ctrl+C` -> 50ms pause -> `Ctrl+V`).
   - Supports key press, key release, and click modes.
3. **Smart Actions**:
   - **Text Step**: Automatically types a multi-line snippet of text or boilerplate code.
   - **URL Step**: Launches a target website in the default browser (e.g., `https://github.com`).
   - **App Launch Step**: Launches an executable or application on the host computer.
   - **Command Step**: Executes a terminal command or script.
4. **Presets**:
   - Assign entire pre-made application profiles (Photoshop, Figma, Premiere Pro, DaVinci Resolve, Blender) to a key or layer.

---

### 2.3 Presets & Profile Manager
**Route**: `/#/main` (Preset Tab)

Allows users to manage and switch complete layout configurations:
- **Active Profile**: Shows the currently applied configuration.
- **Create New Profile**: Duplicates an existing layout or starts with factory defaults.
- **Layer Memory**: Each profile preserves its own distinct layers, actions, encoder assignments, and RGB lighting configurations.
- **Export / Import**: Save profiles as JSON files to back them up or share them with other users.

---

### 2.4 Device Settings & RGB Lighting
**Route**: `/#/main` (Settings Tab)

Configures hardware parameters and aesthetic lighting:
- **Lighting Effects**:
  - `Solid`: Single constant color across all backlit keys.
  - `Breathing`: Smooth pulsation cycle.
  - `Reactive`: Lights ignite upon pressing a key and fade out gently.
  - `Rainbow / Wave`: Fluid spectral color cycling across the matrix.
  - `Off`: Backlighting disabled for battery conservation.
- **Color & Brightness Controls**:
  - Full RGB color picker palette with hex input.
  - Global brightness slider (0% to 100%).
- **Hardware Parameters**:
  - **Sleep Timeout**: Timer after which the device enters low-power standby mode.
  - **Debounce Time**: Switch contact debounce threshold (typically 5ms).
  - **Firmware Status**: Displays current firmware version (`1.0.0`), bootloader status, and hardware PID/VID.

---

### 2.5 Choose Device Screen
**Route**: `/#/choose-device`

The device discovery screen where physical hardware is detected and connected:
- **Device Family Supported**:
  - **Creator Micro V2**: 13-key macro pad with 2 rotary encoders and slider.
  - **Nomad [E]**: Full mechanical keyboard with integrated screen, dials, and widgets.
  - **Nomad [E] V2**: Updated revision of the flagship keyboard.
  - **Work Louder Knob**: Dedicated multi-dial control console.
  - **Framer F1**: Specialized creative macro controller.
  - **Codex Micro**: Minimalist micro pad.
  - **Bootloader Mode**: DFU recovery interface for flashing `.bin` / `.hex` firmware updates.

---

### 2.6 Wallpaper & Display Editor
**Route**: `/#/edit-wallpaper`

Designed specifically for devices featuring an onboard screen (such as Nomad [E]'s e-ink / LCD display):
- **Image Uploader**: Upload `.png`, `.jpg`, `.svg`, or `.bmp` artwork.
- **Crop & Fit Tool**: Adjust framing to the exact resolution of the physical display.
- **Dither Engine**: Converts 24-bit RGB images into high-contrast 1-bit monochrome pixel art using Floyd-Steinberg dithering algorithms optimized for low-refresh screens.
- **Invert Mode**: One-click toggle between dark-on-light and light-on-dark display themes.

---

### 2.7 Permissions Guide
**Route**: `/#/permissions-guide`

The onboarding walkthrough explaining operating system security privileges required for macro software:
- **macOS**: Accessibility permissions (`AXIsProcessTrusted`) and Input Monitoring permissions (`IOHIDCheckAccess`) required to dispatch global synthetic keystrokes across applications.
- **Windows**: UAC elevation considerations for injecting keystrokes into elevated admin windows.

---

### 2.8 Cheat Sheet HUD Overlay
**File**: `cheat_sheet.html`

A lightweight, transparent heads-up display (HUD):
- Can be pinned on screen while using demanding software (Blender, Premiere, CAD).
- Real-time display showing which shortcut or macro is mapped to each key on the active layer so the user never forgets key assignments.

---

### 2.9 Radial Pie Menu Overlay
**File**: `radial_menu.html`

A high-speed circular on-screen menu:
- Triggered instantly when rotating or clicking an encoder knob.
- Allows rapid selection of 8 to 16 tools in circular sectors using intuitive muscle memory (like weapon wheels in video games).

---

## 3. Core Functional Modules & Mechanics

### 3.1 Device Detection and Connection Status

The application continuously tracks connected hardware, connection health, and peripheral telemetry.

```text
+-----------------------+       poll / event        +------------------------+
| Physical Hardware /   | ------------------------> | devicesManagerChannel  |
| Virtual Simulation    |                           | .getActiveDevice()     |
+-----------------------+                           +------------------------+
                                                                |
                                                                v
+-----------------------+        sync state         +------------------------+
| UI Header Badge &     | <------------------------ | Zustand Store          |
| Connection Indicators |                           | phase: "completed"     |
+-----------------------+                           +------------------------+
```

#### Hardware Identification Matrix:
| Device Name | Type Identifier | USB PID | Connection Type | Matrix Layout |
|---|---|---|---|---|
| **Creator Micro V2** | `creator_micro_v2` | `33432` | USB HID | 13 Keys + 2 Encoders + Slider |
| **Nomad [E]** | `nomad_e` | `33428` | USB HID | 65% ANSI/ISO + 3 Encoders + Screen |
| **Nomad [E] V2** | `nomad_e_v2` | `33429` | USB HID | 65% ANSI/ISO Rev 2 |
| **Work Louder Knob** | `knob` | `33507` | USB HID | 4 Dials + 4 Keys |
| **Framer F1** | `knob_f1` | `33508` | USB HID | Custom Designer Layout |
| **Codex Micro** | `codex_micro` | `33435` | USB HID | Compact 6-Key Pad |

#### Connection Lifecycle & Telemetry:
1. **Enumeration**: Handled via `devicesManagerChannel.getDevices()`. The app queries available USB endpoints.
2. **Phase Progression**:
   - `reading`: Communicating with bootloader/firmware to fetch active EEPROM layout.
   - `completed`: Profile loaded and verified; UI renders full interactive canvas.
   - `error`: Failed USB handshake (shows retry dialog; bypassed in standalone web mode).
3. **Telemetry Indicators**:
   - **Battery Percentage**: Live 0–100% monitor with charging bolt glyph.
   - **Port Status**: Displays active COM port / USB path (e.g., `COM3`, `HID_001`).
   - **Firmware Version**: Checks for updates against release channels.

---

### 3.2 Key Assignment Interface

The key assignment system pairs the 2D visual layout with a dynamic drawer inspector.

#### Interaction Workflow:
```text
[ Click Keycap on Canvas ]
            │
            ▼
[ Outline with Yellow Border ] ──► [ setKeySelected({ row, index, keyType }) ]
            │
            ▼
[ Action Drawer Expands ] ────────► [ Displays Categories: Basic / Actions / Presets ]
            │
            ▼
[ User Selects New Keycode ] ────► [ Immediate Store Update + Canvas Re-render ]
```

- **Selection State Model**:
  ```typescript
  interface KeySelected {
    row: number;         // Matrix row index (-1 if none selected)
    index: number;       // Matrix column index (-1 if none selected)
    keyType: "base" | "encoder" | "button" | "undefined";
  }
  ```
- **Live SVG Vector Rendering**:
  - Keys with valid bindings render legible labels (`Esc`, `Tab`, `Q`, `W`) or SVG icons (Volume, Play, Arrows).
  - Unmapped keys (`KC_NONE`) render a subtle circular plus icon (`(+)`).
  - Merged / double-width keys (e.g., ISO Enter, 2U Space) scale dynamically based on `width` and `alignItems` layout attributes.

---

### 3.3 Layer / Channel Management

Layers provide access to multiple functional layouts without needing extra physical switches.

```text
Layer 0 (Base):    [ Q ] [ W ] [ E ] [ R ]  ──► Default Typing
                         │ (Hold Layer 1 Modifier)
Layer 1 (Media):   [Play][Mute][Vol-][Vol+] ──► Creative / Audio Controls
                         │ (Hold Layer 2 Modifier)
Layer 2 (Numpad):  [ 7 ] [ 8 ] [ 9 ] [ / ]  ──► Numeric Keypad
```

#### Layer Mechanics:
1. **Layer Hierarchy**:
   - **Layer 0**: Base layer active by default.
   - **Layer 1–7**: Overlay layers evaluated from top to bottom.
2. **Layer Switching Modes**:
   - **Momentary (`KI_LM1` / `KI_LM2`)**: Layer remains active only while holding down the trigger key; returns to base layer immediately upon release.
   - **Toggle (`TO(layer)`)**: Pressing the key toggles the target layer on or off persistently.
   - **Layer Tap (`LT(layer, keycode)`)**: Tapping fires a regular key (e.g. Space), holding switches layer.
3. **Per-Layer Styling**:
   - Each layer carries its own `name` (e.g., "Gaming", "Photoshop", "Numpad") and `color` (hex string).
   - The selected layer color accents the top layer indicator pill and configures the hardware backlighting tone.

---

### 3.4 Rotary Encoder Configuration

Rotary encoders are treated as **3 independent logical buttons** packed into a single physical component.

```text
                    ┌─────────────────────────┐
                    │      Rotary Encoder     │
                    └────────────┬────────────┘
                                 │
         ┌───────────────────────┼───────────────────────┐
         ▼                       ▼                       ▼
   [ Turn Left / CCW ]     [ Push Down / Click ]   [ Turn Right / CW ]
   Keycode: KC_VOLD        Keycode: KC_MUTE        Keycode: KC_VOLU
   Action: Volume Down     Action: Audio Mute      Action: Volume Up
```

#### Encoder Data Representation:
In the layout schema, encoders are stored as an array of triplets:
```json
"encoders": [
  [
    { "keycode": "KC_VOLD" },
    { "keycode": "KC_VOLU" },
    { "keycode": "KC_MUTE" }
  ]
]
```
- **Index 0**: Counter-Clockwise (CCW) rotation event.
- **Index 1**: Clockwise (CW) rotation event.
- **Index 2**: Physical center switch push / click event.
- **Detent Resolution**: In firmware, every tactile mechanical "click" (detent) dispatches either 1 or 2 quadrature pulses, immediately firing the assigned keycode or macro.

---

### 3.5 RGB Lighting Customization

The RGB lighting module controls addressable SK6812 / WS2812B LEDs embedded beneath individual key switches and encoder rings.

#### Supported Lighting Modes:
| Mode | Value | Description |
|---|---|---|
| **Solid** | `0` | Uniform static illumination using the user's selected hex color. |
| **Breathing** | `1` | Smooth sine-wave brightness pulsation between 0% and 100%. |
| **Reactive** | `2` | LEDs remain off; pressing a key illuminates it instantly with a gentle fade. |
| **Wave / Rainbow** | `3` | Multi-colored spectral wave traveling across the matrix. |
| **Off** | `4` | LEDs powered down completely to conserve power. |

#### Lighting Control Properties:
```typescript
interface LightingConfig {
  effect: LightingEffect;    // 0: Solid, 1: Breathing, etc.
  brightness: number;        // Float 0.0 to 1.0 (maps to hardware PWM 0-255)
  speed: number;             // Animation cycle rate (0.1 to 2.0)
  color: string;             // Hex code (e.g. "#FF5500")
  perLayerColor: boolean;    // If true, LED color automatically tracks the active layer color
}
```

---

### 3.6 Profile Saving and Loading

Profiles preserve complete snapshots of the hardware state.

#### Lifecycle & Synchronization:
```text
[ User edits key / layer / lighting ]
                │
                ▼
[ In-Memory Zustand Store updated instantly ]
                │
                ▼
[ Click "Save" or auto-save ]
                ├──► [ 1. Cached to browser localStorage ("wl_profiles") ]
                └──► [ 2. Transmitted via HID packet to Microcontroller Flash ]
```

- **Undo / Redo Stack**:
  - The configurator maintains a historical transaction delta stack.
  - Keyboard shortcuts (`Ctrl+Z` / `Cmd+Z`, `Ctrl+Y` / `Cmd+Y`) invoke `P.triggerProfileUndo()` and `P.triggerProfileRedo()`.
- **Exporting & Sharing**:
  - Profiles can be exported directly as `.json` files.
  - Importing a JSON file parses the structure, validates keycodes, and applies it to the active device profile.

---

### 3.7 Configuration File Formats

Profiles are exchanged and stored using a clean, human-readable JSON schema.

#### Complete Sample Profile JSON:
```json
{
  "id": 0,
  "name": "Creative Suite Master",
  "deviceType": "creator_micro_v2",
  "layers": [
    {
      "id": 0,
      "name": "Photoshop Editing",
      "color": "#38BDF8",
      "layout": {
        "base": [
          [
            { "keycode": "KC_ESC" },
            { "keycode": "KC_TAB" }
          ],
          [
            { "keycode": "KC_Q" },
            { "keycode": "KC_W" },
            { "keycode": "KC_E" },
            { "keycode": "KC_R" }
          ],
          [
            { "keycode": "KC_A" },
            { "keycode": "KC_S" },
            { "keycode": "KC_D" },
            { "keycode": "KC_F" }
          ],
          [
            { "keycode": "KC_Z" },
            { "keycode": "KC_X" },
            { "keycode": "KC_C" }
          ]
        ],
        "encoders": [
          [
            { "keycode": "KC_VOLD" },
            { "keycode": "KC_VOLU" },
            { "keycode": "KC_MPLY" }
          ]
        ],
        "joystick": {
          "type": "RADIAL",
          "sectors": [
            { "k": "KI_X", "a1": 0.1875, "a2": 0.3125 },
            { "k": "KC_NONE", "a1": 0.3125, "a2": 0.1875 }
          ]
        }
      }
    }
  ],
  "actions": [
    {
      "id": 1,
      "name": "Smart Export",
      "color": "#10B981",
      "keyInputs": [
        { "keycode": "KC_LGUI", "delay": 0, "actionType": 1 },
        { "keycode": "KC_LSFT", "delay": 0, "actionType": 1 },
        { "keycode": "KC_E", "delay": 20, "actionType": 2 }
      ]
    }
  ],
  "multiactions": [],
  "smartActions": [
    {
      "id": 1,
      "name": "Open Figma",
      "type": "urlStep",
      "payload": { "url": "https://figma.com" }
    }
  ]
}
```

---

## 4. Internal Architecture & Data Models

### 4.1 Zustand Store Architecture
The entire application state is managed by a centralized Zustand store exposed globally at `window.__WL_STORE__`.

Key state properties:
```typescript
interface WorkLouderState {
  phase: "reading" | "completed" | "error";
  deviceInfo: DeviceMetadata;
  profiles: Profile[];
  profileSelected: number;
  layerSelected: number;
  actions: Action[];
  multiactions: MultiAction[];
  smartActions: SmartAction[];
  deviceSpecificConfig: string;
}
```

You can inspect or manipulate the live state anytime from the browser developer console:
```javascript
// Read the live state
console.log(window.__WL_STORE__.getState());

// Switch active layer to Layer 2 programmatically
window.__WL_STORE__.setState({ layerSelected: 1 });
```

---

### 4.2 The Keyboard Factory
The `KeyboardFactory` (exposed globally at `window.__WL_FACTORY__`) is the core engine responsible for instantiating profile models:
```javascript
const factory = window.__WL_FACTORY__.instance;

// Generate a complete layout object with layers, buttons, and encoders
const profile = factory.createProfile({
  id: 0,
  name: "My Custom Pad",
  deviceType: "creator_micro_v2",
  deviceLayoutType: "universal",
  language: "en_us"
});
```

---

### 4.3 Keycode & Action Taxonomy

Work Louder uses structured string keycodes based on QMK conventions:

| Prefix | Category | Examples | Description |
|---|---|---|---|
| `KC_` | Standard HID | `KC_A`, `KC_ESC`, `KC_ENT`, `KC_SPACE` | Standard USB HID 104-key codes |
| `KC_` (Media) | Consumer Controls | `KC_VOLU`, `KC_VOLD`, `KC_MUTE`, `KC_MPLY` | Audio / Media player controls |
| `KA_` | Custom Actions | `KA_1`, `KA_2`, `KA_COPY` | User-defined multi-step macro sequences |
| `KM_` | Multi-Actions | `KM_1`, `KM_COMBINED` | Complex nested action chains |
| `KI_` | Internal / Layer | `KI_LM1`, `KI_LM2`, `KI_FP` | Momentary layer switch or feature toggle |
| `KC_NONE` | Unassigned | `KC_NONE` | Displays as empty `(+)` add button |

---

## 5. How the Mock Bridge Works (`mock_bridge.js`)

In the native desktop app, the frontend communicates with the Electron Main process via `window.electronAPI`. 

In our standalone web build, `mock_bridge.js` intercepts all IPC calls before React mounts:

```javascript
window.electronAPI = {
  // Device connectivity & enumeration
  devicesManagerChannel: {
    getDevices: async () => [/* Creator Micro, Nomad E, Knob */],
    getActiveDevice: async () => /* active device object */,
    onDeviceConnected: (cb) => { /* simulated event */ },
  },

  // Configuration read/write
  deviceConfigChannel: {
    fetchDeviceConfig: async () => ({ ... }),
    saveDeviceConfig: async (cfg) => {
      localStorage.setItem("wl_device_config", JSON.stringify(cfg));
      return { success: true };
    }
  },

  // Profiles persistence
  profilesChannel: {
    getProfiles: async () => /* cached profiles */,
    saveProfile: async (profile) => /* save to localStorage */
  }
};
```

Because every channel returns valid asynchronous Promises, the UI behaves identically to the real native app without ever making a network request or requiring a backend daemon.

---

## 6. Reusing This UI for Your Custom DIY Macro Pad

You can take this exact web interface and use it as the web configurator for your own custom physical macro pad!

### 6.1 WebHID Integration Architecture

Modern browsers (Chrome, Edge, Opera) support the **WebHID API** (`navigator.hid`). This allows a web page to directly open a USB HID connection to a microcontroller without installing any drivers!

To connect this UI to your real hardware:

1. In `mock_bridge.js`, replace `devicesManagerChannel.getDevices()` with a WebHID request:
```javascript
async function connectRealHardware() {
  const filters = [{ vendorId: 0x2e8a }]; // e.g. Raspberry Pi RP2040 VID
  const [device] = await navigator.hid.requestDevice({ filters });
  await device.open();
  
  // Listen for incoming key events or state
  device.addEventListener("inputreport", (event) => {
    const { data, reportId } = event;
    console.log("HID report from macro pad:", reportId, new Uint8Array(data.buffer));
  });

  return device;
}
```

2. When the user clicks **Save** in the UI, write the layout buffer directly to your microcontroller's flash memory:
```javascript
async function sendKeymapToHardware(hidDevice, layerIndex, keyIndex, keycode) {
  // 64-byte Raw HID feature report packet
  const packet = new Uint8Array(64);
  packet[0] = 0xAA;        // Command: SET_KEY
  packet[1] = layerIndex;  // Target Layer (0-3)
  packet[2] = keyIndex;    // Physical key matrix index
  packet[3] = keycode;     // USB HID keycode byte

  await hidDevice.sendReport(0, packet);
}
```

---

### 6.2 Communication Protocol (Raw HID Packets)

For DIY firmware (QMK, Arduino, CircuitPython), recommend using a standard 32-byte or 64-byte Raw HID report:

```text
+----------+----------+----------+---------------+-----------------------+
| Byte 0   | Byte 1   | Byte 2   | Byte 3..6     | Byte 7..63            |
+----------+----------+----------+---------------+-----------------------+
| CMD_ID   | LAYER    | KEY_ID   | KEYCODE (32b) | PADDING / PARAMS      |
+----------+----------+----------+---------------+-----------------------+
```

Common Command IDs:
- `0x01` (`GET_INFO`): Microcontroller returns firmware version, board name, and layout dimensions.
- `0x02` (`GET_LAYER`): Microcontroller returns active keycode assignments for layer `N`.
- `0x03` (`SET_KEY`): Updates key `X` on layer `Y` in RAM/EEPROM.
- `0x04` (`SET_RGB`): Updates RGB mode, brightness, and color palette.
- `0x05` (`SAVE_FLASH`): Commits changes permanently to onboard Flash / EEPROM.

---

### 6.3 Firmware Implementation Guide (QMK / RP2040 Arduino)

#### Arduino / RP2040 (`Adafruit_TinyUSB`):
```cpp
#include <Adafruit_TinyUSB.h>

Adafruit_USBD_HID usb_hid;

// Custom 64-byte Raw HID Report Descriptor
uint8_t const desc_hid_report[] = {
  TUD_HID_REPORT_DESC_GENERIC_INOUT(64)
};

void setup() {
  usb_hid.setPollInterval(1);
  usb_hid.setReportDescriptor(desc_hid_report, sizeof(desc_hid_report));
  usb_hid.setReportCallback(NULL, hid_report_callback);
  usb_hid.begin();
}

void hid_report_callback(uint8_t report_id, hid_report_type_t report_type, uint8_t const* buffer, uint16_t bufsize) {
  if (buffer[0] == 0x03) { // SET_KEY
    uint8_t layer = buffer[1];
    uint8_t keyIndex = buffer[2];
    uint16_t keycode = buffer[3] | (buffer[4] << 8);
    
    // Save to key matrix table in EEPROM/LittleFS
    matrix[layer][keyIndex] = keycode;
  }
}
```

#### QMK Firmware:
If using QMK, you can utilize the built-in **Raw HID** feature by adding `RAW_ENABLE = yes` in your `rules.mk` and handling incoming packets in `raw_hid_receive()` inside `keymap.c`:

```c
void raw_hid_receive(uint8_t *data, uint8_t length) {
    uint8_t cmd = data[0];
    switch (cmd) {
        case 0x03: // SET_KEY
            dynamic_keymap_set_keycode(data[1], data[2], data[3], (data[4] << 8) | data[5]);
            break;
    }
}
```

---

## 7. Summary

With this standalone distribution, you have:
1. **A complete, production-grade frontend** for key mapping, layer management, macro creation, profile switching, and lighting controls.
2. **Full independence from native binaries**, running on any static hosting platform (GitHub Pages, Vercel, Netlify) or local web server.
3. **A clear, extensible architecture** ready to be connected to physical DIY hardware via the modern WebHID API.
