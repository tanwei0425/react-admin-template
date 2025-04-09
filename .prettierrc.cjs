// .prettierrc.cjs
module.exports = {
  // ———— Prettier 常用选项 ————
  printWidth: 80, // 一行最多 80 字符
  tabWidth: 2, // 缩进使用 2 个空格
  useTabs: false, // 不用 tab，改用空格
  semi: true, // 语句末尾加分号
  singleQuote: true, // 使用单引号
  trailingComma: 'es5', // 多行时尽可能加逗号（ES5 兼容）
  bracketSpacing: true, // 对象字面量的大括号内有空格
  arrowParens: 'always', // 箭头函数单参数时也要加括号

  // ———— 插件 ————
  // 直接写包名，Prettier 会自动加载
  plugins: ['prettier-plugin-tailwindcss'],
};
