import { Navigate } from 'react-router-dom';
import { getLocalStorageItem } from '@utils';
// 路由守卫组件
const AuthRouter = ({ children }) => {
  console.log('AuthRouter');
  if (!getLocalStorageItem('token')) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
export default AuthRouter;
