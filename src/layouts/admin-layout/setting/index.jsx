import { useState } from 'react';
import { Dropdown, Modal } from 'antd';
import { useStyle } from './useStyle';
import { useLogoutApi } from '@api/login';
import { SettingSvg } from '@assets/icons';
import useClearSysConfig from '@hooks/useClearSysConfig';
const Setting = () => {
  const { styles } = useStyle();
  const [open, setOpen] = useState(false);
  const { loading, runAsync } = useLogoutApi();
  const clearSysConfig = useClearSysConfig();
  const items = [
    {
      label: 'tanwei',
      key: '0',
    },
    {
      label: '我是角色1',
      key: '1',
    },
    {
      label: 'tanwei425@gmail.com',
      key: '2',
    },
    {
      type: 'divider',
    },
    {
      label: '退出登录',
      key: '4',
      onClick: () => setOpen(true),
    },
  ];
  const handleOk = async () => {
    const res = await runAsync();
    if (res.code === 200) {
      clearSysConfig({});
      setOpen(false);
    }
  };
  return (
    <>
      <Dropdown
        menu={{
          items,
        }}
        placement="bottomLeft"
        trigger={['click']}
        overlayClassName={styles.settingDropdown}
      >
        <SettingSvg className={styles.settingIcon} />
      </Dropdown>
      <Modal
        title="退出登录"
        open={open}
        onOk={handleOk}
        confirmLoading={loading}
        onCancel={() => setOpen(false)}
      >
        <div>是否确定退出登录？</div>
      </Modal>
    </>
  );
};
export default Setting;
