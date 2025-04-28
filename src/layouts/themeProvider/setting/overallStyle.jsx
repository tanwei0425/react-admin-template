import { Tooltip } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import useSetSysTheme from '@hooks/useSetSysTheme';
import { useStyle } from './useStyle';
const OverallStyle = () => {
  const { styles, cx } = useStyle();
  const { overallStyle, themeLayout } = useSelector((state) => state.theme);
  const { setThemeSkin } = useSetSysTheme();
  const data = [
    { title: themeLayout === 'transverse' ? '暗色顶部' : '暗色菜单', type: 'dark' },
    { title: themeLayout === 'transverse' ? '亮色顶部' : '亮色菜单', type: 'light' },
  ];
  const onClick = (type) => {
    setThemeSkin({ overallStyle: type });
  };
  console.log(themeLayout, 'themeLayout');
  return (
    <div className="tw:flex">
      {data.map((val) => {
        return (
          <Tooltip placement="top" key={val.type} title={val?.title}>
            <div
              onClick={() => onClick(val.type)}
              className={cx(
                styles.overallStyleItem,
                themeLayout === 'transverse' && styles.transverseOverallStyleItem,
                val.type === 'dark' && styles.overallStyleItemDark
              )}
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
