import { useState, createElement, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import * as Icon from '@ant-design/icons';
import { arrayToTree } from '@utils';

const Menus = ({ collapsed }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { menusList } = useSelector((state) => state.userInfo);
  const { theme } = useSelector((state) => state.theme);
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
      const targetMenu = _.filter(menu?.children, { isShow: '1' });
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
    const newMenuTree = arrayToTree(menusList);
    const showMenuTree = newMenuTree?.filter((val) => val.isShow === '1');
    setMenuTree(showMenuTree);
  }, []);

  const filterFatherSelectedKeys = (path, arr = []) => {
    const nowRoter = menusList.find((item) => item.path === path);
    if (nowRoter?.isShow === '0') {
      menusList.forEach((val) => {
        if (val.id === nowRoter.pid && val?.path) {
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
  }, [collapsed, openKeys, menusList]);

  useEffect(() => {
    // 可折叠项菜单
    const target = menusTree.filter((val) => val.children).map((val) => val.path);
    setRootSubmenuKeys(target);
  }, [menusList]);

  useEffect(() => {
    // pathname查找当前数据
    const nowData = menusList.find((val) => val.path === pathname);
    // 根据数据递归找到所有父级
    const openKeys = filterFatherOpenKeys(nowData, menusList);
    // 展开菜单
    setOpenKeys(openKeys);
  }, [collapsed, pathname]);

  const onClick = ({ key }) => key && navigate(key);
  return (
    <Menu
      mode="inline"
      theme={theme}
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
