import { useMemo } from 'react';
import { Breadcrumb } from 'antd';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { renderIcon } from '@utils';
import { useRouteMap } from '@hooks/useRouteMap.jsx';
import { useStyle } from './useStyle';

const TBreadcrumb = () => {
  const { styles } = useStyle();
  const { pathname } = useLocation();
  const { routesData } = useSelector((state) => state.userInfo);
  const { breadcrumb, breadcrumbIcon } = useSelector((state) => state.theme);

  const { getParentChain } = useRouteMap(routesData);

  const breadcrumbItems = useMemo(() => {
    const chain = getParentChain(pathname);
    return chain.map((item) => ({
      title: (
        <>
          {breadcrumbIcon && <span className="tw:pr-[5px]">{item.icon && renderIcon(item.icon)}</span>}
          <span>{item.name}</span>
        </>
      ),
    }));
  }, [pathname, getParentChain, breadcrumbIcon]);

  return (
    breadcrumb && (
      <div className={styles.breadcrumb}>
        <Breadcrumb items={breadcrumbItems} />
      </div>
    )
  );
};

export default TBreadcrumb;
