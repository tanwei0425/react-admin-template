import { ColorPicker, Row, Col, Tooltip } from 'antd';
import { cyan, blue, volcano } from '@ant-design/colors';
import { useSelector } from 'react-redux';
import useSetSysTheme from '@hooks/useSetSysTheme';
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
  const { colorPrimary } = useSelector((state) => state.theme);
  const { setThemeSkin } = useSetSysTheme();
  const presets = [
    { label: '推荐', colors: recommend, key: 'recommend' },
    { label: '拂晓蓝', colors: blue, key: 'blue' },
    { label: '明青', colors: cyan, key: 'cyan' },
    { label: '火山', colors: volcano, key: 'volcano' },
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
  return (
    <div className="tw:flex tw:items-center tw:justify-between">
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
  );
};

export default ThemeColor;
