import { Upload } from 'antd';

const Index = ({ children, ...fieldProps }) => {
  return <Upload {...fieldProps}>{children}</Upload>;
};

export default Index;
