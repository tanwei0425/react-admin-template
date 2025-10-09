import { Cascader } from 'antd';

const defaultConfig = {
  placeholder: '请选择',
};
const Index = ({ options, onChange, ...fieldProps }) => {
  return <Cascader {...defaultConfig} options={options} onChange={onChange} {...fieldProps} />;
};

export default Index;
