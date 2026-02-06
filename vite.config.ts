import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  root: 'src/renderer',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src/renderer/src')
    }
  },
  server: {
    port: 5174,
    open: true,
    proxy: {
      '/api': {
        target: 'http://192.168.121.129:18085',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api.php/v1')
      }
    }
  }
})
