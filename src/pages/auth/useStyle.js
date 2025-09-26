import { createStyles } from 'antd-style';
export const useStyle = createStyles(({ token, css }) => {
  return {
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
