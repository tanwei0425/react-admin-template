import { useRef, useState } from 'react';
import { Button } from 'antd';
import styles from './index.module.scss';
import CustomModal from '@/components/customModal';
import CustomDrawer from '@/components/customDrawer';
import FormDemo from './formDemo';
const Index = () => {
  const formRefModal = useRef();
  const formRefDrawer = useRef();
  const iniModalConifg = {
    title: '操作',
    open: false,
    width: 1100,
  };
  const [modalConfig, setModalConfig] = useState(iniModalConifg);
  const [visible, setVisible] = useState(false);
  const modalChange = async (title) => {
    setModalConfig({ ...modalConfig, title, open: true });
  };
  const onModalClose = () => {
    formRefModal.current?.resetFields();
    setModalConfig(iniModalConifg);
  };
  const onModalOk = async () => {
    formRefModal.current.validateFields().then(async (values) => {
      console.log(values, 'values');
    });
  };

  const drawerChange = () => setVisible(!visible);
  const onDrawerClose = () => {
    formRefDrawer.current?.resetFields();
    setVisible(false);
  };

  const OnDrawerOk = async () => {
    formRefDrawer.current.validateFields().then(async (values) => {
      console.log(values, 'values');
    });
  };

  return (
    <div className={styles.scssModuleDemo}>
      <Button onClick={() => modalChange('formModal')}>formModal</Button>
      <Button onClick={() => drawerChange('formDrawer')}>formDrawer</Button>
      <CustomModal {...modalConfig} draggable={true} onOk={onModalOk} onCancel={onModalClose}>
        <FormDemo name="formModal" formRef={formRefModal} />
      </CustomModal>
      <CustomDrawer
        title="formDrawer"
        width={1000}
        onClose={onDrawerClose}
        onClick={OnDrawerOk}
        placement="right"
        destroyOnClose={true}
        closable={false}
        visible={visible}
      >
        <FormDemo name="formDrawer" formRef={formRefDrawer} />
      </CustomDrawer>
    </div>
  );
};

export default Index;
