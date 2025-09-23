import { createStyles } from 'antd-style';

export const useStyle = createStyles(({ css }) => {
  return {
    searchForm: css`
      width: 100%;
      padding: 16px;
      padding-bottom: 0;
      ${'' /* margin-bottom: 16px; */}
      background-color: #fff;
    `,
    serachFormItem: css`
      width: 280px;
      padding-bottom: 16px;
    `,
    searchFormBut: css`
      padding-bottom: 16px;
    `,
  };
});
