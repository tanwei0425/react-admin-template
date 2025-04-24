import { useState } from 'react';
import { Space, Divider } from 'antd';
import { useStyle } from './useStyle';
import { ThemeSvg } from '@assets/icons';
import { ProductOutlined, FireOutlined, LaptopOutlined } from '@ant-design/icons';
import CustomDrawer from '@components/customDrawer';
import ThemeLayout from '@layouts/themeProvider/setting/themeLayout';
import OverallStyle from '@layouts/themeProvider/setting/overallStyle';
import ThemeColor from '@layouts/themeProvider/setting/themeColor';
import NavigationMode from '@layouts/themeProvider/setting/navigationMode';

const Setting = () => {
  const [open, setOpen] = useState(false);
  const { styles, cx } = useStyle();
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <ThemeSvg className={styles.themeSvg} onClick={showDrawer} />
      <CustomDrawer title="系统风格设置" open={open} width={280} onClose={onClose} showConfirmButton={false}>
        {open && (
          <Space className={styles.themeSpace} direction={'vertical'} align={'start'} size={'middle'}>
            <Divider className={cx(styles.themeSpaceDivider, styles.themeSpaceDividerFirst)}>
              <ProductOutlined className="tw:pr-2" />
              布局样式
            </Divider>
            <ThemeLayout />
            <Divider className={styles.themeSpaceDivider}>
              <ProductOutlined className="tw:pr-2" />
              主题风格
            </Divider>
            <OverallStyle />
            <Divider className={styles.themeSpaceDivider}>
              <FireOutlined className="tw:pr-2" />
              全局主题
            </Divider>
            <ThemeColor />
            <Divider className={styles.themeSpaceDivider}>
              <LaptopOutlined className="tw:pr-2" />
              界面设置
            </Divider>
            <NavigationMode />
          </Space>
        )}
      </CustomDrawer>
    </>
  );
};
export default Setting;
