import { Tag, Typography } from 'antd';
import EllipsisText from './components/ellipsisText';
import { tableColumnToDict } from '@utils/utils';

/** 合并 onCell 配置，在保留原有逻辑基础上追加样式 */
const mergeOnCell = (originOnCell, extraStyle = {}) => {
  return (...args) => {
    const originCellProps = originOnCell?.(...args) || {};
    return {
      ...originCellProps,
      style: { ...originCellProps.style, ...extraStyle },
    };
  };
};

/** 省略号单元格基础样式 */
const ELLIPSIS_CELL_STYLE = { overflow: 'hidden', whiteSpace: 'nowrap' };

/** 复制功能增强器 - 为配置 copyable 的列添加复制功能 */
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
        return <Typography.Text copyable={{ tooltips: false, ...copyableConfig }}>{content}</Typography.Text>;
      },
    };
  });
};

/** 省略号提示增强器 - 为配置 ellipsis 的列添加 Tooltip 悬浮提示 */
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

/**
 * 字典列增强器 - 自动翻译字典值，支持颜色映射和数组类型
 * @param {Object} dictData - 字典数据源
 * @returns {Function} enhancer函数
 *
 * @example
 * // 简单翻译
 * { title: '性别', dataIndex: 'gender', dict: 'gender' }
 * // 带颜色Tag
 * { title: '状态', dataIndex: 'status', dict: { key: 'status', colorMap: { 1: 'green', 0: 'red' } } }
 * // 数组类型
 * { title: '角色', dataIndex: 'roleIds', dict: { key: 'role', separator: '、' } }
 */
export const dictEnhancer = (dictData) => (columns) => {
  return columns.map((col) => {
    if (!col.dict) return col;

    const originRender = col.render;
    const {
      key: dictKey,
      colorMap = {},
      asTag = false,
      separator = '、',
    } = typeof col.dict === 'string' ? { key: col.dict } : col.dict;

    const targetDictData = dictData[dictKey] || [];
    // 统一颜色获取（兼容 number / string）
    const getColor = (val) => {
      if (val === null || val === undefined) return undefined;
      return colorMap[val] ?? colorMap[String(val)];
    };
    const hasColor = Object.keys(colorMap).length > 0;
    return {
      ...col,
      dict: undefined,
      render: (text, record, index) => {
        if (originRender) {
          text = originRender(text, record, index);
        }

        if (text === null || text === undefined) return text;

        // 处理数组类型（如角色列表）
        if (Array.isArray(text)) {
          const labels = text.map((v) => tableColumnToDict(targetDictData, v) || v);
          if (asTag || hasColor) {
            return labels.map((label, i) => (
              <Tag key={i} color={getColor(text[i])} style={{ marginRight: 4 }}>
                {label}
              </Tag>
            ));
          }
          return labels.join(separator);
        }

        // 翻译后的标签
        const translatedLabel = tableColumnToDict(targetDictData, text) || text;

        if (asTag || hasColor) {
          return <Tag color={getColor(text)}>{translatedLabel}</Tag>;
        }

        return translatedLabel;
      },
    };
  });
};

/** 列配置管道处理器 - 依次应用所有增强器到列配置上 */
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
