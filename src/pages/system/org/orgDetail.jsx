import { useSelector } from 'react-redux';
import { Descriptions, Tag } from 'antd';
import { tableColumnToDict } from '@utils';

const statusColorMap = { 1: 'green', 0: 'red' };

const OrgDetail = ({ record }) => {
  const { dictData } = useSelector((state) => state.userInfo);

  const dictLabel = (dictKey, value) => tableColumnToDict(dictData[dictKey], value) || value;

  return (
    <Descriptions column={2} bordered size="small">
      <Descriptions.Item label="机构编码">{record.code}</Descriptions.Item>
      <Descriptions.Item label="机构名称">{record.name}</Descriptions.Item>
      <Descriptions.Item label="机构类型">{dictLabel('org_type', record.type)}</Descriptions.Item>
      <Descriptions.Item label="负责人">{record.leader}</Descriptions.Item>
      <Descriptions.Item label="联系电话">{record.phone}</Descriptions.Item>
      <Descriptions.Item label="状态">
        <Tag color={statusColorMap[record.status]}>{dictLabel('org_status', record.status)}</Tag>
      </Descriptions.Item>
      <Descriptions.Item label="创建时间" span={2}>
        {record.createTime}
      </Descriptions.Item>
      <Descriptions.Item label="备注" span={2}>
        {record.remark}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default OrgDetail;
