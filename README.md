# react-admin-template 后台管理系统

简单上手，可扩展性高的后台管理端项目基础模板

如果对您有一点帮助，麻烦给下 star 🌟 万分感谢～～～～

## 技术栈

| 类别     | 技术                                         | 版本      |
| -------- | -------------------------------------------- | --------- |
| 框架     | React                                        | 19.x      |
| 路由     | React Router                                 | 7.x       |
| UI       | Ant Design                                   | 6.x       |
| 样式     | Tailwind CSS / SCSS / CSS-in-JS (antd-style) | 4.x       |
| 状态管理 | @reduxjs/toolkit + react-redux               | 2.x / 9.x |
| 请求     | Axios + Ahooks (useRequest)                  | 1.x / 3.x |
| 构建     | Vite                                         | 6.x       |
| 规范     | ESLint / Prettier / Husky / Commitlint       | -         |
| Mock     | mockjs + vite-plugin-mock                    | -         |

## 项目结构

```
src/
├── api/                    # 接口请求
├── assets/                 # 静态资源（图片、SVG 图标）
├── components/             # 通用组件
│   ├── customDrawer/       #   抽屉封装
│   ├── customModal/        #   弹窗封装
│   ├── customTable/        #   表格封装
│   ├── customTree/         #   树组件封装
│   ├── formElements/       #   表单组件集（数据驱动渲染）
│   ├── searchForm/         #   搜索表单封装
│   ├── authButton.jsx      #   按钮权限
│   └── helmet.jsx          #   页面标题
├── config/                 # 全局配置
├── hooks/                  # 自定义 Hooks
│   ├── useApiRequest.js    #   请求封装
│   ├── useGetAllConfig.js  #   全局配置获取
│   ├── useMenuLogic.jsx    #   菜单交互逻辑
│   ├── useRouteMap.jsx     #   路由数据索引（O(1) 查找）
│   ├── useSetSysTheme.jsx  #   主题设置
│   └── useClearSysConfig.js#   配置清理
├── layouts/                # 布局
│   ├── adminLayout/        #   后台布局（菜单、面包屑、头部、底部）
│   ├── authLayout/         #   登录布局
│   ├── customWatermark/    #   水印
│   └── themeProvider/      #   主题配置面板
├── pages/                  # 页面
├── router/                 # 路由（动态加载、权限拦截）
├── store/                  # Redux Store
├── styles/                 # 全局样式
└── utils/                  # 工具函数
```

## 功能列表

- 前端工程化
  - ✅ Router 动态加载、权限拦截
  - ✅ @reduxjs/toolkit 封装
  - ✅ Ant Design 动态主题
  - ✅ Tailwind CSS 动态主题
  - ✅ Ant Design / Tailwind CSS 双主题同步
  - ✅ Modal / Drawer / Table / Form / SearchForm 封装
  - ✅ 表单数据驱动渲染
  - ✅ 按钮权限封装
  - ✅ 主题 / 皮肤更换
  - ✅ 动态面包屑
  - ✅ 水印
  - ✅ 菜单手风琴模式
  - ✅ 横向 / 纵向布局切换
  - ❌ 富文本、取色器等集成表单
- 接口请求
  - ✅ Ahooks useRequest 与 Axios 封装
  - ✅ Axios 拦截器、节流、防抖、依赖刷新、错误重试
  - ✅ Mock 封装
- 基础功能
  - ✅ 登录页
  - ✅ 用户管理
  - ✅ 角色管理
  - ✅ 菜单管理
  - ✅ 字典管理
  - ✅ 部门管理
  - ✅ 日志管理

## 快速开始

```bash
# 安装依赖
pnpm install

# 开发环境
pnpm start

# 生产构建
pnpm build

# 其他环境构建
pnpm build:dev
pnpm build:testing
pnpm build:staging
```

## Node 版本

Node.js >= 20.0.0
