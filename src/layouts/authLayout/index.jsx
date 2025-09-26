import { useEffect } from 'react';
import { Flex, App } from 'antd';
import { Outlet } from 'react-router-dom';
import { globalConfig } from '@config';
import { getLocalStorageItem } from '@utils';
import loginLeftBg from '@assets/images/login-left-bg.png';
import { Navigate } from 'react-router-dom';
import { useStyle } from './useStyle';
import Helmet from '@components/helmet';
const Index = () => {
  const { styles } = useStyle();
  const token = getLocalStorageItem('token');
  const { message } = App.useApp(); // 获取 notification 实例
  useEffect(() => {
    if (token) {
      message.warning('帐号已登录，请先退出');
    }
  }, [token]);
  if (token) {
    // 通过 Navigate 组件立即重定向，避免页面闪烁
    return <Navigate to="/" replace />;
  }
  return (
    <Flex className={styles.login}>
      <Helmet title="登录" />
      <Flex className={styles.content} flex={1} vertical="vertical" justify="center" align="center">
        <div className={styles.title}>{globalConfig.title}</div>
        <img className={styles.illustration} src={loginLeftBg} alt="" />
        <div className={styles.footer}>版权所有：Copyright 2025 {globalConfig.title}</div>
      </Flex>
      <Flex className={styles.rightContent}>
        <Outlet />
      </Flex>
    </Flex>
  );
};

export default Index;
