import AuthButton from '@components/authButton';
import { Space, Tooltip } from 'antd';
const Index = ({ data = [] }) => {
  return (
    <Space>
      {data.map((item) => {
        const { text, key, tipConfig, onClick, visible = true, ...restValProps } = item;
        const { withTooltip = true, ...tipProps } = tipConfig || {};
        if (!visible) return null;
        const ButtonDom = (
          <AuthButton key={key} size={'small'} onClick={onClick} {...restValProps}>
            {text}
          </AuthButton>
        );

        return withTooltip ? (
          <Tooltip key={key} placement="top" title={text} {...tipProps}>
            {ButtonDom}
          </Tooltip>
        ) : (
          ButtonDom
        );
      })}
    </Space>
  );
};
export default Index;
