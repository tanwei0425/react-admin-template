// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import '@ant-design/v5-patch-for-react-19';
import { HelmetProvider } from 'react-helmet-async';
import { store } from '@store';
import App from '@/App.jsx';
import '@styles/index.scss';

createRoot(document.getElementById('root')).render(
  // 严格模式的检查仅在开发环境执行，始终会调用渲染函数两次。
  // <StrictMode>
  <HelmetProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </HelmetProvider>
  // </StrictMode>
);
