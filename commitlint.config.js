/**
 * Commitlint 配置文件
 * 使用 ES Module 格式以符合项目 "type": "module" 设置
 */
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // 允许提交信息主题使用任何大小写
    'subject-case': [0, 'never'],

    // 修复空白字符问题
    'header-trim': [2, 'always'],
    'subject-empty': [2, 'never'],
    'type-empty': [2, 'never'],

    // 提交类型限制
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能
        'fix', // 修复 bug
        'docs', // 文档更新
        'style', // 代码格式调整
        'refactor', // 重构
        'perf', // 性能优化
        'test', // 测试相关
        'chore', // 构建过程或辅助工具的变动
        'ci', // CI 配置文件和脚本的变动
        'build', // 构建系统或外部依赖的变动
        'revert' // 回滚之前的提交
      ]
    ]
  }
};
