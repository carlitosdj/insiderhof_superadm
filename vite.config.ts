import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import commonjs from 'vite-plugin-commonjs'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), commonjs()],
  //base: "/metronic8/react/demo1/",
  build: {
    chunkSizeWarningLimit: 3000,
  },
  server:{
    port: 3003
  }
})
