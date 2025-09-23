import { useRef, useState } from 'react';
import { Button, Divider } from 'antd';
import styles from './index.module.scss';
import CustomModal from '@components/customModal';
import CustomDrawer from '@components/customDrawer';
import FormDemo from './formDemo';
import TableDemo from './tableDemo';
const Index = () => {
  const formRefModal = useRef();
  const formRefDrawer = useRef();
  const iniModalConifg = {
    title: '操作',
    open: false,
    width: 1000,
  };
  const [modalConfig, setModalConfig] = useState(iniModalConifg);
  const [open, setOpen] = useState(false);
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

  const drawerChange = () => setOpen(!open);
  const onDrawerClose = () => {
    formRefDrawer.current?.resetFields();
    setOpen(false);
  };

  const OnDrawerOk = async () => {
    formRefDrawer.current.validateFields().then(async (values) => {
      console.log(values, 'values');
    });
  };

  return (
    <div className={styles.scssModuleDemo}>
      <Divider orientation="left">{'modal表单'}</Divider>
      <Button onClick={() => modalChange('formModal')}>formModal</Button>
      <CustomModal {...modalConfig} draggable={true} onOk={onModalOk} onCancel={onModalClose}>
        <FormDemo name="formModal" formRef={formRefModal} />
      </CustomModal>
      <Divider orientation="left">{'drawer表单'}</Divider>
      <Button onClick={() => drawerChange('formDrawer')}>formDrawer</Button>
      <CustomDrawer
        title="formDrawer"
        width={1000}
        onClose={onDrawerClose}
        onOk={OnDrawerOk}
        placement="right"
        closable={false}
        open={open}
      >
        <FormDemo name="formDrawer" formRef={formRefDrawer} />
      </CustomDrawer>
      <TableDemo />
    </div>
  );
};

export default Index;
