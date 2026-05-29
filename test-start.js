const { app } = require('electron');
console.log('app type:', typeof app);
if (app) {
  app.whenReady().then(() => {
    console.log('ready!');
    app.quit();
  });
} else {
  process.exit(1);
}
