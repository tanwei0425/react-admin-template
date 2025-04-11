import { createSlice } from '@reduxjs/toolkit';
import { getLocalStorageItem } from '@utils';
const token = getLocalStorageItem('token');
const initialState = {
  fullScreenLoading: !!token,
  /** 数据字典 */
  dictData: {},
  /** 菜单列表 */
  menusList: [],
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
