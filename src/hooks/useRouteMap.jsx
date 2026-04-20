import { useMemo, useCallback } from 'react';

/**
 * 路由数据索引 hook
 * 将扁平路由数据预计算为 Map 索引，所有查找操作 O(1)
 *
 * 预计算内容：
 * - pathMap: path → route 对象
 * - parentKeysMap: path → 父级 path 数组（不含自身）
 * - parentChainMap: path → 完整祖先链（含自身，从根到当前）
 *
 * @param {Array} routesData - 扁平路由数据
 * @returns {{ pathMap, getParentKeys, getParentChain, getDisplayKey }}
 */
export const useRouteMap = (routesData) => {
  const { pathMap, parentKeysMap, parentChainMap } = useMemo(() => {
    // 基础索引：path / id → route 对象
    const pMap = new Map();
    const iMap = new Map();

    routesData.forEach((item) => {
      pMap.set(item.path, item);
      iMap.set(String(item.id), item);
    });

    // 预计算索引：path → 父级 keys / 完整祖先链
    const pkMap = new Map();
    const pcMap = new Map();

    /**
     * 递归构建祖先链（带记忆化，每个节点只计算一次）
     * 子链复用父链结果：[...parentChain, self]
     */
    const buildChain = (item) => {
      if (pcMap.has(item.path)) return;

      // 根节点：无父级
      if (!item.pid) {
        pkMap.set(item.path, []);
        pcMap.set(item.path, [item]);
        return;
      }

      const parent = iMap.get(String(item.pid));

      // 父级不存在（脏数据兜底）
      if (!parent) {
        pkMap.set(item.path, []);
        pcMap.set(item.path, [item]);
        return;
      }

      // 先递归构建父链，再复用
      buildChain(parent);

      pkMap.set(item.path, [...pkMap.get(parent.path), parent.path]);
      pcMap.set(item.path, [...pcMap.get(parent.path), item]);
    };

    routesData.forEach(buildChain);

    return { pathMap: pMap, parentKeysMap: pkMap, parentChainMap: pcMap };
  }, [routesData]);

  /** 获取指定路径的所有父级 path（不含自身），O(1) */
  const getParentKeys = useCallback((path) => parentKeysMap.get(path) || [], [parentKeysMap]);

  /** 获取指定路径的完整祖先链（含自身，从根到当前），O(1) */
  const getParentChain = useCallback((path) => parentChainMap.get(path) || [], [parentChainMap]);

  /**
   * 获取当前路径用于菜单高亮的 key
   * 从自身向上查找第一个 isShow === '1' 的项
   * 用于处理"隐藏路由高亮到父级"的场景
   */
  const getDisplayKey = useCallback(
    (path) => {
      const chain = parentChainMap.get(path);
      if (!chain) return null;
      for (let i = chain.length - 1; i >= 0; i--) {
        if (chain[i].isShow === '1') return chain[i].path;
      }
      return null;
    },
    [parentChainMap]
  );

  return { pathMap, getParentKeys, getParentChain, getDisplayKey };
};
