import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Layout } from 'antd';
import Headers from '@layouts/admin-layout/headers';
import Breadcrumb from '@layouts/admin-layout/breadcrumb';
import Menus from '@layouts/admin-layout/menus';
import { useStyle } from './useStyle';
import { website } from '@config';
import { MenuSvg } from '@assets/icons';

const { Content, Header, Sider } = Layout;
const Layouts = () => {
  const { styles } = useStyle();
  const { collapsed, theme } = useSelector((state) => state.theme);
  return (
    <Layout className={styles.layouts}>
      <Sider
        trigger={null}
        collapsible
        theme={theme}
        className={styles.sider}
        collapsed={collapsed}
        collapsedWidth={70}
        width={235}
      >
        <div className={styles.siderHeader}>
          <MenuSvg className={styles.siderLogo} />
          {!collapsed && <div className={styles.siderTitle}>{website.menuTitle}</div>}
        </div>
        <Menus collapsed={collapsed} />
      </Sider>
      <Layout>
        <Header className={styles.header}>
          <Headers />
        </Header>
        <Content className="tw:p-3.5">
          <Breadcrumb />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Layouts;
