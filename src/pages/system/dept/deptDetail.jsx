import { useSelector } from 'react-redux';
import { Descriptions, Tag } from 'antd';
import { tableColumnToDict } from '@utils';

const statusColorMap = { 1: 'green', 0: 'red' };

const DeptDetail = ({ record, flatList }) => {
  const { dictData } = useSelector((state) => state.userInfo);

  const dictLabel = (dictKey, value) => tableColumnToDict(dictData[dictKey], value) || value;

  const getParentName = () => {
    if (String(record.pid) === '0') return '顶级部门';
    const parent = (flatList || []).find((item) => String(item.id) === String(record.pid));
    return parent?.deptName || record.pid;
  };

  return (
    <Descriptions column={2} bordered size="small">
      <Descriptions.Item label="上级部门">{getParentName()}</Descriptions.Item>
      <Descriptions.Item label="部门名称">{record.deptName}</Descriptions.Item>
      <Descriptions.Item label="部门状态">
        <Tag color={statusColorMap[record.status]}>{dictLabel('dept_status', record.status)}</Tag>
      </Descriptions.Item>
      <Descriptions.Item label="排序">{record.sort}</Descriptions.Item>
      <Descriptions.Item label="负责人">{record.leader || ''}</Descriptions.Item>
      <Descriptions.Item label="联系电话">{record.phone || ''}</Descriptions.Item>
      <Descriptions.Item label="邮箱">{record.email || ''}</Descriptions.Item>
      <Descriptions.Item label="创建时间">{record.createTime}</Descriptions.Item>
      <Descriptions.Item label="备注" span={2}>
        {record.remark || ''}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default DeptDetail;
