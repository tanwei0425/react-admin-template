import { createStyles } from 'antd-style';

export const useStyle = createStyles(({ token, css }) => {
  return {
    themeSvg: css`
      width: 24px;
      height: 24px;
      color: ${token.colorPrimary};
      cursor: pointer;
      flex-shrink: 0;
    `,
    themeSpace: css`
      width: 100%;
      .ant-space-item,
      .ant-space-item-split {
        width: 100%;
      }
    `,
    themeSpaceDividerFirst: css`
      margin-top: 0 !important;
    `,

    themeSpaceDivider: css`
      margin: 16px 0 12px 0 !important;
      &::before,
      &::after {
        border-block-start-width: 2px !important;
      }
    `,
    overallStyleItem: css`
      position: relative;
      margin-right: 16px;
      box-shadow: 0 1px 2.5px 0 ${token.colorFill};
      border-radius: 4px;
      overflow: hidden;
      cursor: pointer;
      width: 55px;
      height: 38px;
      background-color: #f0f2f5;
      &::after {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 25%;
        background-color: #fff;
        content: '';
      }
      &::before {
        position: absolute;
        top: 0;
        left: 0;
        width: 30%;
        height: 100%;
        background-color: #fff;
        content: '';
      }
    `,
    transverseOverallStyleItem: css`
      &::before {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 35%;
        background-color: #fff;
        content: '';
      }
    `,
    overallStyleItemDark: css`
      &::before {
        background-color: #242424;
        z-index: 1;
      }
    `,
    overallStyleItemCheck: css`
      position: absolute;
      bottom: 3px;
      right: 5px;
      color: ${token.colorPrimary};
      font-weight: 700;
      font-size: 14px;
      pointer-events: none;
      font-style: normal;
      line-height: 0;
      text-align: center;
      text-transform: none;
      vertical-align: -0.125em;
      text-rendering: optimizeLegibility;
      -webkit-font-smoothing: antialiased;
    `,
    themeLayout: css`
      position: relative;
      display: flex;
      flex-wrap: wrap;
      gap: 14px;
      justify-content: space-between;
    `,
    themeLayoutItem: css`
      position: relative;
      box-sizing: border-box;
      width: 45%;
      height: 70px;
      padding: 6px;
      cursor: pointer;
      border-radius: calc(${token.borderRadiusSM} * 1.5px);
      box-shadow: 0 0 5px 1px ${token.colorFill};
      transition: all 0.2s;
    `,
    themeLayoutItemPrimary: css`
      background-color: ${token.colorPrimary};
      border-radius: calc(${token.borderRadiusSM}px);
    `,
    themeLayoutItemPrimaryOpacity: css`
      opacity: 0.4;
    `,
    themeLayoutActive: css`
      box-shadow: 0 0 0 2px ${token.colorPrimary} !important;
    `,
    themeLayoutVertical: css`
      display: flex;
      justify-content: space-between;
    `,
    themeLayoutItemContainer: css`
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 72%;
    `,
    themeLayoutItemDark: css`
      width: 20%;
    `,
    themeLayoutItemLight: css`
      height: 20%;
    `,
    themeLayoutItemContent: css`
      height: 67%;
      border: 1px dashed ${token.colorPrimary};
    `,
    themeLayoutAnticon: css`
      position: absolute;
      right: 10px;
      bottom: 10px;
      color: ${token.colorPrimary};
    `,
    themeLayoutAnticonSvg: css`
      width: 14px;
      height: 14px;
    `,
    themeLayoutClassic: css`
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    `,
    themeListItem: css`
      .ant-list-item-action > li {
        padding-right: 0 !important;
      }
    `,
  };
});
