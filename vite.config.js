import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'

export default defineConfig({
  plugins: [
    react(),
    basicSsl()  
  ],
  server: {
    https: true,
    proxy: {
      '/ws-stomp': {
        target: 'https://api.teamcollab.site',
        changeOrigin: true,
        ws: true
      },
      '/api': {
        target: 'https://api.teamcollab.site',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  define: {
    global: 'globalThis',
  }
})