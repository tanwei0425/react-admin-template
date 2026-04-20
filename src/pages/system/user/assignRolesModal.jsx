import { useState, useEffect } from 'react';
import { Transfer, Spin } from 'antd';
import CustomModal from '@components/customModal';
import { useRoleAllListApi } from '@api/role';

const AssignRolesModal = ({ open, record, onCancel, onOk, confirmLoading }) => {
  const [form, setForm] = useState([]);
  const [roleOptions, setRoleOptions] = useState([]);

  const { loading, runAsync: runRoleAllList } = useRoleAllListApi();

  useEffect(() => {
    if (open) {
      runRoleAllList().then((res) => {
        if (res?.code === 200) {
          setRoleOptions(
            (res.data || []).map((item) => ({
              key: item.id,
              title: item.roleName,
            }))
          );
        }
      });
    }
  }, [open]);

  useEffect(() => {
    if (open && record) {
      setForm(record.roleIds || []);
    }
  }, [open, record]);

  const handleChange = (targetKeys) => {
    setForm(targetKeys);
  };

  const handleOk = () => {
    onOk?.({ id: record?.id, roleIds: form });
  };

  return (
    <CustomModal
      title={`分配角色 - ${record?.nickname || ''}`}
      open={open}
      width={600}
      draggable={true}
      confirmLoading={confirmLoading}
      onOk={handleOk}
      onCancel={onCancel}
    >
      <Spin spinning={loading}>
        <Transfer
          dataSource={roleOptions}
          targetKeys={form}
          onChange={handleChange}
          render={(item) => item.title}
          titles={['未分配', '已分配']}
          showSearch
          styles={{ container: { width: 250, height: 400 } }}
        />
      </Spin>
    </CustomModal>
  );
};

export default AssignRolesModal;
