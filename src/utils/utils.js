import { createElement } from 'react';
import * as Icon from '@ant-design/icons';
/**
 * 数组转树结构
 * @param {*} list
 * @param {*} pid
 */
function arrayToTree(list, pid = 0) {
  const tree = list
    .filter((item) => item.pid === pid)
    .map((item) => ({
      ...item,
      children: arrayToTree(list, item.id),
    }));
  tree.forEach((val) => (!val.children || val.children?.length <= 0) && delete val.children);
  return tree || [];
}

/**
 * 树转数组结构
 * @param {*} list
 * @param {*} newArr
 */
function treeToArray(list, newArr = []) {
  list.forEach((item) => {
    const { children } = item;
    if (children) {
      delete item.children;
      if (children.length) {
        newArr.push(item);
        return treeToArray(children, newArr);
      }
    }
    newArr.push(item);
  });
  return newArr;
}
/**
 * 查找父级
 * @param {*} data
 * @param {*} all
 * @param {*} arr
 * @returns
 */
const findParent = (data = [], all, arr = []) => {
  data && arr.unshift(data);
  const parent = all.find((val) => val.id === data?.pid);
  parent && findParent(parent, all, arr);
  return arr;
};
/**
 * 列表字典翻译
 * @param {*} dictData // 数据源
 * @param {*} target // 目标值
 */
const tableColumnToDict = (dictData, target) => {
  if (!dictData || !target || !Array.isArray(dictData)) return target;
  return dictData?.find((val) => val?.key + '' === target + '')?.value;
};

/**
 * a标签导出
 * @param {*} url 导出地址
 */
function exportFile(url) {
  const a = document.createElement('a');
  a.setAttribute('download', true);
  a.setAttribute('href', url);
  const aBody = document.body;
  // IE 10以下不能直接a.click()，要把节点挂在dom上才能click执行
  aBody.appendChild(a).click();
  aBody.removeChild(a);
}

/**
 * 二进制流导出
 * @param {*} data 数据源
 * @param {*} filename 文件名称
 * @param {*} filename 导出的类型，默认xlsx
 */
function exportStreamFile(
  data,
  filename,
  type = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
) {
  const blob = new Blob([data], { type });
  if ('download' in document.createElement('a')) {
    // 非IE下载
    const elink = document.createElement('a');
    elink.download = filename || '';
    elink.style.display = 'none';
    elink.href = URL.createObjectURL(blob);
    document.body.appendChild(elink);
    elink.click();
    URL.revokeObjectURL(elink.href); // 释放URL 对象
    document.body.removeChild(elink);
  } else {
    // IE10+下载
    navigator.msSaveBlob(blob, filename || '');
  }
}
// 渲染antd图标
function renderIcon(title) {
  return Icon[title] && createElement(Icon[title]);
}

export { arrayToTree, treeToArray, findParent, tableColumnToDict, exportFile, exportStreamFile, renderIcon };
