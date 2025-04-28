import { createStyles, keyframes } from 'antd-style';

export const useStyle = createStyles(({ css }) => {
  const rotate = keyframes`
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  `;
  return {
    settingDropdown: css`
      inset: 60px 52px auto auto !important;
      max-width: 300px;
      .ant-dropdown-menu-title-content {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    `,
    settingIcon: css`
      width: 26px;
      height: 26px;
      vertical-align: middle; /* 让图标和文字基线对齐 */
      animation: ${rotate} 5s linear infinite;
      color: #777;
      cursor: pointer;
      flex-shrink: 0;
    `,
  };
});
