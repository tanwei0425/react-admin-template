import { ColorPicker, Row, Col, Tooltip, List, Switch } from 'antd';
import { cyan, blue, volcano } from '@ant-design/colors';
import { useSelector } from 'react-redux';
import useSetSysTheme from '@hooks/useSetSysTheme';
import { useStyle } from './useStyle';
const recommend = [
  '#1890ff',
  '#13c2c2',
  '#f5222d',
  '#faad14',
  '#52c41a',
  '#ff5c93',
  '#e74c3c',
  '#a0d911',
  '#2f54eb',
  '#722ed1',
];
const ThemeColor = () => {
  const { styles } = useStyle();
  const { colorPrimary, weakMode, grayMode } = useSelector((state) => state.theme);
  const { setThemeSkin } = useSetSysTheme();
  const presets = [
    { label: '推荐', colors: recommend, key: 'recommend' },
    { label: '拂晓蓝', colors: blue, key: 'blue' },
    { label: '明青', colors: cyan, key: 'cyan' },
    { label: '火山', colors: volcano, key: 'volcano' },
  ];
  const dataSource = [
    { key: 'weakMode', title: '色弱模式', value: weakMode, show: true },
    { key: 'grayMode', title: '灰色模式', value: grayMode, show: true },
  ];
  const customPanelRender = (panel, { components: { Picker, Presets } }) => {
    return (
      <Row justify="space-between" wrap={false}>
        <Col span={14}>
          <Presets />
        </Col>
        <Col flex="auto">
          <Picker />
        </Col>
      </Row>
    );
  };
  const onChangeComplete = (value) => setThemeSkin({ colorPrimary: value.toHexString() });
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
    <>
      <div className="tw:flex tw:items-center tw:justify-between tw:pb-[15px]">
        <div>主题颜色</div>
        <Tooltip placement="left" title={colorPrimary}>
          <ColorPicker
            value={colorPrimary}
            placement={'left'}
            styles={{ popupOverlayInner: { width: 560 } }}
            presets={presets}
            defaultFormat="hex"
            disabledAlpha
            // showText
            panelRender={customPanelRender}
            onChangeComplete={onChangeComplete}
          />
        </Tooltip>
      </div>
      <List
        className={styles.themeListItem}
        dataSource={dataSource}
        split={false}
        //   loading={loading}
        renderItem={(item, index) => {
          return (
            item.show && (
              <List.Item
                className={`tw:w-full tw:border-none ${index !== 0 ? 'tw:!pt-1' : 'tw:!pt-0'}`}
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
    </>
  );
};

export default ThemeColor;
