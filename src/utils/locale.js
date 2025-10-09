import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/en';
import zhCN from 'antd/locale/zh_CN';
import enUS from 'antd/locale/en_US';

/**
 * 根据浏览器语言返回 antd locale，同时设置 dayjs 语言
 * @returns {object} antd locale 对象
 */
export const getAppLocale = () => {
  const lang = navigator.language?.toLowerCase() || 'zh';
  if (lang.startsWith('zh')) {
    dayjs.locale('zh-cn');
    return zhCN;
  }
  dayjs.locale('en');
  return enUS;
};
