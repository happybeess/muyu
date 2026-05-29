const { app, BrowserWindow, Tray, Menu, nativeImage } = require('electron');
const path = require('path');

let win = null;
let tray = null;
let ctrlDown = false;
let uiohook = null;

function createWindow() {
  const { screen } = require('electron');
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width: screenWidth, height: screenHeight } = primaryDisplay.workAreaSize;
  const winW = 260, winH = 200;

  win = new BrowserWindow({
    width: winW,
    height: winH,
    x: screenWidth - winW - 20,
    y: screenHeight - winH - 20,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    skipTaskbar: true,
    resizable: false,
    hasShadow: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // 默认点击穿透
  win.setIgnoreMouseEvents(true, { forward: true });
  win.loadFile('index.html');
  win.on('closed', () => { win = null; });
}

function setupKeyboardHook() {
  try {
    uiohook = require('uiohook-napi');
    uiohook.uIOhook.start();

    uiohook.uIOhook.on('keydown', (e) => {
      // Ctrl 按下 → 取消穿透，可拖动
      if (e.keycode === 29 || e.keycode === 585) {
        ctrlDown = true;
        if (win) win.setIgnoreMouseEvents(false);
        return;
      }
      // 空格 → 直接退出
      if (e.keycode === 57) {
        stopHook();
        app.quit();
        return;
      }
      // 过滤修饰键
      const mods = [42, 54, 56, 100, 3675, 3676, 29, 585];
      if (mods.includes(e.keycode)) return;
      // 通知渲染进程
      if (win && !win.isDestroyed()) {
        win.webContents.send('global-keydown');
      }
    });

    uiohook.uIOhook.on('keyup', (e) => {
      if (e.keycode === 29 || e.keycode === 585) {
        ctrlDown = false;
        if (win) win.setIgnoreMouseEvents(true, { forward: true });
      }
    });
  } catch(err) {
    console.error('uiohook failed:', err.message);
  }
}

function createTray() {
  // 创建 16×16 小鱼图标（简单像素画）
  const canvas = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16">
      <circle cx="8" cy="8" r="7" fill="#e8a040"/>
      <circle cx="5" cy="6" r="1.5" fill="#1a1a1a"/>
      <ellipse cx="12" cy="8" rx="3" ry="2" fill="#d08030"/>
    </svg>`;
  const icon = nativeImage.createFromBuffer(Buffer.from(canvas));

  tray = new Tray(icon);
  const contextMenu = Menu.buildFromTemplate([
    { label: '🐟 摸鱼敲木鱼', enabled: false },
    { type: 'separator' },
    { label: '按住 Ctrl 拖动窗口', enabled: false },
    { type: 'separator' },
    {
      label: '退出',
      click: () => {
        stopHook();
        app.quit();
      },
    },
  ]);
  tray.setToolTip('摸鱼敲木鱼');
  tray.setContextMenu(contextMenu);
}

function stopHook() {
  if (uiohook) {
    try { uiohook.uIOhook.stop(); } catch(e) {}
  }
}

app.whenReady().then(() => {
  createWindow();
  setupKeyboardHook();
  createTray();
});

app.on('window-all-closed', () => {
  stopHook();
  app.quit();
});

app.on('before-quit', () => {
  stopHook();
});
