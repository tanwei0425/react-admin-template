import { useState } from 'react';
import { Dropdown, Modal } from 'antd';
import { useStyle } from './useStyle';
import { useLogoutApi } from '@api/login';

import { SettingSvg } from '@assets/icons';
const Setting = () => {
  const { styles } = useStyle();
  const [open, setOpen] = useState(false);
  const { loading, run } = useLogoutApi();
  const logout = () => {
    setOpen(true);
  };
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
      onClick: logout,
    },
  ];
  const handleOk = async () => {
    await run();
    setOpen(false);
  };
  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
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
        title="Title"
        open={open}
        onOk={handleOk}
        confirmLoading={loading}
        onCancel={handleCancel}
      >
        <div>是否确定退出系统？</div>
      </Modal>
    </>
  );
};
export default Setting;
