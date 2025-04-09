import { Suspense, lazy } from 'react';
import { Spin } from 'antd';
import AuthRouter from '@router/authRouter';
const lazyLoad = (cmpPath, fallback = <Spin />) => {
  const LazyComponent = lazy(() => import(/* @vite-ignore */ '../' + cmpPath));
  return async () => ({
    Component: (props) => (
      <Suspense fallback={fallback}>
        <AuthRouter>
          <LazyComponent {...props} />
        </AuthRouter>
      </Suspense>
    ),
  });
};
export default lazyLoad;
