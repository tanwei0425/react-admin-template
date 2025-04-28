import { useDispatch, useSelector } from 'react-redux';
import { MenuUnfoldOutlined, MenuFoldOutlined, GithubOutlined } from '@ant-design/icons';
import { setCommon } from '@store/slices/common';
import { useStyle } from './useStyle';
import { globalConfig } from '@config';
import Setting from '@layouts/adminLayout/setting';
import Theme from '@layouts/themeProvider/setting';
import Helmet from '@components/helmet';
import userAvatar from '@assets/images/userAvatar.svg';
import Breadcrumb from '@layouts/adminLayout/breadcrumb';
import Menus from '@layouts/adminLayout/menus';
const Headers = () => {
  const dispatch = useDispatch();
  const { collapsed } = useSelector((state) => state.common);
  const { themeLayout, systemStyle, menuTrigger, aloneBreadcrumb } = useSelector((state) => state.theme);
  const { styles } = useStyle();
  const onCollapse = () => {
    dispatch(setCommon({ collapsed: !collapsed }));
  };
  const jumpGitHub = () => {
    window.open('https://github.com/tanwei0425/react-admin-template');
  };
  return (
    <>
      <Helmet />
      <div className={styles.headerContainer}>
        {themeLayout === 'vertical' ? (
          <div className={styles.headerInfo}>
            {menuTrigger && (
              <span className={styles.headerTriggerIcon} onClick={onCollapse}>
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              </span>
            )}
            {!aloneBreadcrumb && <Breadcrumb />}
          </div>
        ) : (
          <div className={styles.transverseHeader}>
            <Menus />
          </div>
        )}
        <div className={styles.headerInfo}>
          <img src={userAvatar} className={styles.headerInfoUser} alt="头像错误" />
          <div className={styles.username}>{globalConfig.username}</div>
          <div className={styles.github} onClick={jumpGitHub}>
            <GithubOutlined />
          </div>
          <Setting />
          {systemStyle && <Theme />}
        </div>
      </div>
    </>
  );
};
export default Headers;
