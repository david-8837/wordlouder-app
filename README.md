# Work Louder Input — Standalone Web Frontend

A 100% standalone, zero-backend, pure static web build of the official **Work Louder Input** interface.

## 🚀 Live Local URL
When served locally, it runs at:
**[http://localhost:5000](http://localhost:5000)**

## 📂 Project Structure
```text
worklouder-web/
├── index.html            # Main Work Louder keymapper & configurator
├── cheat_sheet.html      # Floating shortcut HUD overlay
├── radial_menu.html      # Circular radial pie menu overlay
├── mock_bridge.js        # Zero-backend browser emulation layer
├── favicon.ico           # Official Work Louder icon
├── assets/               # Bundled JavaScript, CSS, SVGs & icons
└── Launch_Website.bat    # 1-click launcher
```

## 🛠 Features Included
- **No Backend / No Electron Required**: Runs in any modern browser (Chrome, Edge, Firefox, Safari).
- **Auto-Connected Simulation**: Automatically loads the **Creator Micro V2** profile, layers, keymaps, and encoders.
- **Hardware Switcher**: Floating HUD at bottom-right lets you toggle between:
  - **Creator Micro V2**
  - **Nomad [E]**
  - **Work Louder Knob**
- **Full Tabs Access**: Keymap editor, Presets browser, Widgets, and App Settings.

## 🌐 Deploy to Free Web Hosting
Because this folder consists purely of static HTML, CSS, and JS:
1. **GitHub Pages**: Push this folder to a GitHub repository and enable GitHub Pages on `main`.
2. **Vercel / Netlify**: Drag-and-drop this folder or deploy with output directory set to `./`.

