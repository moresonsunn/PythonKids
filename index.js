// index.js
import { app, BrowserWindow, protocol } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';

// Die aktuelle Dateipfad auflösen
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let win;

// Register file protocol for loading local resources
app.whenReady().then(() => {
    // Allow loading local files
    protocol.registerFileProtocol('local-file', (request, callback) => {
        const url = request.url.replace('local-file://', '');
        callback({ path: decodeURIComponent(url) });
    });

    win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            webSecurity: false, // Allow loading from file:// protocol
            preload: path.join(__dirname, 'preload.js'),
        },
    });
    win.maximize();
    win.loadFile(path.join(__dirname, 'dist', 'index.html'));

    // Enable DevTools for debugging (can be removed in production)
    // win.webContents.openDevTools();
});