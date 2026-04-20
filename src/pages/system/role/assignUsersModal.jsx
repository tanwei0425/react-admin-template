import { useState, useEffect } from 'react';
import { Transfer, Spin } from 'antd';
import CustomModal from '@components/customModal';
import { useUserAllListApi } from '@api/user';

const AssignUsersModal = ({ open, record, onCancel, onOk, confirmLoading }) => {
  const [form, setForm] = useState([]);
  const [userOptions, setUserOptions] = useState([]);

  const { loading, runAsync: runUserAllList } = useUserAllListApi();

  useEffect(() => {
    if (open) {
      runUserAllList().then((res) => {
        if (res?.code === 200) {
          setUserOptions(
            (res.data || []).map((item) => ({
              key: item.id,
              title: `${item.nickname}（${item.username}）`,
            }))
          );
        }
      });
    }
  }, [open]);

  useEffect(() => {
    if (open && record) {
      setForm(record.userIds || []);
    }
  }, [open, record]);

  const handleChange = (targetKeys) => {
    setForm(targetKeys);
  };

  const handleOk = () => {
    onOk?.({ id: record?.id, userIds: form });
  };

  return (
    <CustomModal
      title={`分配用户 - ${record?.roleName || ''}`}
      open={open}
      width={600}
      draggable={true}
      confirmLoading={confirmLoading}
      onOk={handleOk}
      onCancel={onCancel}
    >
      <Spin spinning={loading}>
        <Transfer
          dataSource={userOptions}
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

export default AssignUsersModal;
