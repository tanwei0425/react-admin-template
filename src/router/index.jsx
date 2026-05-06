import { useMemo, useEffect } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layouts from '@layouts/adminLayout';
import lazyLoad from '@router/lazyLoad';
import AuthRouter from '@router/authRouter';
import AuthLayouts from '@layouts/authLayout';
import LoginForm from '@pages/auth/loginForm';
import NProgress from '@utils/progress';

const staticRoutes = [
  {
    path: '/auth',
    handle: { title: '登录' },
    element: <AuthLayouts />,
    children: [
      {
        path: 'login',
        handle: { title: '登录' },
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
    children: [],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
];

const RouteList = () => {
  const { routesData } = useSelector((state) => state.userInfo);

  const dynamicRoutes = useMemo(
    () =>
      routesData
        ?.filter((item) => item.cmpPath && item.path && item.isRouter === '1')
        ?.map((item) => ({
          path: item.path,
          handle: { title: item.name },
          lazy: lazyLoad(item.cmpPath),
        })) || [],
    [routesData]
  );

  const router = useMemo(() => {
    const routes = staticRoutes.map((route) => {
      if (route.path === '/') {
        return { ...route, children: dynamicRoutes };
      }
      return route;
    });
    return createBrowserRouter(routes, {
      basename: import.meta.env.VITE_BASE_URL,
    });
  }, [dynamicRoutes]);

  useEffect(() => {
    if (!router) return;
    const unsub = router.subscribe(({ navigationType }) => {
      if (navigationType !== 'POP') {
        NProgress.start();
        requestAnimationFrame(() => {
          NProgress.done();
        });
      }
    });
    return unsub;
  }, [router]);

  return <RouterProvider router={router} />;
};

export default RouteList;
