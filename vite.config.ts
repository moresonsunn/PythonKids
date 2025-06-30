import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { resolve } from 'path';
import { copy } from 'vite-plugin-copy';

export default defineConfig({
  base: './',
  plugins: [
    react(),
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
        { src: 'node_modules/monaco-editor/min/vs', dest: 'dist/monaco-editor/min/vs' },
        { src: 'node_modules/monaco-editor/min/vs/editor/editor.main.css', dest: 'dist/monaco-editor/min/vs/editor' },
        { src: 'model_web', dest: 'dist/model_web' },
      ],
      hook: 'writeBundle',
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
    outDir: 'dist',
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});