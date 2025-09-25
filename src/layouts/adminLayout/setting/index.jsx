import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Dropdown, Checkbox, App } from 'antd';
import { useStyle } from './useStyle';
import { useLogoutApi, useEditPwdApi } from '@api/login';
import { SettingSvg } from '@assets/icons';
import CustomModal from '@components/customModal';
import useClearSysConfig from '@hooks/useClearSysConfig';
import useSetSysTheme from '@hooks/useSetSysTheme';
import EditPwd from './editPwd';
const iniModalConifg = {
  title: '操作',
  okText: '确定并保存',
  open: false,
  width: 600,
};
const Setting = () => {
  const { styles, cx } = useStyle();
  const editPwdFormRef = useRef();
  const { message } = App.useApp();
  const { systemStyle, themeLayout, overallStyle } = useSelector((state) => state.theme);
  const { setThemeSkin } = useSetSysTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState(iniModalConifg);
  const [modalType, setModalType] = useState();
  const apiEditPwd = useEditPwdApi();
  const apiLogout = useLogoutApi();
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
      key: 'editPwd',
      label: '修改密码',
    },
    {
      key: 'logout',
      label: '退出登录',
    },
  ];

  const handleMenuClick = ({ key }) => {
    if (key === 'systemStyle') {
      setThemeSkin({ systemStyle: !systemStyle });
    } else if (key === 'logout' || key === 'editPwd') {
      let title = '操作';
      let okText = '确定并保存';
      switch (key) {
        case 'editPwd':
          title = '修改密码';
          break;
        case 'logout':
          title = '退出登录';
          okText = '退出登录';
          break;
        default:
          break;
      }
      setDropdownOpen(false);
      setModalType(key);
      setModalConfig({ ...modalConfig, title, okText, open: true });
    }
  };
  const handleOpenChange = (nextOpen, info) => {
    if (info.source === 'trigger' || nextOpen) {
      setDropdownOpen(false);
    }
  };
  const handleOk = async () => {
    if (modalType === 'editPwd') {
      editPwdFormRef.current.validateFields().then(async (values) => {
        const res = await apiEditPwd.runAsync(values);
        if (res.code === 200) {
          message.success('操作成功');
          handleClose();
        }
      });
    } else if (modalType === 'logout') {
      const res = await apiLogout.runAsync();
      if (res.code === 200) {
        clearSysConfig();
        handleClose();
      }
    }
  };
  const handleClose = () => {
    if (modalType === 'editPwd') {
      editPwdFormRef.current?.resetFields();
    }
    setModalType();
    setModalConfig(iniModalConifg);
  };
  const modalChildrenRender = () => {
    if (modalType === 'editPwd') {
      return <EditPwd name="editPwdForm" formRef={editPwdFormRef} />;
    } else if (modalType === 'logout') {
      return <div>是否确定退出登录？</div>;
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
        <SettingSvg
          className={cx(
            styles.settingIcon,
            themeLayout === 'transverse' && overallStyle === 'dark' && styles.transverseSettingIcon
          )}
          onClick={() => setDropdownOpen(true)}
        />
      </Dropdown>
      <CustomModal
        onOk={handleOk}
        onCancel={handleClose}
        confirmLoading={apiLogout.loading || apiEditPwd.loading}
        showContentLoading={modalType !== 'logout'}
        {...modalConfig}
      >
        {modalChildrenRender()}
      </CustomModal>
    </>
  );
};
export default Setting;
