import { createStyles } from 'antd-style';

export const useStyle = createStyles(({ css }) => {
  return {
    customModal: css`
      width: 100vw;
      height: 100vh;
      .ant-modal-content {
        .ant-modal-body {
          overflow-y: auto;
          max-height: 65vh;
          margin-right: 2px;
        }
      }
    `,
  };
});
