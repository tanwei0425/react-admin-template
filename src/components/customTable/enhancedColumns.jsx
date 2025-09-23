import { Tooltip } from 'antd';

/**
 * Tooltip增强器：当 ellipsis = true 时，为文本添加 tooltip
 */
const style = {
  maxHeight: '60vh',
  overflowY: 'auto',
  marginLeft: '6px',
  whiteSpace: 'pre-wrap', // 支持换行
  wordBreak: 'break-word', // 长单词自动换行
};
export const tooltipEnhancer = (columns) => {
  return columns.map((col, colIndex) => {
    if (!col.ellipsis) return col;
    const originRender = col.render;
    return {
      ...col,
      render: (text, record, index) => {
        const content = originRender ? originRender(text, record, index) : text;
        return (
          <Tooltip placement={colIndex === 0 ? 'right' : 'left'} title={<div style={style}>{content}</div>}>
            <span>{content}</span>
          </Tooltip>
        );
      },
    };
  });
};

/**
 * 权限过滤增强器：过滤掉没有权限的列
 */
export const permissionEnhancer =
  (allowedKeys = []) =>
  (columns) => {
    if (!allowedKeys.length) return columns;
    return columns.filter((col) => !col.key || allowedKeys.includes(col.key));
  };

/**
 * 宽度默认增强器：如果没有设置宽度，就给个默认值
 */
export const defaultWidthEnhancer =
  (defaultWidth = 120) =>
  (columns) => {
    return columns.map((col) => (col.width ? col : { ...col, width: defaultWidth }));
  };

/**
 * 纯函数：按顺序执行增强器
 */
export default function enhancedColumns(columns = [], enhancers = []) {
  if (!Array.isArray(enhancers)) return [...columns];
  return enhancers.reduce(
    (acc, enhancer) => {
      if (typeof enhancer === 'function') {
        return enhancer(acc) || acc; // 兼容 enhancer 返回 undefined
      }
      return acc; // 跳过非函数
    },
    [...columns]
  );
}
