import { useState, createElement, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import { useSelector } from 'react-redux';
import lodash from 'lodash';
import * as Icon from '@ant-design/icons';
import { arrayToTree } from '@utils';
import { useStyle } from './useStyle';

const Menus = () => {
  const navigate = useNavigate();
  const { styles, cx } = useStyle();
  const { pathname } = useLocation();
  const { collapsed } = useSelector((state) => state.common);
  const { routesData } = useSelector((state) => state.userInfo);
  const { themeLayout, overallStyle, menuAccordionMode } = useSelector((state) => state.theme);
  const [menusTree, setMenuTree] = useState([]);
  const [openKeys, setOpenKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const layoutStatus = themeLayout === 'vertical';
  // 渲染图标
  const renderIcon = (title) => Icon[title] && createElement(Icon[title]);

  // 递归查找所有父级路径
  const findAllParentKeys = (currentPath) => {
    let keys = [];
    const findParents = (path) => {
      const item = routesData.find((i) => i.path === path);
      if (item?.pid) {
        const parent = routesData.find((i) => i.id === item.pid);
        if (parent) {
          keys.push(parent.path);
          findParents(parent.path);
        }
      }
    };
    findParents(currentPath);
    return keys.reverse();
  };

  // 处理菜单展开逻辑
  const onOpenChange = (keys) => {
    // 左侧菜单和手风琴模式保持父级只展开一个
    if (menuAccordionMode && layoutStatus) {
      const latestOpenKey = keys.find((key) => !openKeys.includes(key));
      const allParents = latestOpenKey ? findAllParentKeys(latestOpenKey) : [];
      const validKeys = [...allParents, latestOpenKey].filter(Boolean);

      // 保留每个层级的最后一个key
      const levelMap = new Map();
      validKeys.forEach((key) => {
        const level = findAllParentKeys(key).length;
        levelMap.set(level, key);
      });
      setOpenKeys(Array.from(levelMap.values()));
    } else {
      setOpenKeys(keys);
    }
  };

  // 生成菜单项
  const renderMenuItems = (menus = []) => {
    return menus.map((menu) => {
      const validChildren = lodash.filter(menu?.children, { isShow: '1' });
      let data = {
        key: menu.path,
        label: <span>{menu.name}</span>,
        icon: menu.icon && renderIcon(menu.icon),
        children: validChildren.length > 0 ? renderMenuItems(validChildren) : null,
      };
      // 横向菜单并且第一层级增加向下偏移
      themeLayout === 'transverse' && (data.popupOffset = [0, 8]);
      return data;
    });
  };

  // 初始化菜单树
  useEffect(() => {
    const routesDataTree = arrayToTree(routesData);
    const validMenuTree = routesDataTree?.filter((val) => val.isShow === '1');
    setMenuTree(validMenuTree);
  }, [routesData]);

  // 处理路径和折叠状态变化
  useEffect(() => {
    const currentRoute = routesData.find((item) => item.path === pathname);
    // 更新选中状态
    setSelectedKeys(currentRoute?.isShow === '1' ? [pathname] : []);

    if (layoutStatus) {
      // 计算需要展开的keys
      const parentKeys = findAllParentKeys(pathname);
      let newOpenKeys = [];

      if (menuAccordionMode) {
        newOpenKeys = parentKeys.reduce((item, key) => {
          const level = findAllParentKeys(key).length;
          if (!item.some((k) => findAllParentKeys(k).length === level)) {
            item.push(key);
          }
          return item;
        }, []);
      } else {
        newOpenKeys = [...new Set([...openKeys, ...parentKeys])];
      }

      if (!collapsed) {
        setOpenKeys((prev) => (menuAccordionMode ? newOpenKeys : [...new Set([...prev, ...newOpenKeys])]));
      }
    }
  }, [pathname, collapsed, menuAccordionMode, routesData, layoutStatus]);

  // 处理菜单点击
  const onClick = ({ key }) => {
    if (key) {
      navigate(key);
      // 左侧菜单和手风琴模式保持父级只展开一个
      if (menuAccordionMode && layoutStatus) {
        const parentKeys = findAllParentKeys(key);
        setOpenKeys((prev) => [...new Set([...prev, ...parentKeys])]);
      }
    }
  };
  return (
    <Menu
      className={cx(
        layoutStatus
          ? [styles.menu, overallStyle === 'dark' ? 'scrollbar-dark-theme' : 'scrollbar-light-theme']
          : styles.transverseMenu
      )}
      mode={layoutStatus ? 'inline' : 'horizontal'}
      theme={overallStyle}
      forceSubMenuRender
      selectedKeys={selectedKeys}
      onOpenChange={onOpenChange}
      onClick={onClick}
      {...(collapsed ? {} : { openKeys })}
      items={renderMenuItems(menusTree)}
    />
  );
};

export default Menus;
