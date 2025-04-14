import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Layout } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import Headers from '@layouts/admin-layout/headers';
import Breadcrumb from '@layouts/admin-layout/breadcrumb';
import Menus from '@layouts/admin-layout/menus';
import { setTheme } from '@store/slices/theme';
import { useStyle } from './useStyle';
import { globalConfig } from '@config';
import { MenuSvg } from '@assets/icons';

const { Content, Header, Sider } = Layout;
const Layouts = () => {
  const dispatch = useDispatch();
  const { styles, cx } = useStyle();
  const { collapsed, overallStyle, menuTrigger, fixedHeader, breadcrumb, aloneBreadcrumb } = useSelector(
    (state) => state.theme
  );
  const onCollapse = () => {
    dispatch(setTheme({ collapsed: !collapsed }));
  };
  console.log(fixedHeader, 'fixedHeader');

  return (
    <Layout className={styles.layouts}>
      <Sider
        trigger={null}
        collapsible
        theme={overallStyle}
        className={styles.sider}
        collapsed={collapsed}
        collapsedWidth={70}
        width={220}
      >
        <div className={styles.siderHeader}>
          <MenuSvg className={styles.siderLogo} />
          {!collapsed && <div className={styles.siderTitle}>{globalConfig.menuTitle}</div>}
        </div>
        <Menus collapsed={collapsed} />
        {!menuTrigger && (
          <div
            className={cx(styles.siderMenuTrigger, overallStyle === 'dark' && styles.siderMenuTriggerDark)}
          >
            <span
              className={cx(
                styles.siderMenuTriggerIcon,
                overallStyle === 'dark' && styles.siderMenuTriggerIconDark
              )}
              onClick={onCollapse}
            >
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </span>
          </div>
        )}
      </Sider>
      <Layout className={cx(styles.mainContainer, fixedHeader && styles.mainContainerFixed)}>
        <Header className={styles.mainHeader}>
          <Headers />
        </Header>
        {aloneBreadcrumb && <Breadcrumb />}
        <Content
          className={cx(
            styles.mainContent,
            !(aloneBreadcrumb && breadcrumb) && styles.aloneBreadcrumb,
            fixedHeader && styles.mainOutletFixed
          )}
        >
          <div className={cx(styles.mainOutlet)}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Layouts;
