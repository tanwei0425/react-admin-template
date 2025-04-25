/** 自定义主题 */
const myTheme = {
  token: {
    myFontSize18: 18,
    myPadding14: 14,
  },
};
/** antd 默认的主题修改 */
const antdTheme = {
  token: {
    colorPrimary: '#1890ff',
  },
};

// 系统主题
export const theme = {
  token: {
    ...myTheme.token,
    ...antdTheme.token,
  },
};

// app包裹组件中的notification、message、modal等静态方法的全局配置
export const antAppConfig = {
  notification: {
    placement: 'topRight',
    showProgress: true,
  },
  message: {},
};

// configProvider的全局配置（App.useApp()中的请在antAppConfig配置）
export const antConfigProvider = {};
