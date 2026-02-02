import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig(({ mode }) => {
  const isProd = mode === 'production'

  return {
    plugins: [
      react(),
    ],

    resolve: {
      alias: {
        // evita imports errados do tipo "process", "__dirname", etc
        process: 'process/browser',
      },
    },

    define: {
      'process.env': {},
      global: 'globalThis',
    },

    optimizeDeps: {
      esbuildOptions: {
        target: 'es2017',
      },

      include: [
        // 🔥 libs CommonJS problemáticas
        'redux-saga',
        'moment',
        'moment-duration-format',
        'xlsx',
        'jspdf-autotable',
        'socket.io-client',
      ],

      // Force pre-bundle these packages
      force: true,
    },

    build: {
      target: 'es2017',
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      minify: 'esbuild',

      chunkSizeWarningLimit: 3000,

      commonjsOptions: {
        include: [/node_modules/],
        transformMixedEsModules: true,
        requireReturnsDefault: 'auto',
        ignoreDynamicRequires: true,
        defaultIsModuleExports: 'auto',
      },

      rollupOptions: {
        treeshake: {
          moduleSideEffects: 'no-external',
        },

        output: {
          format: 'es',
          entryFileNames: `assets/[name]-[hash].js`,
          chunkFileNames: `assets/[name]-[hash].js`,
          assetFileNames: `assets/[name]-[hash].[ext]`,

          // Inject global to avoid require() calls
          intro: 'const require = () => {};',
        },
      },
    },

    server: {
      port: 3004,
      strictPort: true,
    },

    preview: {
      port: 3004,
      strictPort: true,
    },
  }
})