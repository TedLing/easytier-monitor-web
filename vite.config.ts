import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [ tailwindcss(), vue()],
  base: '/static/',
  server: {
    proxy: {
      // 将以 /api 开头的请求转发到后台
      '/api': {
        target: 'http://127.0.0.1:8081', // 后台服务器地址
        changeOrigin: true, // 修改请求的源为目标地址
        rewrite: (path) => path.replace(/^\/api/, '/api'), // 保留 /api 前缀
      },
    },
  },
})



