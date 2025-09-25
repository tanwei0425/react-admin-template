import useApiRequest from '@hooks/useApiRequest';

/**
 * 验证码
 * @param {*} data
 * @returns
 */
export const useCaptchaApi = () => {
  return useApiRequest(
    {
      url: '/mock/captcha',
    },
    { manual: false }
  );
};
/**
 * 登录
 * @param {*} data
 * @returns
 */
export const useLoginApi = () => {
  return useApiRequest({
    url: '/mock/auth/signIn',
    method: 'POST',
  });
};
/**
 * 退出登录
 * @param {*} data
 * @returns
 */
export const useLogoutApi = () => {
  return useApiRequest({
    url: '/mock/auth/signOut',
    method: 'GET',
  });
};
/**
 * 退出登录
 * @param {*} data
 * @returns
 */
export const useEditPwdApi = (data) => {
  return useApiRequest({
    url: '/mock/auth/editPwd',
    method: 'POST',
    data,
  });
};
