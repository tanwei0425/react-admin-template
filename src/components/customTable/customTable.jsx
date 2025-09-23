import { Table } from 'antd';
import enhancedTitle from './enhancedTitle';
import enhancedColumns, { tooltipEnhancer } from './enhancedColumns';
import OperateRender from './operateRender';
const CustomTable = ({ pagination, columns = [], title, toolBarRender, size = 'small', ...restProps }) => {
  // title增强器
  const finalTitle = enhancedTitle({
    title,
    toolBarRender,
  });
  // columns增强器
  const finalColumns = enhancedColumns(columns, [tooltipEnhancer]);

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
        scroll={{ x: 900 }}
        {...restProps}
      />
    </div>
  );
};

export { CustomTable as default, OperateRender };
