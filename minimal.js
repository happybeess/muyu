console.log('=== minimal test ===');
console.log('process.type:', process.type);
console.log('process.versions.electron:', process.versions.electron);

const { app, BrowserWindow } = require('electron');
console.log('app:', typeof app);
console.log('BrowserWindow:', typeof BrowserWindow);

if (app) {
  app.whenReady().then(() => {
    console.log('app is ready!');
    const win = new BrowserWindow({
      width: 400,
      height: 300,
      transparent: true,
      frame: false,
    });
    win.loadFile('index.html');
    // 5秒后自动退出
    setTimeout(() => { app.quit(); }, 5000);
  });
}
