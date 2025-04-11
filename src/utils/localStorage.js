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
 * 删除localStorage
 * @param {*} key
 */
export const removeLocalStorage = (key) => {
  if (Array.isArray(key)) {
    key.forEach((key) => localStorage.removeItem(key));
  } else {
    localStorage.removeItem(key);
  }
};

/**
 * 清空localStorage
 */
export const clearAllLocalStorage = () => {
  localStorage.clear();
};
