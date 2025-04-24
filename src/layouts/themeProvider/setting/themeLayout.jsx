import { Tooltip } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import useSetSysTheme from '@hooks/useSetSysTheme';
import { useStyle } from './useStyle';
const ThemeLayout = () => {
  const { styles, cx } = useStyle();
  const { themeLayout } = useSelector((state) => state.theme);
  const { setThemeSkin } = useSetSysTheme();
  const onClick = (type) => {
    setThemeSkin({ themeLayout: type });
  };
  return (
    <div className={styles.themeLayout}>
      <Tooltip placement="top" key={'longitudinal'} title={'纵向'}>
        <div
          onClick={() => onClick('longitudinal')}
          className={cx(
            styles.themeLayoutItem,
            styles.themeLayoutVertical,
            themeLayout === 'longitudinal' && styles.themeLayoutActive
          )}
        >
          <div className={cx(styles.themeLayoutItemDark, styles.themeLayoutItemPrimary)}></div>
          <div className={styles.themeLayoutItemContainer}>
            <div
              className={cx(
                styles.themeLayoutItemLight,
                styles.themeLayoutItemPrimary,
                styles.themeLayoutItemPrimaryOpacity
              )}
            ></div>
            <div
              className={cx(
                styles.themeLayoutItemContent,
                styles.themeLayoutItemPrimary,
                styles.themeLayoutItemPrimaryOpacity
              )}
            ></div>
          </div>
          {themeLayout === 'longitudinal' && (
            <span
              role="img"
              aria-label="check-circle"
              className={cx(styles.themeLayoutAnticon, styles.themeLayoutAnticonCheckCircle)}
            >
              <CheckCircleFilled />
            </span>
          )}
        </div>
      </Tooltip>
      <Tooltip placement="top" key={'landscape'} title={'横向'}>
        <div
          onClick={() => onClick('landscape')}
          className={cx(
            styles.themeLayoutItem,
            styles.themeLayoutClassic,
            themeLayout === 'landscape' && styles.themeLayoutActive
          )}
        >
          <div className={cx(styles.themeLayoutItemLight, styles.themeLayoutItemPrimary)}></div>
          <div
            className={cx(
              styles.themeLayoutItemContent,
              styles.themeLayoutItemPrimary,
              styles.themeLayoutItemPrimaryOpacity
            )}
          ></div>
          {themeLayout === 'landscape' && (
            <span
              role="img"
              aria-label="check-circle"
              className={cx(styles.themeLayoutAnticon, styles.themeLayoutAnticonCheckCircle)}
            >
              <CheckCircleFilled />
            </span>
          )}
        </div>
      </Tooltip>
    </div>
  );
};

export default ThemeLayout;
