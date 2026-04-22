/**
 * 颜色选择器组件
 * 基于 Ant Design ColorPicker 封装，支持：
 * - 预设颜色配置
 * - 自定义触发器
 * - 自定义面板渲染
 * - 追加/覆盖默认预设
 */
import { ColorPicker, Row, Col, Divider, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { cyan, blue, volcano } from '@ant-design/colors';

// 默认预设颜色
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

/**
 * 默认面板渲染
 * 支持追加预设和清空按钮
 */
const defaultPanelRender = (onClear, showClearBtn) => (_panel, { components: { Picker, Presets } }) => (
  <div style={{ minWidth: 280 }}>
    <Presets />
    {showClearBtn && (
      <>
        <Divider style={{ margin: '8px 0' }} />
        <Button type="text" icon={<DeleteOutlined />} onClick={onClear} block>
          清除颜色
        </Button>
      </>
    )}
  </div>
);

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
  onClear,
  showClearBtn = false,
  appendPresets = [],
  children,
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

  // 合并预设：默认预设 + 追加预设
  const finalPresets = showPresets
    ? [...(presets || DEFAULT_PRESETS), ...appendPresets]
    : undefined;

  // 面板渲染：自定义 > 带清空按钮的默认 > undefined
  const finalPanelRender = showPresets
    ? (panelRender || defaultPanelRender(onClear, showClearBtn))
    : panelRender;

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
    >
      {children}
    </ColorPicker>
  );
};

export default Index;
