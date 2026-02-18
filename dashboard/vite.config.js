import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    strictPort: true,
    open: true,
    host: true
  },
  preview: {
    port: 10000,
    host: '0.0.0.0',
    strictPort: true,
    allowedHosts: [
      'stockyard-dashboard.onrender.com',
      '.onrender.com',
      'localhost'
    ]
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  }
})
