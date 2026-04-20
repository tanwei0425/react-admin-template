import { Table } from 'antd';
import { useSelector } from 'react-redux';
import enhancedTitle from './enhancedTitle';
import enhancedColumns, { copyableEnhancer, tooltipEnhancer, dictEnhancer } from './enhancedColumns';
import EnhancedOperateRender from './enhancedOperateRender';

/**
 * 自定义表格组件 - 内置标题增强、复制、省略号提示、字典翻译功能
 * @param {Array} props.columns - 列配置
 * @param {Object|boolean} props.pagination - 分页配置，false 表示不分页
 * @param {string|ReactNode} props.title - 表格标题
 * @param {ReactNode} props.toolBarRender - 工具栏渲染
 * @param {string} props.size - 表格尺寸，默认 small
 */
const CustomTable = ({ pagination, columns = [], title, toolBarRender, size = 'small', ...restProps }) => {
  const { dictData } = useSelector((state) => state.userInfo);

  const finalTitle = enhancedTitle({
    title,
    toolBarRender,
  });

  // ⚠️ 增强器顺序很重要：dict 必须最后执行（否则 render 会被覆盖）
  const finalColumns = enhancedColumns(columns, [copyableEnhancer, tooltipEnhancer, dictEnhancer(dictData)]);

  return (
    <div className={'t-table'}>
      <Table
        size={size}
        title={finalTitle && (() => finalTitle)}
        columns={finalColumns}
        pagination={
          pagination
            ? {
                size: 'small',
                showQuickJumper: true,
                showSizeChanger: true,
                pageSizeOptions: ['10', '20', '50', '80'],
                showTotal: (total, range) => `显示${range[0]}到${range[1]}, 共 ${total} 条数据`,
                ...pagination,
              }
            : false
        }
        scroll={{ x: 900 }} // 默认滚动宽度900px 防止内容超出表格宽度
        {...restProps}
      />
    </div>
  );
};

export { CustomTable as default, EnhancedOperateRender };
