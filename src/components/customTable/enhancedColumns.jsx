import { Typography } from 'antd';
import EllipsisText from './components/ellipsisText';

const mergeOnCell = (originOnCell, extraStyle = {}) => {
  return (...args) => {
    const originCellProps = originOnCell?.(...args) || {};
    return {
      ...originCellProps,
      style: { ...originCellProps.style, ...extraStyle },
    };
  };
};

const ELLIPSIS_CELL_STYLE = { overflow: 'hidden', whiteSpace: 'nowrap' };

export const copyableEnhancer = (columns) => {
  return columns.map((col) => {
    if (!col.copyable) return col;
    const originRender = col.render;
    const copyableConfig = typeof col.copyable === 'object' ? col.copyable : {};
    const hasEllipsis = !!col.ellipsis;
    return {
      ...col,
      copyable: false,
      ellipsis: false,
      onCell: mergeOnCell(col.onCell, hasEllipsis ? ELLIPSIS_CELL_STYLE : {}),
      render: (text, record, index) => {
        const content = originRender ? originRender(text, record, index) : text;
        if (!content && content !== 0) return '';
        if (hasEllipsis) {
          return <EllipsisText content={content} copyable copyableConfig={copyableConfig} />;
        }
        return (
          <Typography.Text copyable={{ tooltips: false, ...copyableConfig }}>
            {content}
          </Typography.Text>
        );
      },
    };
  });
};

export const tooltipEnhancer = (columns) => {
  return columns.map((col) => {
    if (!col.ellipsis) return col;
    const originRender = col.render;
    return {
      ...col,
      ellipsis: false,
      onCell: mergeOnCell(col.onCell, ELLIPSIS_CELL_STYLE),
      render: (text, record, index) => {
        const content = originRender ? originRender(text, record, index) : text;
        if (!content && content !== 0) return '';
        return <EllipsisText content={content} />;
      },
    };
  });
};

export const permissionEnhancer =
  (allowedKeys = []) =>
  (columns) => {
    if (!allowedKeys.length) return columns;
    return columns.filter((col) => !col.key || allowedKeys.includes(col.key));
  };

export const defaultWidthEnhancer =
  (defaultWidth = 120) =>
  (columns) => {
    return columns.map((col) => (col.width ? col : { ...col, width: defaultWidth }));
  };

export default function enhancedColumns(columns = [], enhancers = []) {
  if (!Array.isArray(enhancers)) return [...columns];
  return enhancers.reduce(
    (acc, enhancer) => {
      if (typeof enhancer === 'function') {
        return enhancer(acc) || acc;
      }
      return acc;
    },
    [...columns]
  );
}
