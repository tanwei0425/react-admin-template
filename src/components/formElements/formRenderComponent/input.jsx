import { Input } from 'antd';
const defaultConfig = {
  autoComplete: 'off',
  allowClear: true,
  placeholder: '请输入',
  maxLength: 50,
};
const Index = (fieldProps) => {
  return <Input {...defaultConfig} {...fieldProps} />;
};
const Password = (fieldProps) => {
  return <Input.Password {...defaultConfig} {...fieldProps} />;
};
const TextArea = (fieldProps) => {
  return (
    <Input.TextArea
      showCount={true}
      autoSize={{
        minRows: 2,
        maxRows: 5,
      }}
      {...defaultConfig}
      maxLength={500}
      {...fieldProps}
    />
  );
};
const Search = (fieldProps) => {
  return <Input.Search {...defaultConfig} {...fieldProps} />;
};
const Group = ({ children, ...restfieldProps }) => {
  return (
    <Input.Group {...defaultConfig} {...restfieldProps}>
      {children}
    </Input.Group>
  );
};

Index.Password = Password;
Index.TextArea = TextArea;
Index.Search = Search;
Index.Group = Group;

export default Index;
