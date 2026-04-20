import { useSelector } from 'react-redux';
import { Descriptions, Tag } from 'antd';
import { tableColumnToDict } from '@utils';

const statusColorMap = { 1: 'green', 0: 'red' };
const logTypeColorMap = { 1: 'blue', 2: 'green', 3: 'orange', 4: 'purple' };

const LogDetail = ({ record }) => {
  const { dictData } = useSelector((state) => state.userInfo);

  const dictLabel = (dictKey, value) => tableColumnToDict(dictData[dictKey], value) || value;

  return (
    <Descriptions column={2} bordered size="small">
      <Descriptions.Item label="日志 ID">{record.id}</Descriptions.Item>
      <Descriptions.Item label="操作标题">{record.title}</Descriptions.Item>
      <Descriptions.Item label="日志类型">
        <Tag color={logTypeColorMap[record.logType]}>{dictLabel('log_type', record.logType)}</Tag>
      </Descriptions.Item>
      <Descriptions.Item label="执行状态">
        <Tag color={statusColorMap[record.status]}>{dictLabel('log_status', record.status)}</Tag>
      </Descriptions.Item>
      <Descriptions.Item label="操作模块">{record.moduleName}</Descriptions.Item>
      <Descriptions.Item label="操作类型">{record.operationName}</Descriptions.Item>
      <Descriptions.Item label="请求方式">{record.requestMethod}</Descriptions.Item>
      <Descriptions.Item label="耗时">{record.duration}ms</Descriptions.Item>
      <Descriptions.Item label="请求 URL" span={2}>
        {record.requestUrl}
      </Descriptions.Item>
      <Descriptions.Item label="请求 IP">{record.requestIp}</Descriptions.Item>
      <Descriptions.Item label="操作地点">{record.requestLocation}</Descriptions.Item>
      <Descriptions.Item label="浏览器">{record.browser}</Descriptions.Item>
      <Descriptions.Item label="操作系统">{record.os}</Descriptions.Item>
      <Descriptions.Item label="操作人员">{record.operatorName}</Descriptions.Item>
      <Descriptions.Item label="操作时间">{record.createTime}</Descriptions.Item>
      <Descriptions.Item label="请求参数" span={2}>
        <pre
          style={{
            margin: 0,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-all',
            maxHeight: 200,
            overflow: 'auto',
          }}
        >
          {record.requestParams || ''}
        </pre>
      </Descriptions.Item>
      {record.status === '0' && (
        <Descriptions.Item label="错误信息" span={2}>
          <span style={{ color: '#ff4d4f' }}>{record.errorMsg || ''}</span>
        </Descriptions.Item>
      )}
    </Descriptions>
  );
};

export default LogDetail;
