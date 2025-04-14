import { List, Switch } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '@store/slices/theme';

const NavigationMode = () => {
  const dispatch = useDispatch();
  const { menuTrigger, breadcrumb, aloneBreadcrumb, fixedHeader, dynamicTitle } = useSelector(
    (state) => state.theme
  );
  const dataSource = [
    { key: 'menuTrigger', title: '触发器固定顶部', value: menuTrigger },
    { key: 'breadcrumb', title: '显示面包屑', value: breadcrumb },
    { key: 'aloneBreadcrumb', title: '独立面包屑', value: aloneBreadcrumb },
    { key: 'dynamicTitle', title: '动态标题', value: dynamicTitle },
    { key: 'fixedHeader', title: '固定Header', value: fixedHeader },
  ];

  const onChange = (e, key) => {
    dispatch(setTheme({ [key]: e }));
  };

  return (
    <List
      header={<p className="tw:mb-2 tw:text-[15px] tw:font-medium">导航模式</p>}
      dataSource={dataSource}
      split={false}
      //   loading={loading}
      renderItem={(item) => {
        return (
          <List.Item
            className="tw:w-full tw:border-none"
            actions={[
              <Switch
                key={item.key}
                size={'small'}
                checked={item.value}
                onChange={(e) => onChange(e, item.key)}
              />,
            ]}
          >
            <div>{item?.title}</div>
          </List.Item>
        );
      }}
    />
  );
};

export default NavigationMode;
