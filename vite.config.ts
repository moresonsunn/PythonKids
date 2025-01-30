import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import babel from 'vite-plugin-babel';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    babel(),
    react(),
    VitePWA({
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
            type: 'image/png'
          }
        ]
      }
    })
  ],
  optimizeDeps: {
    exclude: ['lucide-react', 'brython', 'brython/stdlib'],
  },
  build: {
    rollupOptions: {
      external: ['brython', 'brython/stdlib'],
    },
  },
});
