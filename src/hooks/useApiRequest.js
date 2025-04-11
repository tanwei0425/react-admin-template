import { useRequest } from 'ahooks';
import requestInstance from '@utils/requestInstance';

/**
 * 封装一个基于 axios 的 useRequest Hook
 * @param {object} config - axios 请求配置对象，如 { url, method, data, params }
 * @param {object} options - ahooks useRequest 的其他配置项
 */
const useApiRequest = (config = {}, options = {}) => {
  const { defaultParams, ...restConfig } = config;
  return useRequest(
    // 请求函数：接收动态传入的配置（可用于重写部分参数）
    (params = {}) => {
      const requestMethod = restConfig?.method?.toUpperCase() || 'GET';
      return requestInstance.request({
        ...restConfig,
        ...(requestMethod === 'GET' ? { params } : { data: params }),
      });
    },
    {
      defaultParams: [defaultParams], // 首次默认执行时，传递给 service 的参数
      manual: true, // 是否手动触发请求，默认手动
      throttleWait: 1000,
      ...options,
    }
  );
};

export default useApiRequest;
