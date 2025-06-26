import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { resolve } from 'path';
import { copy } from 'vite-plugin-copy';
import monacoEditorPlugin from 'vite-plugin-monaco-editor';

export default defineConfig({
  base: './',
  plugins: [
    react(),
    monacoEditorPlugin(),
    VitePWA({
      workbox: {
        maximumFileSizeToCacheInBytes: 10 * 1024 * 3024,
      },
      registerType: 'autoUpdate',
      manifest: {
        name: 'Python Lern-App',
        short_name: 'PythonApp',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#673ab7',
        icons: [
          {
            src: '/icon.png',
            sizes: '192x192',
            type: 'image/png',
          },
        ],
      },
    }),
    copy({
      targets: [
        { src: 'public/pyodide', dest: 'dist/pyodide' },
        {
          src: 'node_modules/monaco-editor/min/vs',
          dest: 'dist/monaco-editor/min/vs',
        },
      ],
      hook: 'writeBundle', // Oder 'buildEnd'
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        pyodide: resolve(__dirname, 'public/pyodide/pyodide.js'),
      },
    },
    outDir: 'dist', // Explizit den outDir setzen
  },
  optimizeDeps: {
    exclude: ['lucide-react'], // pyodide und monaco-editor entfernen
  },
});