import { InputNumber } from 'antd';
const defaultConfig = {
  autoComplete: 'off',
  placeholder: '请输入',
};
const Index = ({ style, ...fieldProps }) => {
  return <InputNumber style={{ width: '100%', ...style }} {...defaultConfig} {...fieldProps} />;
};

export default Index;
