import { createStyles } from 'antd-style';

export const useStyle = createStyles(({ token, css }) => {
  return {
    layout: css`
      width: 100%;
      height: 100vh;
      border-radius: ${token.borderRadius}px;
      display: flex;
      background: ${token.colorBgContainer};
      font-family: AlibabaPuHuiTi, ${token.fontFamily}, sans-serif;
      .ant-prompts {
        color: ${token.colorText};
    `,
    menu: css`
      background: ${token.colorBgLayout}80;
      width: 280px;
      height: 100vh;
      padding: ${token.padding}px;
      display: flex;
      flex-direction: column;
    `,
    conversations: css`
      padding: ${token.paddingSM}px;
      flex: 1;
      overflow-y: auto;
    `,
    chat: css`
      width: 100%;
      height: 100vh;
      max-width: 950px;
      margin: 0 auto;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      padding: ${token.paddingLG}px;
      gap: 16px;
    `,
    messages: css`
      flex: 1;
      padding-right: ${token.padding}px;
      max-height: calc(100vh - 320px);
      .ant-bubble {
        width: 100%;
      }
    `,
    messageList: css`
      flex: 1;
      height: 100%;
      .ant-bubble {
        width: 100%;
        .ant-bubble-content {
          width: 100%;
        }
      }
    `,
    placeholder: css`
      width: 100%;
      padding-top: ${token.paddingLG}px;
    `,
    sender: css`
      box-shadow: ${token.boxShadow};
    `,
    logo: css`
      display: flex;
      height: 72px;
      align-items: center;
      justify-content: start;
      padding: 0 24px;
      box-sizing: border-box;

      img {
        width: 20px;
        height: 20px;
        display: inline-block;
      }

      span {
        display: inline-block;
        margin: 0 8px;
        font-weight: bold;
        color: ${token.colorText};
        font-size: 18px;
      }
    `,
    addBtn: css`
      width: calc(100% - 24px);
      margin: 0 12px 24px 12px;
      .ant-btn-icon {
        font-size: 18px;
      }
    `,
  };
});
