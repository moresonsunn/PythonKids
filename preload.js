const { contextBridge } = require('electron');
const path = require('path');

// Helper to get the correct path relative to the app root
function getResourcePath(...segments) {
  return path.join(__dirname, ...segments);
}

contextBridge.exposeInMainWorld('offlinePaths', {
  modelJson: getResourcePath('..', 'model_web', 'model.json'),
  pyodideDir: getResourcePath('..', 'public', 'pyodide'),
  tokenizerJson: getResourcePath('..', 'model_web', 'tokenizer.json'),
});
