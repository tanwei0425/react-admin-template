import { theme } from '@config/antd';
// 系统配置
export const globalConfig = {
  title: 'React Admin Template',
  menuTitle: 'React Admin',
  menuIcon: '@assets/images/menu-logo.svg',
  username: 'demo',
  // watermarkText: 'React Admin Template',
  watermarkText: ['React Admin Template', 'Happy Working'],
};
// 默认主题配置
export const initTheme = {
  // 是否显示系统风格
  systemStyle: true,
  // 布局
  themeLayout: 'vertical',
  // 主题
  overallStyle: 'dark',
  // 主题色
  colorPrimary: theme.token?.colorPrimary,
  // 面包屑
  breadcrumb: true,
  // 独立面包屑
  aloneBreadcrumb: true,
  // 面包屑图标
  breadcrumbIcon: true,
  // 触发器固定顶部
  menuTrigger: true,
  // 菜单手风琴
  menuAccordionMode: true,
  // 动态标题
  dynamicTitle: true,
  // 固定header
  fixedHeader: true,
  // 水印
  watermark: false,
  // 显示页脚
  showFooter: false,
  // 色弱模式
  weakMode: false,
  // 灰色模式
  grayMode: false,
};
