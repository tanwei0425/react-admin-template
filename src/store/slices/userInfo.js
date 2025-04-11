import { createSlice } from '@reduxjs/toolkit';
import { getLocalStorageItem } from '@utils';
const token = getLocalStorageItem('token');
export const initialState = {
  // 全局loading动画
  fullScreenLoading: !!token,
  /** 数据字典 */
  dictData: {},
  /** 路由 */
  routesData: [],
  /** 用户信息 */
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
