import useApiRequest from '@hooks/useApiRequest';

export const useMenuListApi = () => {
  return useApiRequest({ url: '/mock/menu/list' });
};

export const useMenuCreateApi = () => {
  return useApiRequest({ url: '/mock/menu/create', method: 'POST' });
};

export const useMenuUpdateApi = () => {
  return useApiRequest({ url: '/mock/menu/update', method: 'POST' });
};

export const useMenuDeleteApi = () => {
  return useApiRequest({ url: '/mock/menu/delete', method: 'POST' });
};
