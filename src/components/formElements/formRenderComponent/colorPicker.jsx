import { ColorPicker } from 'antd';

const Index = ({ value, onChange, ...fieldProps }) => {
  return <ColorPicker value={value} onChange={(_, hex) => onChange?.(hex)} showText {...fieldProps} />;
};

export default Index;
