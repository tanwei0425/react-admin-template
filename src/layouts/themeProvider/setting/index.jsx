import { useState } from 'react';
import { Space, Divider } from 'antd';
import { useStyle } from './useStyle';
import { ThemeSvg } from '@assets/icons';
import CustomDrawer from '@components/customDrawer';

import OverallStyle from '@layouts/themeProvider/setting/overallStyle';
import ThemeColor from '@layouts/themeProvider/setting/themeColor';
import NavigationMode from '@layouts/themeProvider/setting/navigationMode';

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
      <CustomDrawer title="系统风格设置" open={open} width={300} onClose={onClose} showConfirmButton={false}>
        {open && (
          <Space
            className={styles.themeSpace}
            split={<Divider className={styles.themeSpaceDivider} variant="dashed" />}
            direction={'vertical'}
            align={'start'}
            size={'middle'}
          >
            <OverallStyle />
            <ThemeColor />
            <NavigationMode />
          </Space>
        )}
      </CustomDrawer>
    </>
  );
};
export default Setting;
