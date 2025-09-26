import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layouts from '@layouts/adminLayout';
import lazyLoad from '@router/lazyLoad';
import AuthRouter from '@router/authRouter';
import AuthLayouts from '@layouts/authLayout';
import LoginForm from '@pages/auth/loginForm';
const RouteList = () => {
  const { routesData } = useSelector((state) => state.userInfo);
  const dynamicRoutes = routesData
    ?.filter((item) => item.cmpPath && item.path && item.isRouter === '1')
    ?.map((item) => ({
      path: item.path,
      handle: {
        title: item.name,
      },
      lazy: lazyLoad(item.cmpPath),
    }));
  const router = createBrowserRouter(
    [
     {
        path: '/auth',
        handle: {
          title: '登录',
        },
        element: (
          <AuthLayouts />
        ),
        children: [
          {
            path: 'login',
            handle: {
              title: '登录',
            },
            element: <LoginForm />,
          },
        ],
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
  return <RouterProvider router={router} />;
};
export default RouteList;
