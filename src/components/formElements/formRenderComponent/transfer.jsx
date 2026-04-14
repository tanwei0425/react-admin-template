import { Transfer } from 'antd';

const defaultConfig = {
  styles: {
    section: {
      width: '100%',
      height: 420,
    },
  },
  showSearch: true,
  showSelectAll: true,
};
const Index = (fieldProps) => {
  return <Transfer {...defaultConfig} {...fieldProps} />;
};

export default Index;
