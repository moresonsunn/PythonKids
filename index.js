import { app, BrowserWindow } from 'electron';
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
        },
    });
    win.maximize(); // Maximiere das Fenster
    win.loadFile(join(__dirname, 'dist', 'index.html')); // Lade die gebaute Vite-App
});
