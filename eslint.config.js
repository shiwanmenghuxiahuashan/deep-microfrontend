/**
 * ESLint 配置文件 - 基于官方推荐的最佳实践
 *
 * ESLint 官方推荐的最佳实践 (ES Module):
 *
 * 1. 使用 @eslint/js 包提供的推荐配置作为基础
 *    - js.configs.recommended 提供 JavaScript 最佳实践规则
 *
 * 2. TypeScript 项目使用 typescript-eslint 包
 *    - tseslint.configs.recommended 提供 TypeScript 推荐规则
 *    - 使用 project 选项指定 tsconfig.json 路径以获得更好的类型检查
 *
 * 3. 代码格式化工具集成
 *    - 使用 eslint-config-prettier 禁用与 Prettier 冲突的 ESLint 规则
 *    - 使用 eslint-plugin-prettier 将 Prettier 作为 ESLint 规则运行
 *
 * 4. 文件匹配和忽略策略
 *    - 使用 files 属性精确指定需要检查的文件
 *    - 使用 ignores 属性排除不需要检查的目录
 *
 * 5. 环境配置
 *    - 使用 globals 包提供标准环境全局变量
 *    - 根据项目需求选择合适的运行环境
 *
 * 6. 规则配置原则
 *    - 优先使用 'error' 级别处理严重问题
 *    - 使用 'warn' 级别处理潜在问题
 *    - 避免过度严格的规则配置
 *
 * 7. 插件管理
 *    - 只安装和使用必要的插件
 *    - 定期更新插件版本以获得最新规则
 *
 * 8. 性能优化
 *    - 使用 ignores 减少不必要的文件扫描
 *    - 合理配置 parserOptions 避免重复解析
 */

import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

/**
 * ESLint 配置文件
 * 由于只有 micro-frontend 包使用 TypeScript，所以只对该包进行 TS 相关检查
 * 集成了 Prettier 以避免格式化规则冲突
 */
export default [
  // 基础 JavaScript 推荐配置
  js.configs.recommended,

  // TypeScript 推荐配置
  ...tseslint.configs.recommended,

  // Prettier 配置 - 禁用与 Prettier 冲突的 ESLint 规则
  prettierConfig,

  // 针对 micro-frontend 包的 TypeScript 配置
  {
    // 只检查 micro-frontend 包中的 TypeScript 文件
    files: ['packages/micro-frontend/src/**/*.{ts,tsx}'],
    languageOptions: {
      // 使用浏览器环境全局变量
      globals: globals.browser,
      parserOptions: {
        // 指定 TypeScript 项目配置文件
        project: ['./packages/micro-frontend/tsconfig.json'],
        // 设置配置文件根目录
        tsconfigRootDir: import.meta.dirname
      }
    },
    rules: {
      // TypeScript 相关规则
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      // Prettier 集成规则
      'prettier/prettier': 'error'
    },
    plugins: {
      prettier: prettierPlugin
    }
  },

  // 忽略文件配置
  {
    ignores: [
      'dist/*', // 构建输出目录
      'node_modules/', // 依赖包目录
      'packages/dev/**/*' // dev 包目录（不使用 TypeScript）
    ]
  }
];
