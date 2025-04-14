import { App } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearAllLocalStorage } from '@utils';
import { setUserInfo, initialState } from '@store/slices/userInfo';
const useClearSysConfig = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { notification } = App.useApp();
  const clearSysConfig = ({ text = '退出登录成功', type = 'success', path = '/login' } = {}) => {
    path && navigate(path);
    // theme && dispatch(setNavigationMode(navigationModeIni));
    localStorage && clearAllLocalStorage();
    dispatch(setUserInfo({ ...initialState, fullScreenLoading: false }));
    text &&
      notification[type]({
        message: '友情提示',
        description: text,
      });
  };
  return clearSysConfig;
};

export default useClearSysConfig;
