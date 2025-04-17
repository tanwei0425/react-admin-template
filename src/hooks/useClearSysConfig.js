import { App } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeLocalStorage } from '@utils';
import { setUserInfo, initialState } from '@store/slices/userInfo';
/**
 * 退出登录
 * @returns
 */
const useClearSysConfig = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { notification } = App.useApp();
  const clearSysConfig = ({ text = '退出登录成功', type = 'success', path = '/login' } = {}) => {
    path && navigate(path);
    localStorage && removeLocalStorage('token');
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
