import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import commonjs from '@rollup/plugin-commonjs'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'

export default defineConfig(({ mode }) => {
  const isProd = mode === 'production'

  return {
    plugins: [
      react(),

      // 🔥 força conversão de require() no build
      commonjs({
        include: [/node_modules/],
        transformMixedEsModules: true,
        requireReturnsDefault: 'auto',
      }),
    ],

    resolve: {
      alias: {
        process: 'process/browser',
      },
    },

    define: {
      'process.env.NODE_ENV': JSON.stringify(mode),
      'process.env': {},
      global: 'globalThis',
    },

    optimizeDeps: {
      esbuildOptions: {
        target: 'es2017',

        // 🔥 polyfills só para DEV
        plugins: [
          NodeGlobalsPolyfillPlugin({
            process: true,
            buffer: true,
          }),
        ],
      },

      include: [
        'redux-saga',
        'moment',
        'moment-duration-format',
        'xlsx',
        'jspdf-autotable',
        'socket.io-client',
      ],
    },

    build: {
      target: 'es2017',
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      minify: 'esbuild',

      chunkSizeWarningLimit: 3000,

      rollupOptions: {
        output: {
          format: 'es',
          entryFileNames: 'assets/[name]-[hash].js',
          chunkFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash].[ext]',
        },
      },
    },

    server: {
      port: 3003,
      strictPort: true,
    },

    preview: {
      port: 3003,
      strictPort: true,
    },
  }
})