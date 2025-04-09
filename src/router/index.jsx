import { useState, useEffect } from 'react';
import { Spin } from 'antd';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Layouts from '@layouts/admin-layout';
import AuthRouter from '@router/authRouter';
import lazyLoad from '@router/lazyLoad';
import { useSystemConfigApi } from '@api/common';
import { setUserInfo } from '@store/slices/userInfo';
import { getLocalStorageItem } from '@utils';
import Login from '@pages/login';
const RouteList = () => {
  const dispatch = useDispatch();
  const [loadingStatus, setLoadingStatus] = useState(
    window.location.pathname !== '/login'
  );
  const token = getLocalStorageItem('token');
  const [dynamicRoutes, setDynamicRoutes] = useState([]);
  const { runAsync } = useSystemConfigApi();
  const getSystemConfig = async () => {
    setLoadingStatus(true);
    const res = await runAsync();
    if (res.code === 200) {
      const { user = {}, menusList = [], dictData = {} } = res?.data || {};
      dispatch(setUserInfo({ user, menusList, dictData }));
      const data = menusList
        ?.filter((item) => item.cmpPath && item.path && item.isRouter === '1')
        ?.map((item) => ({
          path: item.path,
          lazy: lazyLoad(item.cmpPath),
        }));
      setDynamicRoutes(data);
      setLoadingStatus(false);
    }
  };
  useEffect(() => {
    if (token) {
      getSystemConfig();
    } else {
      setLoadingStatus(false);
    }
  }, [token]);

  const router = createBrowserRouter(
    [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/',
        HydrateFallback: () => null,
        element: (
          <AuthRouter>
            <Layouts />
          </AuthRouter>
        ),
        children: [
          // 动态加载的路由
          ...dynamicRoutes,
        ],
      },
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
    {
      basename: import.meta.env.VITE_BASE_URL,
    }
  );
  return loadingStatus ? (
    <Spin spinning={true} size={'large'} tip={'系统加载中，请稍等！'}>
      <div style={{ width: '100vw', height: '100vh' }}></div>
    </Spin>
  ) : (
    <RouterProvider router={router} />
  );
};
export default RouteList;
