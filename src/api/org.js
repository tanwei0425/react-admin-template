import useApiRequest from '@hooks/useApiRequest';

export const useOrgListApi = () => {
  return useApiRequest({ url: '/mock/org/list' });
};

export const useOrgCreateApi = () => {
  return useApiRequest({ url: '/mock/org/create', method: 'POST' });
};

export const useOrgUpdateApi = () => {
  return useApiRequest({ url: '/mock/org/update', method: 'POST' });
};

export const useOrgDeleteApi = () => {
  return useApiRequest({ url: '/mock/org/delete', method: 'POST' });
};
