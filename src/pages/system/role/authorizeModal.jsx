import { useState, useEffect, useMemo } from 'react';
import { Tree, Spin, Space, Checkbox, Card } from 'antd';
import CustomModal from '@components/customModal';
import { useMenuTreeApi } from '@api/menu';

const getAllKeys = (data) => {
  const keys = [];
  const walk = (nodes) => {
    nodes?.forEach((node) => {
      keys.push(node.key);
      if (node.children) walk(node.children);
    });
  };
  walk(data);
  return keys;
};

const AuthorizeModal = ({ open, record, onCancel, onOk, confirmLoading }) => {
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [halfCheckedKeys, setHalfCheckedKeys] = useState([]);
  const [treeData, setTreeData] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState([]);

  const { loading, runAsync: runMenuTree } = useMenuTreeApi();

  const allKeys = useMemo(() => getAllKeys(treeData), [treeData]);

  const selectAllChecked = checkedKeys.length > 0 && checkedKeys.length === allKeys.length;
  const selectAllIndeterminate = checkedKeys.length > 0 && checkedKeys.length < allKeys.length;
  const expandAllChecked = expandedKeys.length > 0 && expandedKeys.length === allKeys.length;
  const expandAllIndeterminate = expandedKeys.length > 0 && expandedKeys.length < allKeys.length;

  useEffect(() => {
    if (open) {
      runMenuTree().then((res) => {
        if (res?.code === 200) {
          const data = res.data || [];
          setTreeData(data);
          setExpandedKeys(getAllKeys(data));
        }
      });
    }
  }, [open]);

  useEffect(() => {
    if (open && record) {
      setCheckedKeys(record.menuIds || []);
    }
  }, [open, record]);

  const onCheck = (keys, info) => {
    setCheckedKeys(keys);
    setHalfCheckedKeys(info.halfCheckedKeys);
  };

  const onExpand = (keys) => {
    setExpandedKeys(keys);
  };

  const onSelectAllChange = (e) => {
    if (e.target.checked) {
      setCheckedKeys(allKeys);
      setHalfCheckedKeys([]);
    } else {
      setCheckedKeys([]);
      setHalfCheckedKeys([]);
    }
  };

  const onExpandAllChange = (e) => {
    setExpandedKeys(e.target.checked ? allKeys : []);
  };

  const handleOk = () => {
    /**
     * id 角色id
     * menuIds 全角
     * halfMenuIds 半角
     */
    onOk?.({ id: record?.id, menuIds: checkedKeys, halfMenuIds: halfCheckedKeys });
  };

  return (
    <CustomModal
      title={`授权 - ${record?.roleName || ''}`}
      open={open}
      width={500}
      draggable={true}
      confirmLoading={confirmLoading}
      onOk={handleOk}
      onCancel={onCancel}
    >
      <Spin spinning={loading}>
        {treeData.length > 0 && (
          <>
            <Space style={{ marginBottom: 15 }}>
              <Checkbox
                checked={selectAllChecked}
                indeterminate={selectAllIndeterminate}
                onChange={onSelectAllChange}
              >
                全选/全不选
              </Checkbox>
              <Checkbox
                checked={expandAllChecked}
                indeterminate={expandAllIndeterminate}
                onChange={onExpandAllChange}
              >
                全展开/全折叠
              </Checkbox>
            </Space>
            <Card size="small" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
              <Tree
                checkable
                expandedKeys={expandedKeys}
                onExpand={onExpand}
                checkedKeys={checkedKeys}
                onCheck={onCheck}
                treeData={treeData}
              />
            </Card>
          </>
        )}
      </Spin>
    </CustomModal>
  );
};

export default AuthorizeModal;
