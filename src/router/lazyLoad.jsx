import { Suspense, lazy } from 'react';
import { Spin } from 'antd';

const lazyCache = new Map();

const lazyLoad = (cmpPath, fallback = <Spin />) => {
  if (lazyCache.has(cmpPath)) {
    return lazyCache.get(cmpPath);
  }

  const LazyComponent = lazy(() => import(/* @vite-ignore */ '../' + cmpPath));

  const routeModule = async () => {
    const Component = (props) => (
      <Suspense fallback={fallback}>
        <LazyComponent {...props} />
      </Suspense>
    );
    return { Component };
  };

  lazyCache.set(cmpPath, routeModule);
  return routeModule;
};

export default lazyLoad;
