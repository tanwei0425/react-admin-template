import { useState } from 'react';
import { Drawer, Space, Divider } from 'antd';
import { useStyle } from './useStyle';
import { ThemeSvg } from '@assets/icons';
import OverallStyle from '@layouts/admin-layout/theme/overallStyle';
import ThemeColor from '@layouts/admin-layout/theme/themeColor';
import NavigationMode from '@layouts/admin-layout/theme/navigationMode';

const Setting = () => {
  const [open, setOpen] = useState(false);
  const { styles } = useStyle();
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <ThemeSvg className={styles.themeSvg} onClick={showDrawer} />
      <Drawer
        title="系统风格设置"
        onClose={onClose}
        open={open}
        placement="right"
        width={300}
        destroyOnClose={true}
        closable={false}
        zIndex={1997}
      >
        {open && (
          <Space
            className={styles.themeSpace}
            split={<Divider className={styles.themeSpaceDivider} variant="dashed" />}
            direction={'vertical'}
            align={'start'}
            size={'large'}
          >
            <OverallStyle />
            <ThemeColor />
            <NavigationMode />
          </Space>
        )}
      </Drawer>
    </>
  );
};
export default Setting;
