import { Tooltip } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { setTheme } from '@store/slices/theme';
import { useStyle } from './useStyle';
// import useSetSysTheme from '@/hooks/useSetSysTheme';
const OverallStyle = () => {
  const dispatch = useDispatch();
  const { styles, cx } = useStyle();
  const { overallStyle } = useSelector((state) => state.theme);
  const data = [
    { title: '暗色菜单', type: 'dark' },
    { title: '亮色菜单', type: 'light' },
  ];
  const onClick = (title, type) => {
    dispatch(setTheme({ overallStyle: type }));
  };
  return (
    <>
      <p className="tw:mb-2 tw:text-[15px] tw:font-medium">整体风格设置</p>
      <div className="tw:flex tw:pt-[12px]">
        {data.map((val) => {
          return (
            <Tooltip placement="top" key={val.type} title={val?.title}>
              <div
                onClick={() => onClick(val.title, val.type)}
                className={cx(styles.overallStyleItem, val.type === 'dark' && styles.overallStyleItemDark)}
              >
                <span className={styles.overallStyleItemCheck}>
                  <CheckOutlined style={overallStyle !== val.type ? { opacity: 0 } : {}} />
                </span>
              </div>
            </Tooltip>
          );
        })}
      </div>
    </>
  );
};

export default OverallStyle;
