// Work Louder Web Standalone Simulation Bridge
// Fully standalone - runs 100% in any web browser without Electron or backend server

(function () {
  console.log(
    "%c[Work Louder Standalone Web UI Active]",
    "background: #18181b; color: #38bdf8; font-weight: bold; font-size: 14px; padding: 4px 8px; border-radius: 4px;"
  );

  const mockDevices = {
    creator_micro_v2: {
      id: 1,
      name: "Creator Micro V2",
      deviceType: "creator_micro_v2",
      layoutType: "universal",
      devicePid: "33432",
      connectionType: "hid",
      isConnected: true,
      isUsbConnection: true,
      portPath: "COM3",
      deviceStatus: {
        battery: 100,
        batteryPercentage: 100,
        isCharging: false,
        selectedProfileIndex: 0,
        selectedLayerIndex: 1,
        firmwareVersion: "1.0.0",
        fwVersion: "1.0.0"
      }
    },
    nomad_e: {
      id: 2,
      name: "Nomad [E]",
      deviceType: "nomad_e",
      layoutType: "ansi",
      devicePid: "33428",
      connectionType: "hid",
      isConnected: true,
      isUsbConnection: true,
      portPath: "COM4",
      deviceStatus: {
        battery: 100,
        batteryPercentage: 100,
        isCharging: false,
        selectedProfileIndex: 0,
        selectedLayerIndex: 1,
        firmwareVersion: "1.0.0",
        fwVersion: "1.0.0"
      }
    },
    knob: {
      id: 3,
      name: "Work Louder Knob",
      deviceType: "knob",
      layoutType: "ansi",
      devicePid: "33507",
      connectionType: "hid",
      isConnected: true,
      isUsbConnection: true,
      portPath: "COM5",
      deviceStatus: {
        battery: 100,
        batteryPercentage: 100,
        isCharging: false,
        selectedProfileIndex: 0,
        selectedLayerIndex: 1,
        firmwareVersion: "1.0.0",
        fwVersion: "1.0.0"
      }
    }
  };

  let activeDevice = mockDevices.creator_micro_v2;

  window.commonChannel = {
    platform: "win32",
    appVersion: () => Promise.resolve("1.0.2"),
    onMainLog: () => () => {},
    openDevTools: () => {},
    enableMenuShortcuts: () => {},
    disableMenuShortcuts: () => {},
    openMacSettings: () => {},
    openExternalTab: (url) => window.open(url, "_blank"),
    openFilePicker: () => Promise.resolve([]),
    getIsDevToolsOpen: () => Promise.resolve(true),
    onDevToolsChanged: (cb) => {
      setTimeout(() => cb(true), 150);
      return () => {};
    },
    startFocusDetect: () => Promise.resolve(),
    sendAnalytics: () => Promise.resolve(),
    getAppSettings: () =>
      Promise.resolve({
        showedAnalyticsPopUp: true,
        analyticsEnabled: false,
        autoCheckUpdates: false,
        smartActionCmdEnabled: true,
        deviceNotificationsEnabled: true,
        autoStartupEnabled: false
      }),
    saveAppSettings: () => Promise.resolve(),
    onShortcutTriggered: () => () => {},
    checkAppPermissions: () => Promise.resolve(true)
  };

  let deviceListeners = [];

  window.devicesManagerChannel = {
    searchDevices: () => Promise.resolve(Object.values(mockDevices)),
    getDevices: () => Promise.resolve(Object.values(mockDevices)),
    getBootloaderDevices: () => Promise.resolve([]),
    onDevicesFound: (cb) => {
      deviceListeners.push(cb);
      setTimeout(() => cb(Object.values(mockDevices)), 150);
      return () => {
        deviceListeners = deviceListeners.filter((l) => l !== cb);
      };
    },
    onBootloaderDevicesFound: () => () => {},
    getLatestFwRelease: () => Promise.resolve(null),
    onFlashingProgress: () => () => {},
    onFlashingLog: () => () => {},
    flashFirmware: () => Promise.resolve()
  };

  window.connectedDeviceChannel = {
    isConnected: () => Promise.resolve(true),
    getFileFetchStatus: () => Promise.resolve(2), // 2 = EA.fetched
    getConnectedDevice: () => Promise.resolve(activeDevice),
    getFirmwareInfo: () => Promise.resolve({ version: "1.0.0" }),
    connect: () => Promise.resolve(true),
    disconnect: () => Promise.resolve(),
    onConnectionEvents: () => () => {},
    onFileFetchEvents: (cb) => {
      setTimeout(() => cb({ fileName: "keymap.json", status: 2 }), 100);
      return () => {};
    },
    onHidUnavailable: () => () => {},
    changeDeviceConfig: () => Promise.resolve(true),
    onChangeDeviceConfigResult: (cb) => {
      setTimeout(() => cb(activeDevice.id, true), 50);
      return () => {};
    },
    abortRpcCall: () => Promise.resolve(),
    clearCache: () => Promise.resolve(),
    deleteWallpaper: () => Promise.resolve(),
    addWallpaper: () => Promise.resolve(),
    getFwUpdateInfo: () => Promise.resolve(null),
    getLatestFwRelease: () => Promise.resolve(null),
    refreshDeviceStatus: () => Promise.resolve()
  };

  window.rpcChannel = {
    getFirmwareVersion: () => Promise.resolve({ ok: true, value: "1.0.0" }),
    getDeviceStatus: () =>
      Promise.resolve({ ok: true, value: { battery: 100, isCharging: false } }),
    getFirmwareVersionLegacy: () => Promise.resolve({ ok: true, value: "1.0.0" }),
    sendIntoBootloader: () => Promise.resolve(),
    sentIntoBootloaderLegacy: () => Promise.resolve(),
    sendIntoSelfTest: () => Promise.resolve(),
    sendIntoSelfTestLegacy: () => Promise.resolve(),
    getFileList: () =>
      Promise.resolve({ ok: true, value: [{ name: "keymap.json" }] }),
    readFile: () => Promise.resolve({ ok: true, value: "{}" }),
    writeFile: () => Promise.resolve({ ok: true }),
    writeFileChunked: () => Promise.resolve({ ok: true }),
    readFileChunked: () => Promise.resolve({ ok: true, value: "{}" }),
    deleteFile: () => Promise.resolve({ ok: true }),
    sendHomeAccentColor: () => Promise.resolve({ ok: true }),
    sendLightingPreview: () => Promise.resolve({ ok: true }),
    fetchDeviceData: () => Promise.resolve({ ok: true }),
    fetchWallpaper: () => Promise.resolve({ ok: true })
  };

  window.localStorageChannel = {
    getDeviceConfig: () => Promise.resolve(null),
    saveDeviceConfig: (dev, config) => {
      console.log("[Simulation] Saved device config:", config);
      return Promise.resolve();
    },
    getPresets: () => Promise.resolve([]),
    savePreset: () => Promise.resolve(),
    getPendingMigration: () => Promise.resolve(null),
    savePendingMigration: () => Promise.resolve(),
    markMigrationShown: () => Promise.resolve()
  };

  window.imageChannel = {
    convertImageToLvglFormat: () => Promise.resolve(""),
    convertImageFromLvglFormat: () => Promise.resolve(""),
    getAccentColorFromImage: () => Promise.resolve("#3b82f6"),
    getWallpaperImage: () => Promise.resolve(""),
    getGifFrameCount: () => Promise.resolve(1),
    cropGifImage: () => Promise.resolve("")
  };

  window.fsChannel = {
    downloadFile: () => Promise.resolve(),
    deleteFile: () => Promise.resolve(),
    readBinaryFile: () => Promise.resolve(""),
    getApplications: () => Promise.resolve([]),
    openApplication: () => Promise.resolve()
  };

  window.updateChannel = {
    checkUpdates: () => Promise.resolve(),
    getAppReleaseNotes: () => Promise.resolve(""),
    instalUpdates: () => Promise.resolve(),
    onUpdateDownloaded: () => () => {}
  };

  function applyDevice(type) {
    activeDevice = mockDevices[type] || mockDevices.creator_micro_v2;
    deviceListeners.forEach((cb) => cb(Object.values(mockDevices)));

    if (window.__WL_STORE__ && window.__WL_FACTORY__) {
      try {
        const factory = window.__WL_FACTORY__.instance;
        const result = factory.createProfile({
          id: 0,
          name: "Default Profile",
          deviceType: activeDevice.deviceType,
          deviceLayoutType: activeDevice.layoutType,
          language: "en_us"
        });

        console.log("[Simulation] Applied device profile:", activeDevice.name, result);

        window.__WL_STORE__.setState({
          phase: "completed",
          deviceInfo: activeDevice,
          profiles: [result.newProfile],
          profileSelected: 0,
          layerSelected: 0,
          actions: result.actions || [],
          multiactions: result.multiactions || [],
          actionGroups: [],
          multiactionGroups: [],
          smartActions: [],
          smartActionGroups: [],
          linkedApps: []
        });
      } catch (err) {
        console.error("[Simulation] Error generating profile:", err);
      }
    }
  }

  // Auto-connect as soon as store and factory are mounted
  function initAutoConnect() {
    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      if (window.__WL_STORE__ && window.__WL_FACTORY__) {
        clearInterval(interval);
        console.log("[Simulation] Engine ready! Mounting default hardware UI...");
        applyDevice("creator_micro_v2");
      }
      if (attempts > 50) clearInterval(interval);
    }, 100);
  }

  initAutoConnect();

  // Floating Simulator Navigation Bar
  window.addEventListener("DOMContentLoaded", () => {
    const hud = document.createElement("div");
    hud.id = "wl-sim-hud";
    hud.style.position = "fixed";
    hud.style.bottom = "14px";
    hud.style.right = "14px";
    hud.style.zIndex = "99999999";
    hud.style.background = "rgba(24, 24, 27, 0.95)";
    hud.style.backdropFilter = "blur(16px)";
    hud.style.border = "1px solid rgba(82, 82, 91, 0.8)";
    hud.style.borderRadius = "12px";
    hud.style.padding = "8px 14px";
    hud.style.boxShadow = "0 20px 40px -10px rgba(0, 0, 0, 0.7), 0 0 1px rgba(255, 255, 255, 0.2)";
    hud.style.display = "flex";
    hud.style.alignItems = "center";
    hud.style.gap = "8px";
    hud.style.fontFamily = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    hud.style.fontSize = "12px";
    hud.style.color = "#f4f4f5";
    hud.style.userSelect = "none";

    hud.innerHTML = `
      <div style="display: flex; align-items: center; gap: 6px;">
        <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: #22c55e; box-shadow: 0 0 8px #22c55e;"></span>
        <span style="font-weight: 700; color: #38bdf8;">SIMULATOR</span>
      </div>

      <div style="height: 18px; width: 1px; background: #3f3f46; margin: 0 4px;"></div>

      <span style="color: #a1a1aa;">Tabs:</span>
      <button class="sim-tab-btn" data-tab="Keymap" style="background: #2563eb; color: #fff; border: none; border-radius: 5px; padding: 4px 8px; font-size: 11px; font-weight: 600; cursor: pointer;">Keymap</button>
      <button class="sim-tab-btn" data-tab="Preset" style="background: #3f3f46; color: #fff; border: none; border-radius: 5px; padding: 4px 8px; font-size: 11px; font-weight: 600; cursor: pointer;">Preset</button>
      <button class="sim-tab-btn" data-tab="Settings" style="background: #3f3f46; color: #fff; border: none; border-radius: 5px; padding: 4px 8px; font-size: 11px; font-weight: 600; cursor: pointer;">Settings</button>
      <button class="sim-tab-btn" data-tab="Widgets" style="background: #3f3f46; color: #fff; border: none; border-radius: 5px; padding: 4px 8px; font-size: 11px; font-weight: 600; cursor: pointer;">Widgets</button>

      <div style="height: 18px; width: 1px; background: #3f3f46; margin: 0 4px;"></div>

      <span style="color: #a1a1aa;">Device:</span>
      <select id="sim-dev-select" style="background: #27272a; color: #fff; border: 1px solid #52525b; border-radius: 6px; padding: 4px 8px; font-size: 11px; outline: none; cursor: pointer;">
        <option value="creator_micro_v2" selected>Creator Micro V2</option>
        <option value="nomad_e">Nomad [E]</option>
        <option value="knob">Work Louder Knob</option>
      </select>

      <div style="height: 18px; width: 1px; background: #3f3f46; margin: 0 4px;"></div>

      <span style="color: #a1a1aa;">Screens:</span>
      <button class="sim-nav-btn" data-hash="#/choose-device" style="background: #27272a; border: 1px solid #52525b; color: #e4e4e7; border-radius: 5px; padding: 4px 8px; font-size: 11px; font-weight: 500; cursor: pointer;">Choose Device</button>
      <button class="sim-nav-btn" data-hash="#/wallpaper" style="background: #27272a; border: 1px solid #52525b; color: #e4e4e7; border-radius: 5px; padding: 4px 8px; font-size: 11px; font-weight: 500; cursor: pointer;">Wallpaper</button>
      <button class="sim-nav-btn" data-hash="#/permissions-guide" style="background: #27272a; border: 1px solid #52525b; color: #e4e4e7; border-radius: 5px; padding: 4px 8px; font-size: 11px; font-weight: 500; cursor: pointer;">Permissions</button>
      <a href="./cheat_sheet.html" target="_blank" style="background: #27272a; border: 1px solid #52525b; color: #38bdf8; text-decoration: none; border-radius: 5px; padding: 4px 8px; font-size: 11px; font-weight: 500;">Cheat Sheet ↗</a>
      <a href="./radial_menu.html" target="_blank" style="background: #27272a; border: 1px solid #52525b; color: #38bdf8; text-decoration: none; border-radius: 5px; padding: 4px 8px; font-size: 11px; font-weight: 500;">Radial Menu ↗</a>
    `;
    document.body.appendChild(hud);

    const sel = document.getElementById("sim-dev-select");
    sel.addEventListener("change", (e) => {
      applyDevice(e.target.value);
    });

    hud.querySelectorAll(".sim-nav-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        window.location.hash = btn.dataset.hash;
      });
    });

    hud.querySelectorAll(".sim-tab-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const tab = btn.dataset.tab;
        if (window.location.hash !== "#/main") {
          window.location.hash = "#/main";
        }
        setTimeout(() => {
          if (typeof window.__WL_SET_TAB__ === "function") {
            window.__WL_SET_TAB__(tab);
          }
        }, 50);

        hud.querySelectorAll(".sim-tab-btn").forEach((b) => {
          b.style.background = "#3f3f46";
        });
        btn.style.background = "#2563eb";
      });
    });
  });
})();
