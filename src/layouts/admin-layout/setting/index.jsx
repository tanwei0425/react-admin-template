import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, Modal, Checkbox } from 'antd';
import { useStyle } from './useStyle';
import { useLogoutApi } from '@api/login';
import { SettingSvg } from '@assets/icons';
import useClearSysConfig from '@hooks/useClearSysConfig';
import { setTheme } from '@store/slices/theme';
const Setting = () => {
  const dispatch = useDispatch();
  const { systemStyle } = useSelector((state) => state.theme);
  const { styles } = useStyle();
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { loading, runAsync } = useLogoutApi();
  const clearSysConfig = useClearSysConfig();
  const items = [
    {
      label: 'tanwei',
    },
    {
      label: '我是角色1',
    },
    {
      label: 'tanwei425@gmail.com',
    },
    {
      type: 'divider',
    },
    {
      key: 'systemStyle',
      label: <Checkbox checked={systemStyle}>系统风格设置</Checkbox>,
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: '退出登录',
    },
  ];
  const handleOk = async () => {
    const res = await runAsync();
    if (res.code === 200) {
      clearSysConfig();
      setOpen(false);
    }
  };
  const handleMenuClick = ({ key }) => {
    if (key === 'systemStyle') {
      dispatch(setTheme({ systemStyle: !systemStyle }));
    } else if (key === 'logout') {
      setDropdownOpen(false);
      setOpen(true);
    }
  };
  const handleOpenChange = (nextOpen, info) => {
    if (info.source === 'trigger' || nextOpen) {
      setDropdownOpen(false);
    }
  };
  return (
    <>
      <Dropdown
        menu={{
          items,
          onClick: handleMenuClick,
        }}
        open={dropdownOpen}
        onOpenChange={handleOpenChange}
        placement="bottomLeft"
        trigger={['click']}
        overlayClassName={styles.settingDropdown}
      >
        <SettingSvg onClick={() => setDropdownOpen(true)} className={styles.settingIcon} />
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
