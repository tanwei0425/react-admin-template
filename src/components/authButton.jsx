/**
 * 按钮权限
 */
import { Button } from 'antd';
import { authority } from '@utils/utils';
import { useSelector } from 'react-redux';
const AuthButton = ({ authKey, children, ...restProps }) => {
  const { authButton } = useSelector((state) => state.userInfo);
  return authKey &&
    !authority({
      dataSource: authButton,
      authKey: authKey,
    }) ? null : (
    <Button {...restProps}>{children}</Button>
  );
};

export default AuthButton;
