import { createSlice } from '@reduxjs/toolkit';
import { initTheme } from '@config';
import { getLocalStorageItem, setLocalStorageItem } from '@utils';
// 先从localStorage里获取主题配置
const customTheme = getLocalStorageItem('customTheme');
const customThemeObj = customTheme && JSON.parse(customTheme);

//该store分库的初始值
const initialState = customThemeObj || initTheme;

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
      setLocalStorageItem('customTheme', JSON.stringify(state));
    },
  },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
