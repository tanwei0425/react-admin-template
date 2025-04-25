import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ConfigProvider } from 'antd';
import { ThemeProvider } from 'antd-style';
import zhCN from 'antd/locale/zh_CN';
import { theme, antConfigProvider } from '@config';
import CustomWatermark from '@layouts/themeProvider/customWatermark';

const ThemeProviderWrapper = ({ children }) => {
  const { colorPrimary } = useSelector((state) => state.theme);
  useEffect(() => {
    // ant的主题色同步给tailwind
    colorPrimary && document.documentElement.style.setProperty('--tw-color-primary', colorPrimary);
  }, [colorPrimary]);
  return (
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
        <CustomWatermark>{children}</CustomWatermark>
      </ConfigProvider>
    </ThemeProvider>
  );
};

export default ThemeProviderWrapper;
