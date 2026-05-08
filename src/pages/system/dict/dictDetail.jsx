import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Descriptions, Tag, Table } from 'antd';
import { tableColumnToDict } from '@utils';
import { useDictDataListApi } from '@api/dict';

const statusColorMap = { 1: 'green', 0: 'red' };

const DictDetail = ({ record }) => {
  const { dictData } = useSelector((state) => state.userInfo);
  const { loading, runAsync: runDataList } = useDictDataListApi();
  const [dataSource, setDataSource] = useState([]);

  const dictLabel = (dictKey, value) => tableColumnToDict(dictData[dictKey], value) || value;

  const columns = [
    {
      title: '字典标签',
      dataIndex: 'dictLabel',
      ellipsis: true,
    },
    {
      title: '字典值',
      dataIndex: 'dictValue',
      ellipsis: true,
    },
    {
      title: '排序',
      dataIndex: 'sort',
      width: 60,
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 60,
      render: (text) => <Tag color={statusColorMap[text]}>{dictLabel('dict_status', text)}</Tag>,
    },
  ];

  useEffect(() => {
    if (record?.dictType) {
      runDataList({ current: 1, pageSize: 100, dictType: record.dictType }).then((res) => {
        if (res?.code === 200) {
          setDataSource(res?.data?.list || []);
        }
      });
    }
  }, [record?.dictType]);

  return (
    <>
      <Descriptions column={2} bordered size="small">
        <Descriptions.Item label="字典名称">{record.dictName}</Descriptions.Item>
        <Descriptions.Item label="字典编码">{record.dictType}</Descriptions.Item>
        <Descriptions.Item label="排序">{record.sort}</Descriptions.Item>
        <Descriptions.Item label="状态">
          <Tag color={statusColorMap[record.status]}>{dictLabel('dict_status', record.status)}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="创建时间" span={2}>{record.createTime}</Descriptions.Item>
        <Descriptions.Item label="备注" span={2}>{record.remark}</Descriptions.Item>
      </Descriptions>
      <div style={{ marginTop: 16 }}>
        <div style={{ fontWeight: 600, marginBottom: 8 }}>字典项数据</div>
        <Table
          dataSource={dataSource}
          columns={columns}
          rowKey="id"
          loading={loading}
          size="small"
          pagination={false}
        />
      </div>
    </>
  );
};

export default DictDetail;
