import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // 👇 Forward all API requests to your backend
      '/api': {
        target: 'http://localhost:8080', // your local Express server
        changeOrigin: true,
        secure: false,
      },
    },
  },
})