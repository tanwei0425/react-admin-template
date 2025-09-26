import { Navigate } from 'react-router-dom';
import { getLocalStorageItem } from '@utils';
// 路由守卫组件
const AuthRouter = ({ children }) => {
  const token = getLocalStorageItem('token');
  if (!token) {
    // 通过 Navigate 组件立即重定向，避免 /login 页面闪烁
    return <Navigate to="/auth/login" replace />;
  }
  return children;
};
export default AuthRouter;
