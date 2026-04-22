import { ColorPicker, Row, Col } from 'antd';
import { cyan, blue, volcano } from '@ant-design/colors';

const DEFAULT_PRESETS = [
  {
    label: '推荐',
    colors: [
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
    ],
    key: 'recommend',
  },
  { label: '拂晓蓝', colors: blue, key: 'blue' },
  { label: '明青', colors: cyan, key: 'cyan' },
  { label: '火山', colors: volcano, key: 'volcano' },
];



const Index = ({
  onChange,
  presets,
  disabledAlpha = true,
  format = 'hex',
  showText = true,
  showPresets = true,
  placement,
  styles: customStyles,
  panelRender,
  defaultPanelLayout = {},
  ...fieldProps
}) => {
  const {
    row = {},
    leftCol = {},
    rightCol = {},
  } = defaultPanelLayout;
  const handleChange = (color) => {
    const hex = color.toHexString();
    onChange?.(hex);
  };
  const defaultPanelRender = (_panel, { components: { Picker, Presets } }) => (
    <Row justify="space-between" wrap={false} {...row}>
      <Col span={14} {...leftCol}>
        <Presets />
      </Col>
      <Col flex="auto" {...rightCol}>
        <Picker />
      </Col>
    </Row>
  );
  const finalPresets = showPresets ? (presets || DEFAULT_PRESETS) : undefined;
  const finalPanelRender = showPresets ? (panelRender || defaultPanelRender) : panelRender;

  return (
    <ColorPicker
      onChange={handleChange}
      presets={finalPresets}
      defaultFormat={format}
      disabledAlpha={disabledAlpha}
      showText={showText}
      placement={placement}
      styles={customStyles}
      panelRender={finalPanelRender}
      {...fieldProps}
    />
  );
};

export default Index;
