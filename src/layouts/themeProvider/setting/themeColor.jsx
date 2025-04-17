import { ColorPicker, Row, Col } from 'antd';
import { cyan, blue, volcano } from '@ant-design/colors';
import { useSelector } from 'react-redux';
import useSetSysTheme from '@hooks/useSetSysTheme';
const data = [
  { title: '默认', color: 'rgb(0, 185, 107)' },
  { title: '拂晓蓝（默认）', color: 'rgb(24, 144, 255)' },
  { title: '薄暮', color: 'rgb(245, 34, 45)' },
  { title: '火山', color: 'rgb(250, 84, 28)' },
  { title: '日暮', color: 'rgb(250, 173, 20)' },
  { title: '明青', color: 'rgb(19, 194, 194)' },
  { title: '极光绿', color: 'rgb(82, 196, 26)' },
  { title: '极客蓝', color: 'rgb(47, 84, 235)' },
  { title: '酱紫', color: 'rgb(114, 46, 209)' },
];
const ThemeColor = () => {
  const { colorPrimary } = useSelector((state) => state.theme);
  const { setThemeSkin } = useSetSysTheme();
  const presets = [
    { label: '推荐', colors: data.map((item) => item.color), key: 'recommend' },
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
  const onChangeComplete = (value) => setThemeSkin({ colorPrimary: value.toCssString() });
  return (
    <div className="tw:flex tw:items-center tw:justify-between">
      <div className="tw:text-[15px] tw:font-medium">主题色</div>
      <ColorPicker
        value={colorPrimary}
        styles={{ popupOverlayInner: { width: 560 } }}
        presets={presets}
        defaultFormat="rgb"
        disabledAlpha
        showText
        panelRender={customPanelRender}
        onChangeComplete={onChangeComplete}
      />
    </div>
  );
};

export default ThemeColor;
