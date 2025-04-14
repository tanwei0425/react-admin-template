import { Tag, Tooltip } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { setTheme } from '@store/slices/theme';
// import useSetSysTheme from '@/hooks/useSetSysTheme';

const ThemeColor = () => {
  const dispatch = useDispatch();
  const { colorPrimary } = useSelector((state) => state.theme);
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

  const onClick = (title, color) => {
    dispatch(setTheme({ colorPrimary: color }));
  };

  return (
    <>
      <p className="tw:mb-2 tw:text-[15px] tw:font-medium">主题色</p>
      <div className="tw:flex tw:pt-[12px] tw:flex-wrap">
        {data.map((val) => (
          <Tooltip placement="top" key={val.title} title={val.title}>
            <Tag
              onClick={() => onClick(val.title, val.color)}
              className={'tw:w-[23px] tw:h-[23px] tw:cursor-pointer tw:!mb-[8px]'}
              color={val.color}
            >
              <CheckOutlined
                style={colorPrimary !== val.color ? { opacity: 0 } : {}}
                className={'tw:ml-[-2.5px]'}
              />
            </Tag>
          </Tooltip>
        ))}
      </div>
    </>
  );
};

export default ThemeColor;
