// main.js
const {
  app,
  BrowserWindow,
  screen,
  ipcMain,
  globalShortcut,
} = require("electron");
const path = require("path");
const fs = require("fs");

let mainWindow;
let isMouseEventsIgnored = false;

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  mainWindow = new BrowserWindow({
    width: 445,
    height: 700,
    x: width - 445 - 10,
    y: 10,
    frame: false,
    transparent: true,
    resizable: true,
    titleBarStyle: "hidden",
    titleBarOverlay: false, // Desativa completamente a sobreposição de título
    vibrancy: "under-window", // Para macOS (melhora a transparência)
    visualEffectState: "active", // Para macOS
    paintWhenInitiallyHidden: false, // Evita renderização prematura
    backgroundColor: "#00000000",
    hasShadow: false,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      backgroundThrottling: false,
      transparent: true,
    },
  });

  // Adicione este handler para eventos de foco
  mainWindow.on("blur", () => {
    mainWindow.setBackgroundColor("#00000000");
    mainWindow.setOpacity(1);
  });

  mainWindow.on("focus", () => {
    mainWindow.setBackgroundColor("#00000000");
  });

  mainWindow.loadFile("index.html");

  mainWindow.on("ready-to-show", () => {
    mainWindow.setIgnoreMouseEvents(false);
  });
}

// Controles de janela
ipcMain.on("window-control", (event, action) => {
  if (!mainWindow || mainWindow.isDestroyed()) return;

  switch (action) {
    case "minimize":
      mainWindow.minimize();
      break;
    case "maximize":
      mainWindow.isMaximized()
        ? mainWindow.unmaximize()
        : mainWindow.maximize();
      break;
    case "close":
      mainWindow.close();
      break;
  }
});

// Remova todas as chamadas de setTitleBarStyle e setTransparent
ipcMain.on("set-window-mode", (event, { interactive }) => {
  if (mainWindow && !mainWindow.isDestroyed()) {
    isMouseEventsIgnored = !interactive;
    mainWindow.setIgnoreMouseEvents(isMouseEventsIgnored, { forward: true });
    mainWindow.setAlwaysOnTop(true);
  }
});

ipcMain.on("set-chat-mode-ui", () => {
  if (mainWindow) {
    mainWindow.setHasShadow(false);
    mainWindow.setBackgroundColor("#00000000"); // Totalmente transparente
  }
});

// Configuração do atalho
app.whenReady().then(() => {
  createWindow();

  globalShortcut.register("CommandOrControl+Shift+I", () => {
    isMouseEventsIgnored = !isMouseEventsIgnored;
    if (mainWindow) {
      mainWindow.webContents.send(
        "toggle-interaction-mode",
        isMouseEventsIgnored
      );
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on("will-quit", () => {
  globalShortcut.unregisterAll();
});
