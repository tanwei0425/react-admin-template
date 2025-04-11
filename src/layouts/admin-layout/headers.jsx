import { useDispatch, useSelector } from 'react-redux';
import { MenuUnfoldOutlined, MenuFoldOutlined, GithubOutlined } from '@ant-design/icons';
import { setTheme } from '@store/slices/theme';
import Setting from '@layouts/admin-layout/setting';
import Theme from '@layouts/admin-layout/theme';
import Helmet from '@components/helmet';
import { useStyle } from './useStyle';
import { website } from '@config';
import userAvatar from '@assets/images/userAvatar.svg';

const Headers = () => {
  const dispatch = useDispatch();
  const { collapsed } = useSelector((state) => state.theme);
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
        <div className={styles.headerTriggerIcon} onClick={onCollapse}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </div>
        <div className={styles.headerInfo}>
          <img src={userAvatar} className={styles.headerInfoUser} alt="头像错误" />
          <div className={styles.username}>{website.username}</div>
          <div className={styles.github} onClick={jumpGitHub}>
            <GithubOutlined />
          </div>
          <Setting />
          <Theme />
        </div>
      </div>
    </>
  );
};
export default Headers;
