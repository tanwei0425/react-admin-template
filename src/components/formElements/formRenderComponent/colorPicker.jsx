/**
 * 颜色选择器组件
 * 基于 Ant Design ColorPicker 封装，支持：
 * - 预设颜色配置
 * - 自定义触发器
 * - 自定义面板渲染
 * - 追加/覆盖默认预设
 * - 自定义左右布局
 */
import { ColorPicker, Row, Col, Divider } from 'antd';
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
 * 创建默认面板渲染函数
 * 左侧预设颜色 + 右侧自定义选色器 + 底部扩展节点
 * 支持自定义布局参数
 */
const createDefaultPanelRender = (extraNode, layout = {}) => {
  const { row = {}, leftCol = {}, rightCol = {} } = layout;
  const PanelRender = (_panel, { components: { Picker, Presets } }) => (
    <>
      <Row justify="space-between" wrap={false} {...row}>
        <Col span={14} {...leftCol}>
          <Presets />
        </Col>
        <Col flex="auto" {...rightCol}>
          <Picker />
        </Col>
      </Row>
      {extraNode && (
        <div style={{ textAlign: 'center' }}>
          <Divider style={{ margin: '8px 0 8px 0' }} />
          {extraNode}
        </div>
      )}
    </>
  );
  PanelRender.displayName = 'PanelRender';
  return PanelRender;
};

const Index = ({
  onChange,
  presets,
  disabledAlpha,
  format = 'hex',
  showText = true,
  showPresets = true,
  placement,
  styles: customStyles,
  panelRender,
  appendPresets = [],
  extraNode,
  defaultPanelLayout = {},
  children,
  ...fieldProps
}) => {
  const handleChange = (color) => {
    const hex = color.toHexString();
    onChange?.(hex);
  };

  // 合并预设：默认预设 + 追加预设
  const finalPresets = showPresets
    ? [...(presets || DEFAULT_PRESETS), ...appendPresets]
    : undefined;

  // 面板渲染：自定义 > 带扩展节点的默认 > undefined
  const finalPanelRender = showPresets
    ? (panelRender || createDefaultPanelRender(extraNode, defaultPanelLayout))
    : panelRender;

  return (
    <ColorPicker
      onChange={handleChange}
      presets={finalPresets}
      defaultFormat={format}
      disabledAlpha={disabledAlpha}
      showText={showText}
      placement={placement}
      styles={{ popupOverlayInner: { width: 560 }, ...customStyles }}
      panelRender={finalPanelRender}
      {...fieldProps}
    >
      {children}
    </ColorPicker>
  );
};

export default Index;
