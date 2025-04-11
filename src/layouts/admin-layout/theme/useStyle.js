import { createStyles } from 'antd-style';

export const useStyle = createStyles(({ token, css }) => {
  return {
    themeSvg: css`
      width: 24px;
      height: 24px;
      color: ${token.colorPrimary};
      cursor: pointer;
    `,
  };
});
