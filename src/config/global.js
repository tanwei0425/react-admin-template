import { theme } from '@config/antd';
// 系统配置
export const globalConfig = {
  title: 'React Admin Template',
  menuTitle: 'React Admin',
  menuIcon: '@assets/images/menu-logo.svg',
  username: 'demo',
};
// 默认主题配置
export const initTheme = {
  // 是否显示系统风格
  systemStyle: true,
  // 布局
  themeLayout: 'longitudinal',
  // 主题
  overallStyle: 'dark',
  // 主题色
  colorPrimary: theme.token?.colorPrimary,
  // 触发器固定顶部
  menuTrigger: true,
  // 面包屑
  breadcrumb: true,
  // 独立面包屑
  aloneBreadcrumb: true,
  // 动态标题
  dynamicTitle: true,
  // 固定header
  fixedHeader: true,
};
