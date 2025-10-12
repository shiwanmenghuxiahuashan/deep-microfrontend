/**
 * Prettier 配置文件
 * 与 ESLint 集成，避免格式化规则冲突
 * 这些规则会覆盖 ESLint 的格式化相关规则
 */
const config = {
  // 行宽限制
  printWidth: 80,

  // 缩进设置
  tabWidth: 2,
  useTabs: false,

  // 分号设置
  semi: true,

  // 引号设置
  singleQuote: true,

  // 尾随逗号
  trailingComma: 'none',

  // 括号间距
  bracketSpacing: true,
  bracketSameLine: true,

  // 其他设置
  insertPragma: false,
  endOfLine: 'lf',
  arrowParens: 'always',

  // Vue 相关设置
  vueIndentScriptAndStyle: false,
  singleAttributePerLine: true
};

export default config;
