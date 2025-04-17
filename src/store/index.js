import { configureStore } from '@reduxjs/toolkit';
// 引入主题换肤store分库
import commonReducer from '@store/slices/common';
import themeReducer from '@store/slices/theme';
import userInfoReducer from '@store/slices/userInfo';

export const store = configureStore({
  reducer: {
    // 公共信息
    common: commonReducer,
    // 主题换肤
    theme: themeReducer,
    // 用户信息
    userInfo: userInfoReducer,
    // 可以根据需要在这里继续追加其他分库
  },
});
