import { useDispatch, useSelector } from 'react-redux';
import { MenuUnfoldOutlined, MenuFoldOutlined, GithubOutlined } from '@ant-design/icons';
import { setTheme } from '@store/slices/theme';
import Setting from '@layouts/admin-layout/setting';
import Theme from '@layouts/admin-layout/theme';
import Helmet from '@components/helmet';
import { useStyle } from './useStyle';
import { globalConfig } from '@config';
import userAvatar from '@assets/images/userAvatar.svg';
import Breadcrumb from '@layouts/admin-layout/breadcrumb';
const Headers = () => {
  const dispatch = useDispatch();
  const { collapsed, systemStyle, menuTrigger, aloneBreadcrumb } = useSelector((state) => state.theme);
  const { styles } = useStyle();
  const onCollapse = () => {
    dispatch(setTheme({ collapsed: !collapsed }));
  };
  const jumpGitHub = () => {
    window.open('https://github.com/tanwei0425/react-admin-template');
  };
  return (
    <>
      <Helmet />
      <div className={styles.headerContainer}>
        <div className={styles.headerInfo}>
          {menuTrigger && (
            <span className={styles.headerTriggerIcon} onClick={onCollapse}>
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </span>
          )}
          {!aloneBreadcrumb && <Breadcrumb />}
        </div>
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
