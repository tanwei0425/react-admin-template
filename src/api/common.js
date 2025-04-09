import useApiRequest from '@hooks/useApiRequest';

/**
 * 获取用户信息
 * @param {*} data
 * @returns
 */
export const useSystemConfigApi = () => {
  return useApiRequest({
    url: '/mock/auth/userInfo',
  });
};
