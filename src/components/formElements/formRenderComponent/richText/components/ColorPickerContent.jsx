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

  const showClear = colors.includes('transparent');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <ColorPicker
        value={value}
        presets={presets}
        onChange={onSelect}
        showText={false}
        styles={{ popupOverlayInner: { width: 400 } }}
        disabledAlpha={false}
        defaultPanelLayout={{ leftCol: { span: 8 } }}
        showPresets={true}
      />
      {showClear && (
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
            onClick={() => onSelect('transparent')}
          >
            清除颜色
          </div>
        </>
      )}
    </div>
  );
};

export default ColorPickerContent;
