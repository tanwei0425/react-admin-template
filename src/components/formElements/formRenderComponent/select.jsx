import { Select, Tooltip } from 'antd';
const { Option } = Select;
const defaultConfig = {
  placeholder: '请选择',
  allowClear: true,
};
const Index = ({ children, options, isTooltip = false, ...filedProps }) => {
  const optionsData = children || options;
  return (
    <Select {...defaultConfig} {...filedProps}>
      {optionsData?.map((val) => {
        const { key, value, ...rest } = val || {};
        return (
          <Option key={key} {...rest}>
            {isTooltip ? (
              <Tooltip placement="left" title={value}>
                {value}
              </Tooltip>
            ) : (
              value
            )}
          </Option>
        );
      })}
    </Select>
  );
};

export default Index;
