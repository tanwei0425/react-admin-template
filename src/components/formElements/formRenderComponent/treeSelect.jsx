import { TreeSelect } from 'antd';

const defaultConfig = {
  allowClear: true,
  showSearch: true,
  treeNodeFilterProp: 'title',
  placeholder: '请选择',
};

const Index = ({ children, ...fieldProps }) => {
  return (
    <TreeSelect {...defaultConfig} {...fieldProps}>
      {children}
    </TreeSelect>
  );
};

export default Index;
