import axios from 'axios';
import { App } from 'antd';
import NProgress from '@utils/progress';
import { getLocalStorageItem, setLocalStorageItem, clearAllLocalStorage } from '@utils';
let messageApi; // 全局存储 message API
const AxiosInterceptor = () => {
  const { message } = App.useApp(); // 获取 message 实例
  messageApi = message; // 赋值给全局变量
  return null; // 这个组件不渲染任何内容
};

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8';
const requestInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API, // 根据需要修改
  timeout: 10000, // 超时时间
});

// 可在此处添加请求/响应拦截器
requestInstance.interceptors.request.use(
  (config) => {
    // 在请求里加入token认证信息
    const token = getLocalStorageItem('token');
    token && (config.headers.authorization = token);
    NProgress.start(); // 设置加载进度条(开始..)
    return config;
  },
  (error) => Promise.reject(error)
);

requestInstance.interceptors.response.use(
  (response) => {
    NProgress.done(); // 设置加载进度条(结束..)
    const { headers, data } = response;
    const newToken = headers?.authorization;
    if (newToken) {
      newToken !== getLocalStorageItem('token') && setLocalStorageItem('token', `Bearer ${newToken}`);
    }
    const { code, message } = data || {};
    if (code !== 200) {
      messageApi.error(message || '请求失败，请重试');
      if (code === 901 || code === 902 || code === 903 || code === 904) {
        clearAllLocalStorage();
        window.location.href = '/auth/login';
      }
      return Promise.reject(message);
    } else {
      return data;
    }
  },
  (error) => {
    NProgress.done();
    // 网络错误或服务器未响应的情况
    messageApi.error('网络错误或服务端异常');
    return Promise.reject(error);
  }
);

export { requestInstance as default, AxiosInterceptor };
