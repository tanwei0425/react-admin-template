import useApiRequest from '@hooks/useApiRequest';

/**
 * 列表
 * @param {*} data
 * @returns
 */
export const useTableListApi = (data) => {
  return useApiRequest(
    {
      url: '/mock/tableList',
      data,
    },
    { manual: false }
  );
};
