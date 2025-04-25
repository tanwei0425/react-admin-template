import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ConfigProvider } from 'antd';
import { ThemeProvider } from 'antd-style';
import zhCN from 'antd/locale/zh_CN';
import { theme, antConfigProvider } from '@config';
import CustomWatermark from '@layouts/customWatermark';

const ThemeProviderWrapper = ({ children }) => {
  const { colorPrimary, grayMode, weakMode } = useSelector((state) => state.theme);
  useEffect(() => {
    const root = document.documentElement;
    // 处理滤镜效果
    let filter = '';
    if (grayMode) {
      filter = 'grayscale(1)';
    } else if (weakMode) {
      filter = 'invert(80%)';
    }
    root.style.filter = filter;
    // 同步主题色到 Tailwind CSS 变量
    root.style.setProperty('--tw-color-primary', colorPrimary);
  }, [colorPrimary, grayMode, weakMode]);
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
