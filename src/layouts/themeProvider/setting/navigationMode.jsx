import { List, Switch } from 'antd';
import { useSelector } from 'react-redux';
import useSetSysTheme from '@hooks/useSetSysTheme';

const NavigationMode = () => {
  const {
    menuTrigger,
    breadcrumb,
    showFooter,
    watermark,
    grayMode,
    weakMode,
    aloneBreadcrumb,
    fixedHeader,
    dynamicTitle,
  } = useSelector((state) => state.theme);
  const { setThemeSkin } = useSetSysTheme();
  const dataSource = [
    { key: 'menuTrigger', title: '触发器固定顶部', value: menuTrigger },
    { key: 'breadcrumb', title: '显示面包屑', value: breadcrumb },
    { key: 'aloneBreadcrumb', title: '独立面包屑', value: aloneBreadcrumb },
    { key: 'dynamicTitle', title: '动态标题', value: dynamicTitle },
    { key: 'fixedHeader', title: '固定Header', value: fixedHeader },
    { key: 'watermark', title: '水印', value: watermark },
    { key: 'showFooter', title: '页脚', value: showFooter },
    { key: 'weakMode', title: '色弱模式', value: weakMode },
    { key: 'grayMode', title: '灰色模式', value: grayMode },
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
        );
      }}
    />
  );
};

export default NavigationMode;
