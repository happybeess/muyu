<img width="1401" height="869" alt="image" src="https://github.com/user-attachments/assets/f0ca287a-400a-471d-bae9-c81d75ac18dc" /># 摸鱼敲木鱼 - 桌面宠物

一个桌面端「摸鱼敲木鱼」小宠物，纯 Canvas 绘制的水墨风景画，敲键盘就敲木鱼，鱼儿加速游动，粒子飞溅。

## 效果展示
<img width="1401" height="869" alt="image" src="https://github.com/user-attachments/assets/08a7f6d9-4029-4b94-9b18-1ea9c6727246" />


- **椭圆形透明窗口**悬浮在桌面右下角，不影响正常工作
- 画面包含：远山、柳树、荷塘、锦鲤、木鱼
- **敲任意键盘按键** → 木鱼被敲击 + 水面涟漪 + 金色粒子飞溅 + 锦鲤加速游动
- 敲得越快，动画越激烈；停手后缓慢恢复宁静
- 按住 **Ctrl** 可拖动窗口位置
- 按 **空格键** 退出程序

## 依赖环境

| 依赖 | 用途 | 版本 |
|------|------|------|
| **Node.js** | JavaScript 运行环境 | >= 16 |
| **npm** | 包管理器（随 Node.js 安装） | >= 8 |
| **electron** | 桌面应用框架，提供透明窗口、系统托盘等 | ^33.0.0 |
| **uiohook-napi** | 全局键盘钩子，监听任意界面的按键 | ^1.5.0 |

> **注意**：`electron` 和 `uiohook-napi` 会在 `npm install` 时自动安装，无需手动下载。

## 快速开始

### 1. 安装依赖

```bash
cd muyu-pet
npm install
```

> 首次安装会下载 Electron（约 115MB），可能需要几分钟。如果网络慢，可换国内镜像：
> ```bash
> npm config set electron_mirror https://npmmirror.com/mirrors/electron/
> npm install
> ```

### 2. 启动方式

**方式 A：双击批处理文件（最简单）**

直接双击 `启动木鱼.bat`

**方式 B：命令行启动**

```bash
npm start
```

**方式 C：直接运行 Electron**

```bash
node_modules\electron\dist\electron.exe .
```

### 3. 浏览器预览（无 Electron）

直接用浏览器打开 `index.html` 也能看到画面，点击画面触发木鱼敲击，但无法使用全局键盘监听和透明窗口。

## 项目文件说明

```
muyu-pet/
├── index.html        # 画面渲染（Canvas 绘制所有场景）
├── main.js           # Electron 主进程（窗口、键盘钩子、托盘）
├── preload.js        # 安全桥接（主进程 → 渲染进程通信）
├── start.js          # 启动脚本（清除环境变量后启动 Electron）
├── 启动木鱼.bat       # Windows 一键启动
├── package.json      # 项目配置与依赖声明
├── minimal.js        # 最小化测试脚本（开发调试用）
├── test-start.js     # 测试启动脚本（开发调试用）
└── node_modules/     # 依赖包目录（npm install 后生成）
```

## 操作指南

| 操作 | 效果 |
|------|------|
| 敲任意键盘按键 | 敲木鱼 + 涟漪 + 粒子 + 鱼加速 |
| 连续快速敲击 | 动画越来越激烈 |
| 点击画面 | 同样触发敲击（浏览器模式适用） |
| 按住 Ctrl | 窗口可拖动（松开恢复穿透） |
| 按空格键 | 退出程序 |
| 右键托盘图标 | 显示菜单，可退出 |

## 打包成 exe 分享给别人

如果想让没有 Node.js 的人也能一键使用，需要打包成独立的 exe：

```bash
# 安装打包工具
npm install --save-dev electron-builder

# 打包（跳过原生模块重编译）
npx electron-builder --win --config.npmRebuild=false
```

打包完成后在 `dist/` 目录下找到 `摸鱼敲木鱼.exe`，直接发给别人双击即可运行。

> **网络问题**：打包时 electron-builder 需要下载 Electron 二进制包，如果 GitHub 下载超时，设置镜像：
> ```bash
> set ELECTRON_MIRROR=https://npmmirror.com/mirrors/electron/
> npx electron-builder --win --config.npmRebuild=false
> ```
