import { app, BrowserWindow, Tray, Menu, ipcMain } from 'electron';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let tray = null;
let mainWindow = null;

function createWindow() {
  const iconPath = join(__dirname, '..', 'dist', 'icon.png');

  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    resizable: true,
    icon: iconPath,
    webPreferences: {
      contextIsolation: true,
      preload: join(__dirname, 'preload.js') // optional, if using IPC
    }
  });

  win.loadFile(join(__dirname, '..', 'dist', 'index.html'));
  mainWindow = win;
}

app.whenReady().then(() => {
  const iconPath = join(__dirname, '..', 'dist', 'icon.png');

  tray = new Tray(iconPath);
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Show App', click: () => createWindow() },
    { label: 'Quit', click: () => app.quit() }
  ]);
  tray.setToolTip('PWA Notes');
  tray.setContextMenu(contextMenu);

  createWindow();
});

ipcMain.handle('resize-window', (event, width, height) => {
  if (mainWindow) {
    mainWindow.setSize(width, height);
  }
});
