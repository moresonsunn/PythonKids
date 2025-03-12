import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { resolve } from 'path';
import { copy } from 'vite-plugin-copy';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    VitePWA({
      workbox: {
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
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
        { src: 'public/pyodide/*', dest: 'dist/pyodide' },
      ],
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react', 'pyodide', 'monaco-editor'],
  },
});
