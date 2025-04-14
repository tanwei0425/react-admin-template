import { createSlice } from '@reduxjs/toolkit';
// import { globalConfi, theme } from '@config';
import { theme } from '@config';
// import { getLocalStorageItem, setLocalStorageItem } from '@utils';
// 先从localStorage里获取主题配置
// const getTheme = getLocalStorageItem(globalConfig.SESSION_LOGIN_THEME);
// const sessionTheme = getTheme && JSON.parse(getTheme);

// 如果localStorage里没有主题配置，则使用globalConfig里的初始化配置
// const initTheme = sessionTheme && globalConfig.initTheme;

//该store分库的初始值
const initialState = {
  // 菜单显示隐藏
  collapsed: false,
  // 面包屑
  breadcrumb: true,
  // 独立面包屑
  aloneBreadcrumb: true,
  // 固定header
  fixedHeader: false,
  // 动态标题
  dynamicTitle: true,
  // 触发器固定顶部
  menuTrigger: true,
  // 主题
  overallStyle: 'dark',
  // 主题色
  colorPrimary: theme.token?.colorPrimary || '',
  // 系统风格
  systemStyle: true,
};

export const themeSlice = createSlice({
  // store分库名称
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      // 遍历 payload，动态更新字段
      Object.entries(action.payload)?.forEach(([key, value]) => {
        state[key] = value;
      });
      // 更新localStorage的主题配置（用于长久保存主题配置）
      // setLocalStorageItem(globalConfig.SESSION_LOGIN_THEME, JSON.stringify(state));
    },
  },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
