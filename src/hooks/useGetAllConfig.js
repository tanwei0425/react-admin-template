import { useDispatch } from 'react-redux';
import { useSystemConfigApi } from '@api/common';
import { setUserInfo } from '@store/slices/userInfo';

/**
 * 获取全局用户配置
 * 请求系统配置接口，将用户信息、权限按钮、路由数据、字典数据写入 Redux
 *
 * @returns {{ systemConfig: () => Promise<void> }}
 */
const Index = () => {
  const dispatch = useDispatch();
  const { runAsync } = useSystemConfigApi();

  const systemConfig = async () => {
    dispatch(setUserInfo({ fullScreenLoading: true }));

    const res = await runAsync();

    if (res.code === 200) {
      const { user = {}, authButton = [], routesData = [], dictData = {} } = res?.data || {};
      dispatch(setUserInfo({ user, authButton, routesData, dictData, fullScreenLoading: false }));
    }
  };

  return { systemConfig };
};

export default Index;
