import { useMemo, useEffect } from 'react';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  useNavigation,
  Outlet,
} from 'react-router-dom';
import { useSelector } from 'react-redux';

import Layouts from '@layouts/adminLayout';
import lazyLoad from '@router/lazyLoad';
import AuthRouter from '@router/authRouter';
import AuthLayouts from '@layouts/authLayout';
import LoginForm from '@pages/auth/loginForm';
import NProgress from '@utils/progress';

// ==========================
// Root Layout（控制全局 loading）
const RootLayout = () => {
  const navigation = useNavigation();

  useEffect(() => {
    if (navigation.state === 'loading') {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [navigation.state]);

  return <Outlet />;
};

// ==========================
// 路由工厂（🔥关键：替代 structuredClone）
const createRoutes = (dynamicRoutes) => [
  {
    path: '/',
    element: <RootLayout />,
    HydrateFallback: () => null,
    children: [
      {
        path: 'auth',
        element: <AuthLayouts />,
        children: [
          {
            path: 'login',
            element: <LoginForm />,
          },
        ],
      },

      {
        path: '/',
        element: (
          <AuthRouter>
            <Layouts />
          </AuthRouter>
        ),
        children: [
          ...dynamicRoutes,
        ],
      },

      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
];

// ==========================
const RouteList = () => {
  const { routesData } = useSelector((state) => state.userInfo);

  // 动态路由
  const dynamicRoutes = useMemo(() => {
    return (
      routesData
        ?.filter((item) => item.cmpPath && item.path && item.isRouter === '1')
        ?.map((item) => ({
          id: item.path,
          path: item.path,
          handle: { title: item.name },
          lazy: lazyLoad(item.cmpPath),
        })) || []
    );
  }, [routesData]);

  // 创建 router
  const router = useMemo(() => {
    return createBrowserRouter(createRoutes(dynamicRoutes), {
      basename: import.meta.env.VITE_BASE_URL,
      HydrateFallback: () => null,
    });
  }, [dynamicRoutes]);

  return <RouterProvider router={router} />;
};

export default RouteList;
