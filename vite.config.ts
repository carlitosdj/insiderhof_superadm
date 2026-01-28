import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],

  build: {
    chunkSizeWarningLimit: 3000,
    commonjsOptions: {
      transformMixedEsModules: true,
      requireReturnsDefault: 'auto'
    }
  },

  optimizeDeps: {
    include: [
      'redux-saga',
      'moment-duration-format',
      'jspdf-autotable',
      'xlsx',
      'socket.io-client'
    ]
  },

  server: {
    port: 3003
  }
})