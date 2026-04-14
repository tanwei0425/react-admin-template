import { useSelector } from 'react-redux';
import { Descriptions, Tag } from 'antd';
import { tableColumnToDict } from '@utils';

const statusColorMap = { '1': 'green', '0': 'red' };

const UserDetail = ({ record }) => {
  const { dictData } = useSelector((state) => state.userInfo);

  const dictLabel = (dictKey, value) => tableColumnToDict(dictData[dictKey], value) || value;

  return (
    <Descriptions column={2} bordered size="small">
      <Descriptions.Item label="登录账号">{record.username}</Descriptions.Item>
      <Descriptions.Item label="用户名称">{record.nickname}</Descriptions.Item>
      <Descriptions.Item label="性别">{dictLabel('gender', record.gender)}</Descriptions.Item>
      <Descriptions.Item label="手机号">{record.phone}</Descriptions.Item>
      <Descriptions.Item label="邮箱" span={2}>{record.email}</Descriptions.Item>
      <Descriptions.Item label="部门">{dictLabel('department', record.department)}</Descriptions.Item>
      <Descriptions.Item label="角色">{dictLabel('role', record.role)}</Descriptions.Item>
      <Descriptions.Item label="状态">
        <Tag color={statusColorMap[record.status]}>{dictLabel('user_status', record.status)}</Tag>
      </Descriptions.Item>
      <Descriptions.Item label="创建时间">{record.createTime}</Descriptions.Item>
      <Descriptions.Item label="备注" span={2}>{record.remark || '-'}</Descriptions.Item>
    </Descriptions>
  );
};

export default UserDetail;
