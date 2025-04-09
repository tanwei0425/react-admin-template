import { createStyles, keyframes } from 'antd-style';

export const useStyle = createStyles(({ token, css }) => {
  const height = 60;
  const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
  return {
    layouts: css`
      width: 100%;
      min-width: 1000px;
      height: 100vh;
      border-radius: ${token.borderRadius}px;
      display: flex;
      background: ${token.colorBgContainer};
      font-family: AlibabaPuHuiTi, ${token.fontFamily}, sans-serif;
      .ant-prompts {
        color: ${token.colorText};
    `,
    sider: css`
      .ant-layout-sider-children {
        display: flex;
        flex-direction: column;
        height: 100vh; /* 占满整个视口 */
      }
    `,
    siderHeader: css`
      display: flex;
      height: ${height}px;
      align-items: center;
      padding: 0 ${token.paddingSM}px;
      border-bottom: 1px solid rgba(58, 60, 62, 1);
    `,
    siderLogo: css`
      width: 45px;
      height: 45px;
      color: ${token.colorPrimary};
    `,
    siderTitle: css`
      padding-left: ${token.paddingXS}px;
      color: ${token.colorPrimary};
      font-size: ${token.myFontSize18}px;
      padding-top: 5px;
      font-weight: 700;
      opacity: 0;
      animation: ${fadeIn} 1s forwards;
    `,

    siderMenus: css`
      flex: 1; /* 自适应高度 */
      padding-top: ${token.paddingXS}px;
      overflow-y: auto; /* 允许滚动 */
    `,
    header: css`
      width: 100%;
      height: ${height}px;
      background-color: #fff;
      padding: 0;
    `,
    headerContainer: css`
      display: flex;
      height: ${height}px;
      align-items: center;
      justify-content: space-between;
      padding: 0 ${token.padding}px;
    `,
    headerTriggerIcon: css`
      cursor: pointer;
      font-size: ${token.myFontSize18}px;
    `,
    headerInfo: css`
      display: flex;
      align-items: center;
      gap: 10px;
    `,
    headerInfoUser: css`
      width: 30px;
      height: 30px;
    `,
    username: css`
      font-size: ${token.fontSizeLG}px;
      cursor: default;
    `,
    themeSvg: css`
      width: 26px;
      height: 26px;
      color: ${token.colorPrimary};
      cursor: pointer;
    `,
  };
});
