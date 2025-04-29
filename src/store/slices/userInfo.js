import { createSlice } from '@reduxjs/toolkit';
import { getLocalStorageItem } from '@utils';
const token = getLocalStorageItem('token');
// 里面的更改都会引起全局组件的刷新（会导致app组件重新渲染）
export const initialState = {
  // 全局loading动画
  fullScreenLoading: !!token,
  // 按钮权限
  authButton: [],
  // 数据字典
  dictData: {},
  // 路由
  routesData: [],
  // 用户信息
  user: {
    id: '',
    username: '',
    role: [],
  },
};

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      // 遍历 payload，动态更新字段
      Object.entries(action.payload)?.forEach(([key, value]) => {
        state[key] = value;
      });
    },
  },
});

export const { setUserInfo } = userInfoSlice.actions;

export default userInfoSlice.reducer;
