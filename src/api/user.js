import useApiRequest from '@hooks/useApiRequest';

export const useUserListApi = () => {
  return useApiRequest({ url: '/mock/user/list' });
};

export const useUserCreateApi = () => {
  return useApiRequest({ url: '/mock/user/create', method: 'POST' });
};

export const useUserUpdateApi = () => {
  return useApiRequest({ url: '/mock/user/update', method: 'POST' });
};

export const useUserDeleteApi = () => {
  return useApiRequest({ url: '/mock/user/delete', method: 'POST' });
};

export const useUserResetPwdApi = () => {
  return useApiRequest({ url: '/mock/user/resetPwd', method: 'POST' });
};

export const useUserAllListApi = () => {
  return useApiRequest({ url: '/mock/user/allList', manual: true });
};

export const useUserAssignRolesApi = () => {
  return useApiRequest({ url: '/mock/user/assignRoles', method: 'POST' });
};
