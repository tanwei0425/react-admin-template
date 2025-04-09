import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Layout, Menu, Button, theme } from 'antd';

const { Header, Content, Sider } = Layout;

export default function AppLayout() {
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const menuItems = [
    { key: '/', label: <Link to="/">Chat</Link> },
    { key: '/demo', label: <Link to="/demo">Demo</Link> },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ color: 'white', marginRight: 24 }}>企业管理系统</div>
        <Button onClick={handleLogout} style={{ marginLeft: 'auto' }}>
          退出登录
        </Button>
      </Header>
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu mode="inline" defaultSelectedKeys={['/']} items={menuItems} />
        </Sider>
        <Content style={{ padding: 24 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
