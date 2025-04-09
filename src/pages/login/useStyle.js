import { createStyles } from 'antd-style';
import loginBg from '@assets/images/login-bg.jpg';
export const useStyle = createStyles(({ token, css }) => {
  return {
    login: css`
      width: 100vw;
      min-width: 1024px;
      height: 100vh;
      background: #ffffff;
    `,
    content: css`
      background: linear-gradient(
            rgba(255, 255, 255, 0.9),
            rgba(255, 255, 255, 0.9)
          )
          center center / cover no-repeat,
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
    loginForm: css`
      width: 530px;
      background: #fff;
      padding: 0 88px;
      display: flex;
      justify-content: center;
      flex-direction: column;
    `,
    formTitle: css`
      font-size: ${token.fontSizeHeading2}px;
      font-weight: bold;
      margin-bottom: ${token.margin}px;
    `,
    captchaImg: css`
      display: inline-block;
      width: 100%;
      height: ${token.controlHeightLG}px;
      box-sizing: border-box;
      cursor: pointer;
      border: 1px solid ${token.colorBorder};
      border-radius: ${token.borderRadius}px;
      svg {
        width: 100%;
        height: 90%;
      }
    `,
  };
});
