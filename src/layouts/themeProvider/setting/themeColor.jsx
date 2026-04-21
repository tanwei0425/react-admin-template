import { Tooltip, Switch, Flex } from 'antd';
import { useSelector } from 'react-redux';
import useSetSysTheme from '@hooks/useSetSysTheme';
import ColorPicker from '@components/formElements/formRenderComponent/colorPicker';
import { useStyle } from './useStyle';

const ThemeColor = () => {
  const { styles } = useStyle();
  const { colorPrimary, weakMode, grayMode } = useSelector((state) => state.theme);
  const { setThemeSkin } = useSetSysTheme();

  const dataSource = [
    { key: 'weakMode', title: '色弱模式', value: weakMode, show: true },
    { key: 'grayMode', title: '灰色模式', value: grayMode, show: true },
  ];

  const handleChange = (hex) => {
    setThemeSkin({ colorPrimary: hex });
  };

  const onChange = (e, key) => {
    let data = { [key]: e };
    if (key === 'weakMode' && e) {
      data['grayMode'] = false;
    }
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
            placement="left"
            styles={{ popupOverlayInner: { width: 560 } }}
            onChange={handleChange}
            showText={false}
          />
        </Tooltip>
      </div>
      <Flex className={styles.themeListItem} vertical gap={4}>
        {dataSource
          .filter((item) => item.show)
          .map((item) => (
            <Flex key={item.key} justify="space-between" align="center" className="tw:!py-1">
              <div>{item?.title}</div>
              <Switch size={'small'} checked={item.value} onChange={(e) => onChange(e, item.key)} />
            </Flex>
          ))}
      </Flex>
    </>
  );
};

export default ThemeColor;
