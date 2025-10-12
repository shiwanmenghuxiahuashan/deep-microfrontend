import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => /^micro-frontend/.test(tag)
        }
      }
    })
  ],
  server: {
    port: 4787,
    fs: {
      // 允许为项目根目录的上一级提供文件系统访问权限
      strict: false
    },
    open: true
  }
});
