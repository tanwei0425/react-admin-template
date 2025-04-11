import { Breadcrumb } from 'antd';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { findParent } from '@utils';
import _ from 'lodash';
import { useStyle } from './useStyle';

const TBreadcrumb = () => {
  const { styles } = useStyle();
  const location = useLocation();
  const { routesData } = useSelector((state) => state.userInfo);
  const { breadcrumb } = useSelector((state) => state.theme);
  const cloneRoutesData = _.cloneDeep(routesData);
  const entriesRoutesData = Object.fromEntries(cloneRoutesData.map((item) => [item.path, item]));
  const targetRoutesData = findParent(entriesRoutesData[location.pathname], cloneRoutesData);
  return (
    breadcrumb && (
      <div className={styles.breadcrumb}>
        <Breadcrumb items={targetRoutesData.map((val) => ({ title: val.name }))} />
      </div>
    )
  );
};

export default TBreadcrumb;
