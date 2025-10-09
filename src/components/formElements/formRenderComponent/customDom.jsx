/**
 * 自定义dom渲染
 */

import { isValidElement, cloneElement } from 'react';
const CustomDom = ({ renderContent, ...fieldProps }) => {
  if (typeof renderContent === 'function') {
    // 函数：让调用方自己决定如何使用 props
    return renderContent(fieldProps);
  }

  if (isValidElement(renderContent)) {
    // React 节点：clone 并透传 props
    return cloneElement(renderContent, { ...fieldProps });
  }

  if (typeof componentsDom === 'string' || typeof componentsDom === 'number') {
    // 字符串/数字：直接展示
    return <span>{renderContent}</span>;
  }
  return <span>自定义组件无效</span>;
};

export default CustomDom;
