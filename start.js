// 启动脚本：清除 ELECTRON_RUN_AS_NODE 后启动 Electron
const { spawn } = require('child_process');
const path = require('path');

const env = { ...process.env };
delete env.ELECTRON_RUN_AS_NODE;

const electronExe = path.join(__dirname, 'node_modules', 'electron', 'dist', 'electron.exe');
const child = spawn(electronExe, ['.'], {
  cwd: __dirname,
  env,
  detached: true,
  stdio: 'ignore',
});

child.unref();
console.log('🐟 摸鱼敲木鱼已启动！');
