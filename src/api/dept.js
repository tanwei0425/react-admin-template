import useApiRequest from '@hooks/useApiRequest';

export const useDeptListApi = () => {
  return useApiRequest({ url: '/mock/dept/list' });
};

export const useDeptCreateApi = () => {
  return useApiRequest({ url: '/mock/dept/create', method: 'POST' });
};

export const useDeptUpdateApi = () => {
  return useApiRequest({ url: '/mock/dept/update', method: 'POST' });
};

export const useDeptDeleteApi = () => {
  return useApiRequest({ url: '/mock/dept/delete', method: 'POST' });
};
