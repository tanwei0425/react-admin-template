import { useDispatch } from 'react-redux';
import { App } from 'antd';
import { setTheme } from '@store/slices/theme';
/**
 * 主题更新
 * @returns
 */
const useSetSysTheme = () => {
  const dispatch = useDispatch();
  const { message } = App.useApp();
  const setThemeSkin = (value, config = { notice: true, title: '更新成功' }) => {
    dispatch(setTheme(value));
    config?.notice && message.success(config?.title);
  };
  return { setThemeSkin };
};

export default useSetSysTheme;
