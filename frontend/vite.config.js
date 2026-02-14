import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
   server: {
    port: 5173,        // Fixed port for frontend
    strictPort: true,  // Will error if port is already in use
    host: true,        // Expose to network
    open: true         // Auto-open browser
  }
})
