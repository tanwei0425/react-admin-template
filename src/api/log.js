import useApiRequest from '@hooks/useApiRequest';

export const useLogListApi = () => {
  return useApiRequest({ url: '/mock/log/list' });
};

export const useLogDeleteApi = () => {
  return useApiRequest({ url: '/mock/log/delete', method: 'POST' });
};

export const useLogClearApi = () => {
  return useApiRequest({ url: '/mock/log/clear', method: 'POST' });
};

export const useLogBatchDeleteApi = () => {
  return useApiRequest({ url: '/mock/log/batchDelete', method: 'POST' });
};
