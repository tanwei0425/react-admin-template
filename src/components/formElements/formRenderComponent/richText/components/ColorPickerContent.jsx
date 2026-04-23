/**
 * 颜色选择器内容组件
 * 用于字体颜色和背景色选择
 * 直接点击触发器显示颜色面板，无需二次点击
 */
import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import ColorPicker from '@components/formElements/formRenderComponent/colorPicker';

const ColorPickerContent = ({ colors, onSelect, value, showClear = false, children }) => {
  // 预设颜色配置
  const presets = [
    {
      label: '常用颜色',
      colors: colors.filter((c) => c !== 'transparent'),
      key: 'common',
    },
  ];

  // 是否显示清除按钮（背景色支持透明色）
  const shouldShowClear = showClear || colors.includes('transparent');

  // 清除颜色节点
  const extraNode = shouldShowClear ? (
    <Button type="text" icon={<DeleteOutlined />} onClick={() => onSelect('transparent')} block>
      清除颜色
    </Button>
  ) : null;

  return (
    <ColorPicker
      value={value}
      presets={presets}
      onChange={onSelect}
      showText={false}
      disabledAlpha={false}
      extraNode={extraNode}
    >
      {children}
    </ColorPicker>
  );
};

export default ColorPickerContent;
