import { createStyles } from 'antd-style';

export const useStyle = createStyles(({ token, css }) => {
  return {
    themeSvg: css`
      width: 24px;
      height: 24px;
      color: ${token.colorPrimary};
      cursor: pointer;
    `,
    themeSpace: css`
      width: 100%;
      .tanwei-space-item,
      .tanwei-space-item-split {
        width: 100%;
      }
    `,
    themeSpaceDivider: css`
      margin: 10px 0;
    `,
    overallStyleItem: css`
      position: relative;
      margin-right: 16px;
      box-shadow: 0 1px 2.5px 0 rgba(0, 0, 0, 0.18);
      border-radius: 4px;
      overflow: hidden;
      cursor: pointer;
      width: 44px;
      height: 36px;
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
        width: 33%;
        height: 100%;
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
      bottom: 4px;
      right: 6px;
      color: #1890ff;
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
  };
});
