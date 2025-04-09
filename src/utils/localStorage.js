/**
 * 获取localStorage的key
 * @param key
 */
export const getLocalStorageItem = (key) => {
  return localStorage.getItem(key) || '';
};

/**
 * 设置localStorage的值
 * @param key
 * @param value
 */
export const setLocalStorageItem = (key, value) => {
  localStorage.setItem(key, value);
};

/**
 * 清空localStorage
 */
export const clearAllLocalStorage = () => {
  localStorage.clear();
};
