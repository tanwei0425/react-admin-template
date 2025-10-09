import { Switch } from 'antd';

const defaultConfig = {
  defaultChecked: true,
};
const Index = (fieldProps) => {
  return <Switch {...defaultConfig} {...fieldProps} />;
};

export default Index;
