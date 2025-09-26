import { createStyles } from 'antd-style';
import loginBg from '@assets/images/login-bg.jpg';
export const useStyle = createStyles(({ css }) => {
  return {
    login: css`
      width: 100vw;
      min-width: 1024px;
      height: 100vh;
      background: #ffffff;
    `,
    content: css`
      background:
        linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)) center center / cover no-repeat,
        url(${loginBg});
    `,
    title: css`
      font-size: 46px;
      font-weight: 700;
    `,

    illustration: css`
      max-width: 560px;
      margin: 3vh 0;
    `,

    footer: css`
      font-size: 16px;
    `,
    rightContent: css`
      width: 530px;
      background: #fff;
      padding: 0 88px;
      display: flex;
      justify-content: center;
      flex-direction: column;
    `,
  };
});
