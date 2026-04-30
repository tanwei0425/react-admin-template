import { Card, Typography, Progress, Tooltip, Skeleton } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, QuestionCircleOutlined } from '@ant-design/icons';

const { Text } = Typography;

const StatCard = ({ card, loading, getMiniChart }) => {
  const renderMiddleContent = () => {
    if (card.type === 'trend') {
      return (
        <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-start' }}>
          <div style={{ marginRight: 20 }}>
            <Text type="secondary" style={{ fontSize: 12 }}>周同比</Text>
            <Text style={{ fontSize: 14, marginLeft: 6 }} type={card.weekTrend > 0 ? 'success' : 'danger'}>
              {card.weekTrend > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />} {Math.abs(card.weekTrend)}%
            </Text>
          </div>
          <div>
            <Text type="secondary" style={{ fontSize: 12 }}>日同比</Text>
            <Text style={{ fontSize: 14, marginLeft: 6 }} type={card.dayTrend > 0 ? 'success' : 'danger'}>
              {card.dayTrend > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />} {Math.abs(card.dayTrend)}%
            </Text>
          </div>
        </div>
      );
    }
    if (card.type === 'area' || card.type === 'column') {
      return <div style={{ height: 40 }}>{getMiniChart(card.type)}</div>;
    }
    if (card.type === 'progress') {
      return <Progress percent={78} style={{ marginTop: 25 }} showInfo={false} strokeColor={{
        '0%': '#108ee9',
        '100%': '#87d068',
      }} />;
    }
    return null;
  };

  if (loading) {
    return (
      <Card styles={{ body: { padding: '16px' } }}>
        <Skeleton active paragraph={{ rows: 3 }} />
      </Card>
    );
  }

  return (
    <Card
      styles={{ body: { padding: '5px 10px', height: 210 } }}
      style={{ overflow: 'hidden' }}
      hoverable
    >
      <div style={{ padding: '12px 16px', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: 48 }}>
        <Text type="secondary" style={{ fontSize: 16 }}>{card.title}</Text>
        <Tooltip title={card.tip}>
          <QuestionCircleOutlined style={{ fontSize: 16, color: '#8c8c8c', cursor: 'pointer' }} />
        </Tooltip>
      </div>
      <div style={{ padding: '16px', borderBottom: '1px solid #f0f0f0', height: 110 }}>
        <div style={{ fontSize: 28, fontWeight: 600, lineHeight: 1.2, marginBottom: 6 }}>{card.value}</div>
        {renderMiddleContent()}
      </div>
      <div style={{ padding: '12px 16px', minHeight: 44 }}>
        <Text type="secondary" style={{ fontSize: 14 }}>{card.footer}</Text>
        <Text style={{ fontSize: 14, marginLeft: 8 }}>{card.daily}</Text>
      </div>
    </Card>
  );
};

export default StatCard;
