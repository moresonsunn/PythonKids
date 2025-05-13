// index.js
import { app, BrowserWindow } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Die aktuelle Dateipfad auflösen
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let win;

app.on('ready', () => {
    win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js'), // Optional: preload-Skript
        },
    });
    win.maximize(); // Maximiere das Fenster
    win.loadFile(path.join(__dirname, 'dist', 'index.html'));

    // Optional: DevTools öffnen
    // win.webContents.openDevTools();
});