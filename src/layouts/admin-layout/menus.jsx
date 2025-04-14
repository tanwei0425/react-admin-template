import { useState, createElement, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import { useSelector } from 'react-redux';
import lodash from 'lodash';
import * as Icon from '@ant-design/icons';
import { arrayToTree } from '@utils';
import { useStyle } from './useStyle';
const Menus = ({ collapsed }) => {
  const navigate = useNavigate();
  const { styles, cx } = useStyle();
  const { pathname } = useLocation();
  const { routesData } = useSelector((state) => state.userInfo);
  const { overallStyle, menuTrigger } = useSelector((state) => state.theme);
  const [menusTree, setMenuTree] = useState([]);
  const [openKeys, setOpenKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [rootSubmenuKeys, setRootSubmenuKeys] = useState([]);
  const defaultProps = collapsed ? {} : { openKeys };
  // 渲染图标
  const renderIcon = (title) => Icon[title] && createElement(Icon[title]);

  // 只展开当前父级菜单
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  const render = (menus = []) => {
    return menus.map((menu) => {
      const targetMenu = lodash.filter(menu?.children, { isShow: '1' });
      let data = {
        key: menu.path,
        label: <span>{menu.name}</span>,
        icon: menu.icon && renderIcon(menu.icon),
      };
      if (menu?.children && targetMenu.length > 0) {
        data.children = render(menu?.children);
      }
      return data;
    });
  };

  useEffect(() => {
    const routesDataTree = arrayToTree(routesData);
    const menuTree = routesDataTree?.filter((val) => val.isShow === '1');
    setMenuTree(menuTree);
  }, []);

  const filterFatherSelectedKeys = (path, arr = []) => {
    const targetRoutes = routesData.find((item) => item.path === path);
    if (targetRoutes?.isShow === '0') {
      routesData.forEach((val) => {
        if (val.id === targetRoutes.pid && val?.path) {
          val.isShow === '1' ? arr.push(val.path) : filterFatherSelectedKeys(val.path, arr);
        }
      });
    } else {
      arr.push(path);
    }
    return arr;
  };

  const filterFatherOpenKeys = (targetData, dataSource, targetOpenKeys = []) => {
    if (targetData?.pid && targetData?.path && targetData.pid !== 0) {
      const newData = dataSource.find((val) => val.id === targetData.pid);
      // 只有在栏目下(isRouter === 0)，添加
      // rootSubmenuKeys.includes(newData?.path) && targetOpenKeys.push(newData.path);
      targetOpenKeys.push(newData.path);
      return filterFatherOpenKeys(newData, dataSource, targetOpenKeys);
    } else {
      return targetOpenKeys;
    }
  };

  useEffect(() => {
    // 非菜单路由选中父菜单
    const selectedKeys = filterFatherSelectedKeys(pathname);
    setSelectedKeys(selectedKeys);
  }, [collapsed, openKeys, routesData]);

  useEffect(() => {
    // 可折叠项菜单
    const target = menusTree.filter((val) => val.children).map((val) => val.path);
    setRootSubmenuKeys(target);
  }, [routesData]);

  useEffect(() => {
    // pathname查找当前数据
    const nowRoutesPath = routesData.find((val) => val.path === pathname);
    // 根据数据递归找到所有父级
    const openKeys = filterFatherOpenKeys(nowRoutesPath, routesData);
    // 展开菜单
    setOpenKeys(openKeys);
  }, [collapsed, pathname]);

  const onClick = ({ key }) => key && navigate(key);
  return (
    <Menu
      className={cx(
        styles.menu,
        overallStyle === 'dark' ? 'scrollbar-dark-theme' : 'scrollbar-light-theme',
        menuTrigger && styles.menuTrigger
      )}
      mode="inline"
      theme={overallStyle}
      forceSubMenuRender={true}
      selectedKeys={selectedKeys}
      onOpenChange={onOpenChange}
      onClick={onClick}
      {...defaultProps}
      items={render(menusTree)}
    />
  );
};

export default Menus;
