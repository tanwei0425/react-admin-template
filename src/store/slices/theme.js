import { createSlice } from '@reduxjs/toolkit';
import { globalConfig } from '@config';
import { getLocalStorageItem, setLocalStorageItem } from '@utils';
// 先从localStorage里获取主题配置
const getTheme = getLocalStorageItem(globalConfig.SESSION_LOGIN_THEME);
const sessionTheme = getTheme && JSON.parse(getTheme);

// 如果localStorage里没有主题配置，则使用globalConfig里的初始化配置
const initTheme = sessionTheme && globalConfig.initTheme;

//该store分库的初始值
const initialState = {
  collapsed: false,
  theme: 'dark',
  breadcrumb: true,
  colorPrimary: initTheme.colorPrimary,
  // 关闭系统风格功能
  displaySystemConfig: false,
};

export const themeSlice = createSlice({
  // store分库名称
  name: 'theme',
  // store分库初始值
  initialState,
  reducers: {
    // redux方法：设置亮色/暗色主题
    setTheme: (state, action) => {
      // 遍历 payload，动态更新字段
      Object.entries(action.payload)?.forEach(([key, value]) => {
        state[key] = value;
      });
      // 更新localStorage的主题配置（用于长久保存主题配置）
      setLocalStorageItem(
        globalConfig.SESSION_LOGIN_THEME,
        JSON.stringify(state)
      );
    },
  },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
