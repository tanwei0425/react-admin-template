import { App } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearAllLocalStorage } from '@utils';
import { setUserInfo } from '@store/slices/userInfo';
const useClearSysConfig = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { notification } = App.useApp();
  const clearSysConfig = ({ text = '操作成功', type = 'success', path = '/login' }) => {
    path && navigate(path);
    // theme && dispatch(setNavigationMode(navigationModeIni));
    dispatch(
      setUserInfo({
        user: {
          id: '',
          username: '',
          role: [],
        },
        menusList: [],
        dictData: {},
        fullScreenLoading: false,
      })
    );
    localStorage && clearAllLocalStorage();
    text &&
      notification[type]({
        message: '友情提示',
        description: text,
      });
  };
  return clearSysConfig;
};

export default useClearSysConfig;
