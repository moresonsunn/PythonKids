const { contextBridge } = require('electron');
const path = require('path');
const fs = require('fs');

// Get the base path - works for both dev and packaged app
function getBasePath() {
  // In packaged app, process.resourcesPath points to resources folder
  // In dev mode, __dirname is the project root

  // Check if we're in a packaged app
  if (process.resourcesPath) {
    // Packaged app - resources are in app.asar.unpacked or the app folder
    const appPath = path.join(process.resourcesPath, 'app');
    if (fs.existsSync(path.join(appPath, 'dist'))) {
      return path.join(appPath, 'dist');
    }
    // Try app.asar unpacked
    const unpackedPath = path.join(process.resourcesPath, 'app.asar.unpacked', 'dist');
    if (fs.existsSync(unpackedPath)) {
      return unpackedPath;
    }
  }

  // Dev mode - dist folder is next to this file
  const devDistPath = path.join(__dirname, 'dist');
  if (fs.existsSync(devDistPath)) {
    return devDistPath;
  }

  // Fallback - just return dirname
  return __dirname;
}

const basePath = getBasePath();

contextBridge.exposeInMainWorld('offlinePaths', {
  modelJson: path.join(basePath, 'model_web', 'model.json'),
  pyodideDir: path.join(basePath, 'pyodide'),
  tokenizerJson: path.join(basePath, 'model_web', 'tokenizer.json'),
  basePath: basePath,
});

// Also expose as a simple check
contextBridge.exposeInMainWorld('isElectron', true);
