import { useSelector } from 'react-redux';
import { Descriptions, Tag } from 'antd';
import { tableColumnToDict } from '@utils';

const statusColorMap = { '1': 'green', '0': 'red' };

const RoleDetail = ({ record }) => {
  const { dictData } = useSelector((state) => state.userInfo);

  const dictLabel = (dictKey, value) => tableColumnToDict(dictData[dictKey], value) || value;

  return (
    <Descriptions column={2} bordered size="small">
      <Descriptions.Item label="角色名称">{record.roleName}</Descriptions.Item>
      <Descriptions.Item label="角色编码">{record.roleCode}</Descriptions.Item>
      <Descriptions.Item label="角色类型">{dictLabel('role_type', record.roleType)}</Descriptions.Item>
      <Descriptions.Item label="排序">{record.sort}</Descriptions.Item>
      <Descriptions.Item label="状态">
        <Tag color={statusColorMap[record.status]}>{dictLabel('role_status', record.status)}</Tag>
      </Descriptions.Item>
      <Descriptions.Item label="创建时间">{record.createTime}</Descriptions.Item>
      <Descriptions.Item label="备注" span={2}>{record.remark || ''}</Descriptions.Item>
    </Descriptions>
  );
};

export default RoleDetail;
