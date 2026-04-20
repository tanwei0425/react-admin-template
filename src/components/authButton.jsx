/**
 * 按钮权限
 */
import { Button } from 'antd';
import { useSelector } from 'react-redux';
import { checkAuth } from '@utils';

/**
 * 按钮权限
 */
const AuthButton = ({ authKey, children, ...restProps }) => {
  const { authButton } = useSelector((state) => state.userInfo);

  // ✅ 没传 authKey → 不做权限控制
  if (!authKey) {
    return <Button {...restProps}>{children}</Button>;
  }

  // ✅ 有 authKey → 校验
  const hasAuth = checkAuth({
    dataSource: authButton,
    authKey,
  });

  if (!hasAuth) return null;

  return <Button {...restProps}>{children}</Button>;
};

export default AuthButton;
