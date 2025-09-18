import { Radio } from 'antd';
const defaultConfig = {
  allowClear: true,
  placeholder: '请选择',
};
const Index = ({ children, options, optionType, ...filedProps }) => {
  const optionsData = children || options;
  return (
    <Radio.Group {...defaultConfig} {...filedProps}>
      {optionsData?.map((val) => {
        const { key, value, ...rest } = val || {};
        return optionType === 'button' ? (
          <Radio.Button key={key} value={key} {...rest}>
            {value}
          </Radio.Button>
        ) : (
          <Radio key={key} value={key} {...rest}>
            {value}
          </Radio>
        );
      })}
    </Radio.Group>
  );
};

export default Index;
