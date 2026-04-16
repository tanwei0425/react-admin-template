import useApiRequest from '@hooks/useApiRequest';

export const useRoleListApi = () => {
  return useApiRequest({ url: '/mock/role/list' });
};

export const useRoleCreateApi = () => {
  return useApiRequest({ url: '/mock/role/create', method: 'POST' });
};

export const useRoleUpdateApi = () => {
  return useApiRequest({ url: '/mock/role/update', method: 'POST' });
};

export const useRoleDeleteApi = () => {
  return useApiRequest({ url: '/mock/role/delete', method: 'POST' });
};

export const useRoleAllListApi = () => {
  return useApiRequest({ url: '/mock/role/allList', manual: true });
};

export const useRoleAssignUsersApi = () => {
  return useApiRequest({ url: '/mock/role/assignUsers', method: 'POST' });
};
