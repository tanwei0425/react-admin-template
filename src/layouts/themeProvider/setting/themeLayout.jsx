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
    let data = { themeLayout: type };
    // transverse 布局的时候独立面包屑只能为true，菜单手风琴和菜单触发器固定顶部为true禁用
    if (type === 'transverse') {
      data['aloneBreadcrumb'] = true;
      data['menuTrigger'] = true;
      data['menuAccordionMode'] = true;
    }
    setThemeSkin(data);
  };
  return (
    <div className={styles.themeLayout}>
      <Tooltip placement="top" title={'纵向'}>
        <div
          onClick={() => onClick('vertical')}
          className={cx(
            styles.themeLayoutItem,
            styles.themeLayoutVertical,
            themeLayout === 'vertical' && styles.themeLayoutActive
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
          {themeLayout === 'vertical' && (
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
      <Tooltip placement="top" title={'横向'}>
        <div
          onClick={() => onClick('transverse')}
          className={cx(
            styles.themeLayoutItem,
            styles.themeLayoutClassic,
            themeLayout === 'transverse' && styles.themeLayoutActive
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
          {themeLayout === 'transverse' && (
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
