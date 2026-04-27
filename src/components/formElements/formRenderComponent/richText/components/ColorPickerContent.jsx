/**
 * 颜色选择器内容组件
 * 用于字体颜色和背景色选择
 * 直接点击按钮显示颜色面板，无需二次点击
 */
import { useState, useCallback } from 'react';
import { Button } from 'antd';
import ColorPicker from '@components/formElements/formRenderComponent/colorPicker';

const ColorPickerContent = ({ colors, onSelect, value, icon, active }) => {
  const [open, setOpen] = useState(false);

  const presets = [
    {
      label: '常用颜色',
      colors: colors.filter((c) => c !== 'transparent'),
      key: 'common',
    },
  ];

  const handleOpenChange = useCallback((nextOpen) => {
    setOpen(nextOpen);
  }, []);

  return (
    <ColorPicker
      open={open}
      onOpenChange={handleOpenChange}
      value={value || undefined}
      presets={presets}
      defaultPanelLayout={{
        leftCol: { span: 9 },
      }}
      styles={{ popupOverlayInner: { width: 400 } }}
      onChange={onSelect}
      showText={false}
      format="hex"
    >
      <Button type={active ? 'primary' : 'text'} size="small" icon={icon} />
    </ColorPicker>
  );
};

export default ColorPickerContent;
