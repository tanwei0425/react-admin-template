import { Switch, Flex } from 'antd';
import { useSelector } from 'react-redux';
import useSetSysTheme from '@hooks/useSetSysTheme';
import { useStyle } from './useStyle';
const NavigationMode = () => {
  const { styles } = useStyle();
  const {
    themeLayout,
    menuTrigger,
    breadcrumb,
    showFooter,
    watermark,
    aloneBreadcrumb,
    menuAccordionMode,
    fixedHeader,
    dynamicTitle,
    breadcrumbIcon,
  } = useSelector((state) => state.theme);
  const { setThemeSkin } = useSetSysTheme();
  const dataSource = [
    { key: 'breadcrumb', title: '显示面包屑', value: breadcrumb, show: true },
    {
      key: 'aloneBreadcrumb',
      title: '独立面包屑',
      value: aloneBreadcrumb,
      show: themeLayout === 'vertical',
    },
    { key: 'breadcrumbIcon', title: '面包屑图标', value: breadcrumbIcon, show: true },
    { key: 'menuTrigger', title: '触发器固定顶部', value: menuTrigger, show: themeLayout === 'vertical' },
    {
      key: 'menuAccordionMode',
      title: '菜单手风琴',
      value: menuAccordionMode,
      show: themeLayout === 'vertical',
    },
    { key: 'dynamicTitle', title: '动态标题', value: dynamicTitle, show: true },
    { key: 'fixedHeader', title: '固定Header', value: fixedHeader, show: true },
    { key: 'watermark', title: '水印', value: watermark, show: true },
    { key: 'showFooter', title: '页脚', value: showFooter, show: true },
  ];
  const onChange = (e, key) => setThemeSkin({ [key]: e });

  return (
    <Flex className={styles.themeListItem} vertical gap={4}>
      {dataSource
        .filter((item) => item.show)
        .map((item) => (
          <Flex key={item.key} justify="space-between" align="center" className='tw:!py-1'>
            <div>{item?.title}</div>
            <Switch
              size={'small'}
              checked={item.value}
              onChange={(e) => onChange(e, item.key)}
            />
          </Flex>
        ))}
    </Flex>
  );
};

export default NavigationMode;
