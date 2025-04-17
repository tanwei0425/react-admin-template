import { createStyles, keyframes } from 'antd-style';

export const useStyle = createStyles(({ token, css }) => {
  const siderTopHeight = 56;
  const siderBottomHeight = 50;
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
      '.ant-prompts': {
        color: ${token.colorText};
      }
    `,
    sider: css`
      box-shadow:
        0px 2px 4px 0px rgba(45, 45, 46, 0.15),
        0px 0px 1px 0px rgba(45, 45, 46, 0.1);
      .ant-layout-sider-children {
        display: flex;
        flex-direction: column;
        height: 100vh; /* 占满整个视口 */
      }
    `,
    siderHeader: css`
      display: flex;
      height: ${siderTopHeight}px;
      align-items: center;
      padding: 0 ${token.paddingSM}px;
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
    siderMenuTrigger: css`
      display: flex;
      align-items: center;
      justify-content: flex-end;
      height: ${siderBottomHeight}px;
      padding: 0 ${token.padding}px;
      color: rgba(255, 255, 255, 0.65);
      font-size: 16px;
      border-top: 1px solid #f0f0f0;
    `,
    siderMenuTriggerDark: css`
      border-top: 1px solid rgba(255, 255, 255, 0.15);
    `,
    siderMenuTriggerCollapsed: css`
      justify-content: center;
    `,
    siderMenuTriggerIcon: css`
      cursor: pointer;
      transition: color 0.3s;
      font-size: ${token.myFontSize18}px;
      color: rgba(0, 0, 0, 0.85);
      &:hover {
        color: ${token.colorPrimary};
      }
    `,
    siderMenuTriggerIconDark: css`
      color: #fff;
    `,
    menu: css`
      height: calc(100vh - ${siderTopHeight}px - ${siderBottomHeight}px);
      padding: ${token.paddingXS}px 0;
      overflow-y: auto;
      overflow-x: hidden;
      border-inline-end: none !important;
    `,
    menuTrigger: css`
      height: calc(100vh - ${siderTopHeight}px);
    `,
    mainContainer: css`
      height: 100vh;
      overflow-y: auto;
    `,
    mainContainerFixed: css`
      overflow-y: hidden;
    `,
    mainHeader: css`
      width: 100%;
      height: ${siderTopHeight}px;
      background-color: #fff;
      padding: 0;
      box-shadow:
        0px 2px 4px 0px rgba(45, 45, 46, 0.15),
        0px 0px 1px 0px rgba(45, 45, 46, 0.1);
    `,
    headerContainer: css`
      display: flex;
      height: ${siderTopHeight}px;
      align-items: center;
      justify-content: space-between;
      padding: 0 ${token.paddingSM}px;
    `,
    headerInfo: css`
      display: flex;
      height: ${siderTopHeight}px;
      align-items: center;
      gap: 9px;
      vertical-align: middle;
    `,
    headerTriggerIcon: css`
      display: flex;
      cursor: pointer;
      transition: color 0.3s;
      font-size: ${token.myFontSize18}px;
      color: rgba(0, 0, 0, 0.85);
      &:hover {
        color: ${token.colorPrimary};
      }
    `,
    headerInfoUser: css`
      width: 30px;
      height: 30px;
    `,
    username: css`
      font-size: ${token.fontSizeLG}px;
      cursor: default;
    `,
    github: css`
      font-size: 22px;
      cursor: pointer;
    `,
    mainContent: css`
      margin: 0 ${token.paddingSM}px;
    `,
    breadcrumb: css`
      padding: ${token.paddingSM}px;
    `,
    aloneBreadcrumb: css`
      margin-top: ${token.paddingSM}px;
    `,
    mainOutletFixed: css`
      overflow-y: auto;
    `,
    mainOutlet: css`
      border-radius: ${token.borderRadius}px;
      background-color: #fff;
    `,
  };
});
