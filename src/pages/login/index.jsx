import { useEffect } from 'react';
import { Flex, App } from 'antd';
import { website } from '@config';
import { getLocalStorageItem } from '@utils';
import loginLeftBg from '@assets/images/login-left-bg.png';
import { useNavigate } from 'react-router-dom';
import LoginForm from './loginForm';
import { useStyle } from './useStyle';

const Index = () => {
  const { styles } = useStyle();
  const navigate = useNavigate();
  const token = getLocalStorageItem('token');
  const { notification } = App.useApp(); // 获取 notification 实例
  useEffect(() => {
    if (token) {
      notification.warning({
        message: '友情提示',
        description: '帐号已登录，请先退出',
      });
      navigate('/');
    }
  }, [token]);

  return (
    <Flex className={styles.login}>
      <Flex
        className={styles.content}
        flex={1}
        vertical="vertical"
        justify="center"
        align="center"
      >
        <div className={styles.title}>{website.title}</div>
        <img className={styles.illustration} src={loginLeftBg} alt="" />
        <div className={styles.footer}>{website.title} 后台管理系统</div>
      </Flex>
      <Flex className={styles.loginForm}>
        <div className={styles.formTitle}>登录</div>
        <LoginForm />
      </Flex>
    </Flex>
  );
};

export default Index;
