// vite.config.js
import { defineConfig } from "file:///Users/edwhercar/Documents/Proyectos/Rob%20Arroyo/inobrand/node_modules/vite/dist/node/index.js";
import react from "file:///Users/edwhercar/Documents/Proyectos/Rob%20Arroyo/inobrand/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { compression } from "file:///Users/edwhercar/Documents/Proyectos/Rob%20Arroyo/inobrand/node_modules/vite-plugin-compression2/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    // Compresión Gzip
    compression({
      algorithm: "gzip",
      include: /\.(js|css|html|svg)$/,
      threshold: 1024
    }),
    // Compresión Brotli (mejor que gzip)
    compression({
      algorithm: "brotliCompress",
      include: /\.(js|css|html|svg)$/,
      threshold: 1024
    })
  ],
  build: {
    // Optimización de chunks
    rollupOptions: {
      output: {
        manualChunks: {
          // Separar vendor libraries
          vendor: ["react", "react-dom"],
          // Separar componentes de video
          videos: [
            "./src/components/VideoGallery.jsx",
            "./src/components/VideoPlayer.jsx"
          ],
          // Separar utilidades
          utils: [
            "./src/context/ThemeContext.jsx",
            "./src/context/WhatsAppButtonContext.jsx"
          ]
        },
        // Nombres de archivos con hash para cache busting
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]"
      }
    },
    // Aumentar límite de advertencia de chunk size
    chunkSizeWarningLimit: 1e3,
    // Optimización adicional
    minify: "terser",
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
      "Cache-Control": "public, max-age=0"
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvZWR3aGVyY2FyL0RvY3VtZW50cy9Qcm95ZWN0b3MvUm9iIEFycm95by9pbm9icmFuZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2Vkd2hlcmNhci9Eb2N1bWVudHMvUHJveWVjdG9zL1JvYiBBcnJveW8vaW5vYnJhbmQvdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2Vkd2hlcmNhci9Eb2N1bWVudHMvUHJveWVjdG9zL1JvYiUyMEFycm95by9pbm9icmFuZC92aXRlLmNvbmZpZy5qc1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnXG5pbXBvcnQgeyBjb21wcmVzc2lvbiB9IGZyb20gJ3ZpdGUtcGx1Z2luLWNvbXByZXNzaW9uMidcblxuLy8gaHR0cHM6Ly92aXRlLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgcmVhY3QoKSxcbiAgICAvLyBDb21wcmVzaVx1MDBGM24gR3ppcFxuICAgIGNvbXByZXNzaW9uKHtcbiAgICAgIGFsZ29yaXRobTogJ2d6aXAnLFxuICAgICAgaW5jbHVkZTogL1xcLihqc3xjc3N8aHRtbHxzdmcpJC8sXG4gICAgICB0aHJlc2hvbGQ6IDEwMjQsXG4gICAgfSksXG4gICAgLy8gQ29tcHJlc2lcdTAwRjNuIEJyb3RsaSAobWVqb3IgcXVlIGd6aXApXG4gICAgY29tcHJlc3Npb24oe1xuICAgICAgYWxnb3JpdGhtOiAnYnJvdGxpQ29tcHJlc3MnLFxuICAgICAgaW5jbHVkZTogL1xcLihqc3xjc3N8aHRtbHxzdmcpJC8sXG4gICAgICB0aHJlc2hvbGQ6IDEwMjQsXG4gICAgfSlcbiAgXSxcbiAgYnVpbGQ6IHtcbiAgICAvLyBPcHRpbWl6YWNpXHUwMEYzbiBkZSBjaHVua3NcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgbWFudWFsQ2h1bmtzOiB7XG4gICAgICAgICAgLy8gU2VwYXJhciB2ZW5kb3IgbGlicmFyaWVzXG4gICAgICAgICAgdmVuZG9yOiBbJ3JlYWN0JywgJ3JlYWN0LWRvbSddLFxuICAgICAgICAgIC8vIFNlcGFyYXIgY29tcG9uZW50ZXMgZGUgdmlkZW9cbiAgICAgICAgICB2aWRlb3M6IFtcbiAgICAgICAgICAgICcuL3NyYy9jb21wb25lbnRzL1ZpZGVvR2FsbGVyeS5qc3gnLCBcbiAgICAgICAgICAgICcuL3NyYy9jb21wb25lbnRzL1ZpZGVvUGxheWVyLmpzeCdcbiAgICAgICAgICBdLFxuICAgICAgICAgIC8vIFNlcGFyYXIgdXRpbGlkYWRlc1xuICAgICAgICAgIHV0aWxzOiBbXG4gICAgICAgICAgICAnLi9zcmMvY29udGV4dC9UaGVtZUNvbnRleHQuanN4JyxcbiAgICAgICAgICAgICcuL3NyYy9jb250ZXh0L1doYXRzQXBwQnV0dG9uQ29udGV4dC5qc3gnXG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICAvLyBOb21icmVzIGRlIGFyY2hpdm9zIGNvbiBoYXNoIHBhcmEgY2FjaGUgYnVzdGluZ1xuICAgICAgICBjaHVua0ZpbGVOYW1lczogJ2Fzc2V0cy9bbmFtZV0tW2hhc2hdLmpzJyxcbiAgICAgICAgZW50cnlGaWxlTmFtZXM6ICdhc3NldHMvW25hbWVdLVtoYXNoXS5qcycsXG4gICAgICAgIGFzc2V0RmlsZU5hbWVzOiAnYXNzZXRzL1tuYW1lXS1baGFzaF0uW2V4dF0nXG4gICAgICB9XG4gICAgfSxcbiAgICAvLyBBdW1lbnRhciBsXHUwMEVEbWl0ZSBkZSBhZHZlcnRlbmNpYSBkZSBjaHVuayBzaXplXG4gICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiAxMDAwLFxuICAgIC8vIE9wdGltaXphY2lcdTAwRjNuIGFkaWNpb25hbFxuICAgIG1pbmlmeTogJ3RlcnNlcicsXG4gICAgdGVyc2VyT3B0aW9uczoge1xuICAgICAgY29tcHJlc3M6IHtcbiAgICAgICAgZHJvcF9jb25zb2xlOiB0cnVlLFxuICAgICAgICBkcm9wX2RlYnVnZ2VyOiB0cnVlXG4gICAgICB9XG4gICAgfVxuICB9LFxuICAvLyBPcHRpbWl6YWNpXHUwMEYzbiBkZSBzZXJ2aWRvciBkZSBkZXNhcnJvbGxvXG4gIHNlcnZlcjoge1xuICAgIGhlYWRlcnM6IHtcbiAgICAgICdDYWNoZS1Db250cm9sJzogJ3B1YmxpYywgbWF4LWFnZT0wJ1xuICAgIH1cbiAgfVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNFYsU0FBUyxvQkFBb0I7QUFDelgsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsbUJBQW1CO0FBRzVCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQTtBQUFBLElBRU4sWUFBWTtBQUFBLE1BQ1YsV0FBVztBQUFBLE1BQ1gsU0FBUztBQUFBLE1BQ1QsV0FBVztBQUFBLElBQ2IsQ0FBQztBQUFBO0FBQUEsSUFFRCxZQUFZO0FBQUEsTUFDVixXQUFXO0FBQUEsTUFDWCxTQUFTO0FBQUEsTUFDVCxXQUFXO0FBQUEsSUFDYixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsT0FBTztBQUFBO0FBQUEsSUFFTCxlQUFlO0FBQUEsTUFDYixRQUFRO0FBQUEsUUFDTixjQUFjO0FBQUE7QUFBQSxVQUVaLFFBQVEsQ0FBQyxTQUFTLFdBQVc7QUFBQTtBQUFBLFVBRTdCLFFBQVE7QUFBQSxZQUNOO0FBQUEsWUFDQTtBQUFBLFVBQ0Y7QUFBQTtBQUFBLFVBRUEsT0FBTztBQUFBLFlBQ0w7QUFBQSxZQUNBO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQTtBQUFBLFFBRUEsZ0JBQWdCO0FBQUEsUUFDaEIsZ0JBQWdCO0FBQUEsUUFDaEIsZ0JBQWdCO0FBQUEsTUFDbEI7QUFBQSxJQUNGO0FBQUE7QUFBQSxJQUVBLHVCQUF1QjtBQUFBO0FBQUEsSUFFdkIsUUFBUTtBQUFBLElBQ1IsZUFBZTtBQUFBLE1BQ2IsVUFBVTtBQUFBLFFBQ1IsY0FBYztBQUFBLFFBQ2QsZUFBZTtBQUFBLE1BQ2pCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQTtBQUFBLEVBRUEsUUFBUTtBQUFBLElBQ04sU0FBUztBQUFBLE1BQ1AsaUJBQWlCO0FBQUEsSUFDbkI7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
