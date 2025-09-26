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
      height: 100vh;
      border-radius: ${token.borderRadius}px;
      display: flex;
      background: ${token.colorBgContainer};
      font-family: AlibabaPuHuiTi, ${token.fontFamily}, sans-serif;
      .ant-prompts {
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
      padding-left: ${token.paddingXXS}px;
      color: ${token.colorPrimary};
      font-size: ${token.fontSizeLG}px;
      height: ${siderTopHeight}px;
      line-height: ${siderTopHeight}px;
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
      flex: 1; /* 占用剩余空间 */
      padding: ${token.paddingXS}px 0;
      overflow-y: auto;
      overflow-x: hidden;
      border-inline-end: none !important;
    `,
    mainContainer: css`
      height: 100vh;
      overflow-y: auto;
      overflow-x: hidden;
    `,
    mainContainerFixed: css`
      overflow-y: hidden;
    `,
    mainHeader: css`
      width: 100%;
      height: ${siderTopHeight}px;
      background-color: ${token.colorBgContainer};
      padding: 0;
      box-shadow:
        0px 2px 4px 0px rgba(45, 45, 46, 0.15),
        0px 0px 1px 0px rgba(45, 45, 46, 0.1);
    `,
    headerContainer: css`
      display: flex;
      width: 100%;
      height: ${siderTopHeight}px;
      align-items: center;
      justify-content: space-between;
      padding: 0 ${token.paddingSM}px;
      background-color: ${token.myLightColor};
    `,
    headerInfo: css`
      display: flex;
      height: ${siderTopHeight}px;
      align-items: center;
      gap: 9px;
      flex-shrink: 0;
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
      color: ${token.myDarkColor};
    `,
    github: css`
      font-size: 22px;
      cursor: pointer;
      color: ${token.myDarkColor};
    `,
    mainContent: css`
      padding: 0 ${token.paddingSM}px;
      ${'' /* overflow-x: hidden; */}
    `,
    breadcrumb: css`
      padding: ${token.paddingSM}px;
    `,
    aloneBreadcrumb: css`
      padding-top: ${token.paddingSM}px;
    `,
    mainOutletFixed: css`
      overflow-y: auto;
    `,
    mainOutlet: css`
      border-radius: ${token.borderRadius}px;
      background-color: ${token.colorBgContainer};
    `,
    mainFooter: css`
      display: flex;
      align-items: center;
      justify-content: center;
      height: 30px;
      padding: 0;
      background-color: ${token.colorBgContainer};
      border-top: 1px solid ${token.colorBorderSecondary};
      margin-top: ${token.paddingSM}px;
    `,

    // 横向布局
    transverseSideHeader: css`
      padding-left: 0;
      padding-right: 0;
      flex-shrink: 0;
    `,
    transverseHeader: css`
      background-color: ${token.myDarkColor};
    `,
    transverseMenu: css`
      flex: 1;
      margin: 0 15px;
      height: ${siderTopHeight}px;
      line-height: ${siderTopHeight}px!important;
      align-items: center;
      overflow: hidden;
      .ant-menu-overflow-item {
        display: flex;
        align-items: center;
        height: 36px;
        line-height: 36px;
        border-radius: ${token.borderRadius}px!important;
      }
    `,
    transverseHeaderInfo: css`
      flex-shrink: 0;
    `,
    transverseUsername: css`
      color: ${token.myLightColor};
    `,
    transverseGithub: css`
      color: ${token.myLightColor};
    `,
  };
});
