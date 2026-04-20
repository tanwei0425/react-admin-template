import { useNavigate, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import { useSelector } from 'react-redux';
import { useMenuLogic } from '@hooks/useMenuLogic.jsx';
import { useStyle } from './useStyle';

const Menus = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { styles, cx } = useStyle();

  const { collapsed } = useSelector((state) => state.common);
  const { routesData } = useSelector((state) => state.userInfo);
  const { themeLayout, overallStyle, menuAccordionMode } = useSelector((state) => state.theme);

  const isVertical = themeLayout === 'vertical';

  const { menuItems, openKeys, selectedKeys, onOpenChange, onMenuClick } = useMenuLogic(
    routesData,
    pathname,
    isVertical,
    collapsed,
    menuAccordionMode
  );

  const onClick = ({ key }) => {
    if (!key) return;
    navigate(key);
    onMenuClick(key);
  };

  return (
    <Menu
      className={cx(
        isVertical
          ? [styles.menu, overallStyle === 'dark' ? 'scrollbar-dark-theme' : 'scrollbar-light-theme']
          : styles.transverseMenu
      )}
      mode={isVertical ? 'inline' : 'horizontal'}
      theme={overallStyle}
      forceSubMenuRender
      selectedKeys={selectedKeys}
      onOpenChange={onOpenChange}
      onClick={onClick}
      {...(collapsed ? {} : { openKeys })}
      items={menuItems}
    />
  );
};

export default Menus;
