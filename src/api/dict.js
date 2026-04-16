import useApiRequest from '@hooks/useApiRequest';

export const useDictTypeListApi = () => {
  return useApiRequest({ url: '/mock/dict/type/list' });
};

export const useDictTypeCreateApi = () => {
  return useApiRequest({ url: '/mock/dict/type/create', method: 'POST' });
};

export const useDictTypeUpdateApi = () => {
  return useApiRequest({ url: '/mock/dict/type/update', method: 'POST' });
};

export const useDictTypeDeleteApi = () => {
  return useApiRequest({ url: '/mock/dict/type/delete', method: 'POST' });
};

export const useDictDataListApi = () => {
  return useApiRequest({ url: '/mock/dict/data/list' });
};

export const useDictDataCreateApi = () => {
  return useApiRequest({ url: '/mock/dict/data/create', method: 'POST' });
};

export const useDictDataUpdateApi = () => {
  return useApiRequest({ url: '/mock/dict/data/update', method: 'POST' });
};

export const useDictDataDeleteApi = () => {
  return useApiRequest({ url: '/mock/dict/data/delete', method: 'POST' });
};
