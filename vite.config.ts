import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

const srcRoot = fileURLToPath(new URL('./src/', import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': srcRoot
    }
  },
  optimizeDeps: {
    exclude: ['recast-navigation']
  },
  server: {
    port: 3000,
    open: false
  },
  build: {
    target: 'es2022',
    sourcemap: true,
    chunkSizeWarningLimit: 1200
  }
});
