import AuthButton from '@components/authButton';
import { Space, Tooltip } from 'antd';
const Index = ({ data = [], record }) => {
  return (
    <Space>
      {data.map((item) => {
        const { text, key, tipConfig, onClick, ...restValProps } = item;
        const { showTip = true, ...tipProps } = tipConfig || {};
        const ButtonDom = (
          <AuthButton key={key} size={'small'} onClick={onClick.bind(this, record)} {...restValProps}>
            {text}
          </AuthButton>
        );
        return showTip ? (
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
