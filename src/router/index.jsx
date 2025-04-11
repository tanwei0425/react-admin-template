import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layouts from '@layouts/admin-layout';
import lazyLoad from '@router/lazyLoad';
import AuthRouter from '@router/authRouter';
import Login from '@pages/login';
const RouteList = () => {
  const { menusList } = useSelector((state) => state.userInfo);
  const dynamicRoutes = menusList
    ?.filter((item) => item.cmpPath && item.path && item.isRouter === '1')
    ?.map((item) => ({
      path: item.path,
      lazy: lazyLoad(item.cmpPath),
    }));
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
  return <RouterProvider router={router} />;
};
export default RouteList;
