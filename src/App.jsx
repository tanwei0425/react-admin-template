import { useEffect } from 'react';
import { App as AppContainer, ConfigProvider } from 'antd';
import { ThemeProvider } from 'antd-style';
import zhCN from 'antd/locale/zh_CN';
import Routers from '@router';
import { AxiosInterceptor } from '@utils/requestInstance';
import { theme, antAppConfig, antConfigProvider } from '@config';

function App() {
  useEffect(() => {
    // ant的主题色同步tailwind
    document.documentElement.style.setProperty(
      '--ant-color-primary',
      theme?.token?.colorPrimary
    );
  }, [theme?.token?.colorPrimary]);
  return (
    // ThemeProvider theme生效后 ConfigProvider theme不生效
    <ThemeProvider theme={theme}>
      <ConfigProvider locale={zhCN} {...antConfigProvider}>
        <AppContainer {...antAppConfig}>
          <AxiosInterceptor />
          <Routers />
        </AppContainer>
      </ConfigProvider>
    </ThemeProvider>
  );
}

export default App;
