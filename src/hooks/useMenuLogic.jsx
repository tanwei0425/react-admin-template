import { useMemo, useState, useCallback, useEffect, useRef } from 'react';
import { arrayToTree, renderIcon } from '@utils';
import { useRouteMap } from '@hooks/useRouteMap.jsx';

/**
 * 菜单交互逻辑 hook
 * 管理菜单的展开/选中状态、手风琴模式、路由同步等交互逻辑
 *
 * @param {Array} routesData - 扁平路由数据
 * @param {string} pathname - 当前路由路径
 * @param {boolean} isVertical - 是否纵向布局
 * @param {boolean} collapsed - 侧边栏是否折叠
 * @param {boolean} menuAccordionMode - 是否手风琴模式（同级只展开一个）
 * @returns {{ menuItems, openKeys, selectedKeys, onOpenChange, onMenuClick }}
 */
export const useMenuLogic = (routesData, pathname, isVertical, collapsed, menuAccordionMode) => {
  const [openKeys, setOpenKeys] = useState([]);

  // ref 追踪最新 openKeys，避免 onOpenChange 闭包依赖 openKeys 导致频繁重建
  const openKeysRef = useRef(openKeys);
  openKeysRef.current = openKeys;

  const { getParentKeys, getDisplayKey } = useRouteMap(routesData);

  /**
   * 按层级去重：手风琴模式下，同一层级只保留最后一个 key
   * 利用 parentKeys.length 作为层级标识
   */
  const dedupeByLevel = useCallback(
    (keys) => {
      const levelMap = new Map();
      keys.filter(Boolean).forEach((key) => {
        levelMap.set(getParentKeys(key).length, key);
      });
      return Array.from(levelMap.values());
    },
    [getParentKeys],
  );

  /**
   * 唯一状态入口：所有 openKeys 的修改都通过此函数
   * 内部统一处理合并去重 + 手风琴层级去重
   *
   * @param {string[]} nextKeys - 要设置的 keys
   * @param {boolean} merge - false=替换，true=与当前值合并
   */
  const applyOpenKeys = useCallback(
    (nextKeys, merge = false) => {
      setOpenKeys((prev) => {
        const source = merge ? [...prev, ...nextKeys] : nextKeys;
        const unique = [...new Set(source)];
        return menuAccordionMode && isVertical ? dedupeByLevel(unique) : unique;
      });
    },
    [menuAccordionMode, isVertical, dedupeByLevel],
  );

  const isTransverse = !isVertical;

  /** 菜单项树（仅展示 isShow === '1' 的项） */
  const menuItems = useMemo(() => {
    const tree = arrayToTree(routesData)?.filter((i) => i.isShow === '1') || [];

    const render = (list) =>
      list.map((menu) => {
        const children = menu.children?.filter((c) => c.isShow === '1') || [];
        return {
          key: menu.path,
          label: <span>{menu.name}</span>,
          icon: menu.icon && renderIcon(menu.icon),
          children: children.length ? render(children) : null,
          ...(isTransverse && { popupOffset: [0, 8] }),
        };
      });

    return render(tree);
  }, [routesData, isTransverse]);

  /** 当前高亮的菜单 key（向上查找第一个 isShow 的项） */
  const selectedKeys = useMemo(() => {
    const key = getDisplayKey(pathname);
    return key ? [key] : [];
  }, [pathname, getDisplayKey]);

  /**
   * 子菜单展开/折叠回调
   * 手风琴模式：找到新展开的 key，只保留其父级链 + 自身
   * 非手风琴：直接使用 antd 传入的 keys
   */
  const onOpenChange = useCallback(
    (keys) => {
      if (menuAccordionMode && isVertical) {
        const latestOpenKey = keys.find((key) => !openKeysRef.current.includes(key));
        if (!latestOpenKey) {
          applyOpenKeys(keys);
          return;
        }
        applyOpenKeys([...getParentKeys(latestOpenKey), latestOpenKey]);
      } else {
        applyOpenKeys(keys);
      }
    },
    [menuAccordionMode, isVertical, getParentKeys, applyOpenKeys],
  );

  /** 路由变化时自动展开对应的父级菜单 */
  useEffect(() => {
    if (!isVertical || collapsed) return;
    // 手风琴：替换（层级去重）；非手风琴：合并（保留已展开的）
    applyOpenKeys(getParentKeys(pathname), !menuAccordionMode);
  }, [pathname, collapsed, menuAccordionMode, isVertical, getParentKeys, applyOpenKeys]);

  /** 菜单点击后同步展开父级（手风琴模式下合并） */
  const onMenuClick = useCallback(
    (key) => {
      if (!key || !(menuAccordionMode && isVertical)) return;
      applyOpenKeys(getParentKeys(key), true);
    },
    [menuAccordionMode, isVertical, getParentKeys, applyOpenKeys],
  );

  return { menuItems, openKeys, selectedKeys, onOpenChange, onMenuClick };
};
