import { Tooltip } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import useSetSysTheme from '@hooks/useSetSysTheme';
import { useStyle } from './useStyle';
const OverallStyle = () => {
  const { styles, cx } = useStyle();
  const { overallStyle } = useSelector((state) => state.theme);
  const { setThemeSkin } = useSetSysTheme();
  const data = [
    { title: '暗色菜单', type: 'dark' },
    { title: '亮色菜单', type: 'light' },
  ];
  const onClick = (title, type) => {
    setThemeSkin({ overallStyle: type });
  };
  return (
    <div className="tw:flex">
      {data.map((val) => {
        return (
          <Tooltip placement="top" key={val.type} title={val?.title}>
            <div
              onClick={() => onClick(val.title, val.type)}
              className={cx(styles.overallStyleItem, val.type === 'dark' && styles.overallStyleItemDark)}
            >
              <span className={styles.overallStyleItemCheck}>
                <CheckCircleFilled style={overallStyle !== val.type ? { opacity: 0 } : {}} />
              </span>
            </div>
          </Tooltip>
        );
      })}
    </div>
  );
};

export default OverallStyle;
