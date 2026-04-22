import ColorPicker from '@components/formElements/formRenderComponent/colorPicker';
import { Divider } from 'antd';

const ColorPickerContent = ({ colors, onSelect, value }) => {
  const presets = [
    {
      label: '常用颜色',
      colors: colors.filter((c) => c !== 'transparent'),
      key: 'common',
    },
  ];

  const handleChange = (hex) => {
    onSelect(hex);
  };

  const handleClear = () => {
    if (colors.includes('transparent')) {
      onSelect('transparent');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <ColorPicker
        value={value}
        presets={presets}
        onChange={handleChange}
        showText={false}
        styles={{ popupOverlayInner: { width: 400 } }}
        disabledAlpha={false}
        defaultPanelLayout={{
          leftCol: { span: 8 },
        }}
        showPresets={true}
      />
      {colors.includes('transparent') && (
        <>
          <Divider style={{ margin: '4px 0' }} />
          <div
            style={{
              padding: '4px 8px',
              cursor: 'pointer',
              border: '1px dashed #d9d9d9',
              borderRadius: 4,
              textAlign: 'center',
              fontSize: 12,
            }}
            onClick={handleClear}
          >
            清除颜色
          </div>
        </>
      )}
    </div>
  );
};

export default ColorPickerContent;
