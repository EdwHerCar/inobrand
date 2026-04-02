import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { compression } from 'vite-plugin-compression2'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Compresión Gzip
    compression({
      algorithm: 'gzip',
      include: /\.(js|css|html|svg)$/,
      threshold: 1024,
    }),
    // Compresión Brotli (mejor que gzip)
    compression({
      algorithm: 'brotliCompress',
      include: /\.(js|css|html|svg)$/,
      threshold: 1024,
    })
  ],
  build: {
    // Optimización de chunks
    rollupOptions: {
      output: {
        manualChunks: {
          // Separar vendor libraries
          vendor: ['react', 'react-dom'],
          // Separar componentes de video
          videos: [
            './src/components/VideoGallery.jsx', 
            './src/components/VideoPlayer.jsx'
          ],
          // Separar utilidades
          utils: [
            './src/context/ThemeContext.jsx',
            './src/context/WhatsAppButtonContext.jsx'
          ]
        },
        // Nombres de archivos con hash para cache busting
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    // Aumentar límite de advertencia de chunk size
    chunkSizeWarningLimit: 1000,
    // Optimización adicional
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  // Optimización de servidor de desarrollo
  server: {
    headers: {
      'Cache-Control': 'public, max-age=0'
    }
  }
})
