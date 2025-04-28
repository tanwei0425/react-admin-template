import { List, Switch } from 'antd';
import { useSelector } from 'react-redux';
import useSetSysTheme from '@hooks/useSetSysTheme';

const NavigationMode = () => {
  const {
    themeLayout,
    menuTrigger,
    breadcrumb,
    showFooter,
    watermark,
    grayMode,
    weakMode,
    aloneBreadcrumb,
    menuAccordionMode,
    fixedHeader,
    dynamicTitle,
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
    { key: 'weakMode', title: '色弱模式', value: weakMode, show: true },
    { key: 'grayMode', title: '灰色模式', value: grayMode, show: true },
  ];
  const onChange = (e, key) => {
    let data = { [key]: e };
    // 色弱和灰色模式互斥
    if (key === 'weakMode' && e) {
      data['grayMode'] = false;
    }
    // 色弱和灰色模式互斥
    if (key === 'grayMode' && e) {
      data['weakMode'] = false;
    }
    setThemeSkin(data);
  };

  return (
    <List
      dataSource={dataSource}
      split={false}
      //   loading={loading}
      renderItem={(item, index) => {
        return (
          item.show && (
            <List.Item
              className={`tw:w-full tw:border-none ${index !== 0 ? 'tw:!pt-2' : 'tw:!pt-0'}`}
              actions={[
                <Switch
                  key={item.key}
                  size={'small'}
                  checked={item.value}
                  onChange={(e) => onChange(e, item.key)}
                />,
              ]}
            >
              <div>{item?.title}</div>
            </List.Item>
          )
        );
      }}
    />
  );
};

export default NavigationMode;
