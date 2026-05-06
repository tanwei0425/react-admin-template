// 自动扫描 pages 目录
const modules = import.meta.glob('../pages/**/index.{jsx,tsx}');

const lazyCache = new Map();
const lazyLoad = (cmpPath) => {
  if (lazyCache.has(cmpPath)) {
    return lazyCache.get(cmpPath);
  }

  const routeModule = async () => {
    const loader =
      modules[`../${cmpPath}/index.jsx`] ||
      modules[`../${cmpPath}/index.tsx`];

    if (!loader) {
      console.error('当前所有页面：', Object.keys(modules));
      throw new Error(`页面不存在: ${cmpPath}`);
    }

    const mod = await loader();

    return {
      Component: mod.default,
    };
  };

  lazyCache.set(cmpPath, routeModule);
  return routeModule;
};

export default lazyLoad;