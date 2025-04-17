import { createSlice } from '@reduxjs/toolkit';
export const initialState = {
  // 菜单展开收缩
  collapsed: false,
};

export const commonReducer = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setCommon: (state, action) => {
      // 遍历 payload，动态更新字段
      Object.entries(action.payload)?.forEach(([key, value]) => {
        state[key] = value;
      });
    },
  },
});

export const { setCommon } = commonReducer.actions;

export default commonReducer.reducer;
