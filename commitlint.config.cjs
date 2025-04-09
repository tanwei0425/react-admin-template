// build: 影响构建系统或外部依赖项的更改（示例范围：gulp、broccoli、npm）
// ci: 更改我们的 CI 配置文件和脚本（示例范围：Travis、Circle、BrowserStack、SauceLabs）
// docs: 文档修改
// feat: 一个新的功能
// fix: 一个 bug 修复
// perf: 提升性能的代码修改
// refactor: 既不修复错误也不添加功能的代码更改
// style: 不影响代码含义的更改（空格、格式、缺少分号等）
// test: 添加缺失的测试或更正现有测试

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-leading-blank': [1, 'always'],
    'body-max-line-length': [2, 'always', 100],
    'footer-leading-blank': [1, 'always'],
    'footer-max-line-length': [2, 'always', 100],
    'header-max-length': [2, 'always', 100],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-case': [
      2,
      'never',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case'],
    ],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'feat', // ✨ 新功能	｜ 添加新功能模块、接口等
        'fix', // 🐛 修复 bug ｜ 修复逻辑或样式问题
        'docs', // 📝 文档变更 ｜ 修改 README、注释等
        'style', // 💄 代码格式	｜ 仅仅修改了空格、缩进、格式等，不影响逻辑
        'refactor', // ♻️ 重构 ｜	优化重写代码，未改变功能
        'test', // ✅ 测试 ｜ 添加或修改测试代码
        'chore', // 🔧 杂务 | 构建/工程依赖/工具
        'perf', // ⚡ 性能优化	｜ 提升性能、减少资源占用等
        'revert', // ⏪  回滚提交 ｜ 还原某次提交
        'build', // 📦 构建相关 ｜ 打包流程、工具配置（如 Vite、Webpack）
        'ci', // 🧪 CI配置 ｜ CI/CD 配置文件或脚本变更
      ],
    ],
  },
};
