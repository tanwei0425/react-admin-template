import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { App as AntdApp } from 'antd';
import Routers from '@router';
import FullScreenLoading from '@layouts/fullScreenLoading';
import { AxiosInterceptor } from '@utils/requestInstance';
import { getLocalStorageItem } from '@utils';
import { antAppConfig } from '@config';
import useGetAllConfig from '@hooks/useGetAllConfig';
import ThemeProvider from '@layouts/themeProvider';

function App() {
  const token = getLocalStorageItem('token');
  const { fullScreenLoading } = useSelector((state) => state.userInfo);
  const { systemConfig } = useGetAllConfig();
  useEffect(() => {
    token && systemConfig();
  }, [token]);
  return (
    <ThemeProvider>
      <AntdApp {...antAppConfig}>
        <AxiosInterceptor />
        {fullScreenLoading ? <FullScreenLoading /> : <Routers />}
      </AntdApp>
    </ThemeProvider>
  );
}

export default App;
