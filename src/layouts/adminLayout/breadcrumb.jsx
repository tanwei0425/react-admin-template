import { Breadcrumb } from 'antd';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import lodash from 'lodash';
import { findParent, renderIcon } from '@utils';
import { useStyle } from './useStyle';
// 渲染图标

const TBreadcrumb = () => {
  const { styles } = useStyle();
  const location = useLocation();
  const { routesData } = useSelector((state) => state.userInfo);
  const { breadcrumb, breadcrumbIcon } = useSelector((state) => state.theme);
  const cloneRoutesData = lodash.cloneDeep(routesData);
  const entriesRoutesData = Object.fromEntries(cloneRoutesData.map((item) => [item.path, item]));
  const targetRoutesData = findParent(entriesRoutesData[location.pathname], cloneRoutesData);
  return (
    breadcrumb && (
      <div className={styles.breadcrumb}>
        <Breadcrumb
          items={targetRoutesData.map((item) => {
            return {
              title: (
                <>
                  {breadcrumbIcon && (
                    <span className="tw:pr-[5px]">{item.icon && renderIcon(item.icon)}</span>
                  )}
                  <span>{item.name}</span>
                </>
              ),
            };
          })}
        />
      </div>
    )
  );
};

export default TBreadcrumb;
