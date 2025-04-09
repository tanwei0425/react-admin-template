import { useDispatch, useSelector } from 'react-redux';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { setTheme } from '@store/slices/theme';
import Setting from '@layouts/admin-layout/setting';
import { useStyle } from './useStyle';
import { website } from '@config';
import { ThemeSvg } from '@assets/icons';
import userAvatar from '@assets/images/userAvatar.svg';
const Headers = () => {
  const { styles } = useStyle();
  const dispatch = useDispatch();
  const { collapsed } = useSelector((state) => state.theme);
  const onCollapse = () => {
    dispatch(setTheme({ collapsed: !collapsed }));
  };

  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerTriggerIcon} onClick={onCollapse}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </div>
      <div className={styles.headerInfo}>
        <img
          src={userAvatar}
          className={styles.headerInfoUser}
          alt="头像错误"
        />
        <div className={styles.username}>{website.username}</div>
        <Setting />
        <ThemeSvg className={styles.themeSvg} />
      </div>
    </div>
  );
};
export default Headers;
