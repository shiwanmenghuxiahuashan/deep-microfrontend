import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
  return {
    // 开发模式配置
    mode,
    // 非生产模式不压缩
    esbuild: {
      minifyIdentifiers: false,
      format: 'esm'
    },
    build: {
      // 开发模式生成 sourcemap
      sourcemap: mode === 'development',
      // 启用 Library 模式
      lib: {
        entry: resolve(__dirname, 'src/index.ts'), // 类库的入口文件
        name: 'MicroFrontend', // UMD/IIFE 模式下的全局变量名
        fileName: (format) => `MicroFrontend.${format}.js`, // 输出文件名格式
        // 开发模式只输出 ES 格式
        formats: mode === 'development' ? ['es'] : ['es', 'cjs', 'umd']
      }
    }
  };
});
