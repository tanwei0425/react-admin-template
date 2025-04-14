import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { App as AppContainer, ConfigProvider } from 'antd';
import { ThemeProvider } from 'antd-style';
import zhCN from 'antd/locale/zh_CN';
import Routers from '@router';
import FullScreenLoading from '@layouts/full-screen-loading';
import { AxiosInterceptor } from '@utils/requestInstance';
import { getLocalStorageItem } from '@utils';
import { theme, antAppConfig, antConfigProvider } from '@config';
import useGetAllConfig from '@/hooks/useGetAllConfig';
function App() {
  const token = getLocalStorageItem('token');
  const { colorPrimary } = useSelector((state) => state.theme);
  const { fullScreenLoading } = useSelector((state) => state.userInfo);
  const { systemConfig } = useGetAllConfig();
  useEffect(() => {
    token && systemConfig();
  }, [token]);
  useEffect(() => {
    // ant的主题色同步给tailwind
    theme.token?.colorPrimary &&
      document.documentElement.style.setProperty('--ant-color-primary', colorPrimary);
  }, [colorPrimary]);
  return (
    // ThemeProvider theme生效后 ConfigProvider theme不生效
    <ThemeProvider
      theme={{
        ...theme,
        // 主题改为动态设置
        token: {
          ...theme?.token,
          colorPrimary,
        },
      }}
    >
      <ConfigProvider locale={zhCN} {...antConfigProvider}>
        <AppContainer {...antAppConfig}>
          <AxiosInterceptor />
          {fullScreenLoading ? <FullScreenLoading /> : <Routers />}
        </AppContainer>
      </ConfigProvider>
    </ThemeProvider>
  );
}

export default App;
