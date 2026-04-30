import { Card, Row, Col, Typography, Table, Tabs } from 'antd';
import { Line, Pie, Column } from '@ant-design/charts';
import { useDashboard } from './hooks/useDashboard.jsx';
import StatCard from './components/StatCard';
import { salesRankColumns, salesRankData, storeColumns, storeData } from './data';

const { Text } = Typography;

const Index = () => {
  const {
    loading,
    salesConfig,
    pieConfig,
    salesPieConfig,
    barConfig,
    tabItems,
    getMiniChart,
    statCardsData,
  } = useDashboard();

  const renderSalesRankColumns = salesRankColumns.map(col => {
    if (col.key === 'range') {
      return { ...col, render: (v) => <Text type={v > 0 ? 'success' : 'danger'}>{v > 0 ? '+' : ''}{v}%</Text> };
    }
    return col;
  });

  const renderStoreColumns = storeColumns.map(col => {
    if (col.key === 'sales') {
      return { ...col, render: (v) => `¥${v.toLocaleString()}` };
    }
    return col;
  });

  const renderTabItems = tabItems.map((item) => ({
    ...item,
    children: item.key === '1'
      ? <Table columns={renderSalesRankColumns} dataSource={salesRankData} pagination={false} size="small" loading={loading} rowKey="rank" scroll={{ y: 380 }} />
      : <Table columns={renderSalesRankColumns} dataSource={salesRankData.map(d => ({ ...d, count: Math.floor(d.count * 0.8) }))} pagination={false} size="small" loading={loading} rowKey="rank" scroll={{ y: 380 }} />,
  }));

  return (
    <div style={{ padding: 0, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Row gutter={[16, 16]}>
        {statCardsData.map((card, index) => (
          <Col xs={24} sm={12} key={index}>
            <StatCard card={card} loading={loading} getMiniChart={getMiniChart} />
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={24}>
          <Card
            title={<span style={{ fontSize: 16, fontWeight: 500 }}>销售趋势</span>}
            loading={loading}
            extra={<Text type="secondary">单位：万元</Text>}
            styles={{ body: { padding: '12px 24px 24px', height: 350 } }}
          >
            <Line {...salesConfig} style={{ height: 300 }} />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={12}>
          <Card
            title={<span style={{ fontSize: 16, fontWeight: 500 }}>销售额</span>}
            loading={loading}
            styles={{ body: { padding: '12px 24px 24px', height: 350 } }}
          >
            <Pie {...salesPieConfig} style={{ height: 300 }} />
          </Card>
        </Col>
        <Col span={12}>
          <Card
            title={<span style={{ fontSize: 16, fontWeight: 500 }}>销售额类别占比</span>}
            loading={loading}
            styles={{ body: { padding: '12px 24px 24px', height: 350 } }}
          >
            <Pie {...pieConfig} style={{ height: 300 }} />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={24}>
          <Card
            title={<span style={{ fontSize: 16, fontWeight: 500 }}>热门搜索</span>}
            loading={loading}
            extra={<Text type="secondary">TOP 7</Text>}
            styles={{ body: { padding: '12px 24px 24px', height: 350 } }}
          >
            <Column {...barConfig} />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16, marginBottom: 16 }}>
        <Col span={12}>
          <Card
            title={<span style={{ fontSize: 16, fontWeight: 500 }}>销售额排名</span>}
            loading={loading}
            styles={{ body: { padding: '0 20px 20px 20px', height: 500 } }}
          >
            <Tabs items={renderTabItems} />
          </Card>
        </Col>
        <Col span={12}>
          <Card
            title={<span style={{ fontSize: 16, fontWeight: 500 }}>门店销售额排名</span>}
            loading={loading}
            styles={{ body: { padding: '12px 20px 20px', height: 500 } }}
          >
            <Table columns={renderStoreColumns} dataSource={storeData} pagination={false} size="small" loading={loading} rowKey="rank" scroll={{ y: 430 }} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Index;