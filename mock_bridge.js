// Work Louder Web Standalone Simulation Bridge
// Fully standalone - runs 100% in any web browser without Electron or backend server
// Seamless native integration: no floating bars, native top-bar tabs & device dropdown

(function () {
  console.log(
    "%c[Work Louder Standalone Web UI Active]",
    "background: #18181b; color: #38bdf8; font-weight: bold; font-size: 14px; padding: 4px 8px; border-radius: 4px;"
  );

  const mockDevices = {
    1: {
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
    2: {
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
    3: {
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

  const allDevicesList = Object.values(mockDevices);
  let activeId = 1;
  let activeDevice = mockDevices[activeId];

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
    searchDevices: () => Promise.resolve(allDevicesList),
    getDevices: () => Promise.resolve(allDevicesList),
    getBootloaderDevices: () => Promise.resolve([]),
    onDevicesFound: (cb) => {
      deviceListeners.push(cb);
      setTimeout(() => cb(allDevicesList), 100);
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
    getConnectedDevice: (id) => Promise.resolve(mockDevices[id] || activeDevice),
    getFirmwareInfo: () => Promise.resolve({ version: "1.0.0" }),
    connect: (id) => {
      if (id && mockDevices[id]) {
        activeId = id;
        activeDevice = mockDevices[id];
        applyDevice(activeDevice);
      }
      return Promise.resolve(true);
    },
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

  function applyDevice(dev) {
    activeDevice = dev;
    activeId = dev.id;
    deviceListeners.forEach((cb) => cb(allDevicesList));

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

        console.log("[Simulation] Mounted hardware profile:", activeDevice.name, result);

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
        applyDevice(mockDevices[1]); // Default to Creator Micro V2
      }
      if (attempts > 50) clearInterval(interval);
    }, 100);
  }

  initAutoConnect();
})();
