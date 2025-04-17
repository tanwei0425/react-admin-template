import { useDispatch } from 'react-redux';
import { useSystemConfigApi } from '@api/common';
import { setUserInfo } from '@store/slices/userInfo';
/**
 * 获取全局用户信息
 * @returns
 */
const Index = () => {
  const dispatch = useDispatch();
  const { runAsync } = useSystemConfigApi();
  const systemConfig = async () => {
    dispatch(setUserInfo({ fullScreenLoading: true }));
    const res = await runAsync();
    if (res.code === 200) {
      const { user = {}, routesData = [], dictData = {} } = res?.data || {};
      dispatch(setUserInfo({ user, routesData, dictData, fullScreenLoading: false }));
    }
  };
  return { systemConfig };
};
export default Index;
