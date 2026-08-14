import { Card, Row, Col, Typography, Table, Tabs, Tag } from 'antd';
import { Line, Pie, Column } from '@ant-design/charts';
import { useDashboard } from './hooks/useDashboard.jsx';
import StatCard from './components/StatCard';
import { salesRankColumns, salesRankData, storeColumns, storeData } from './data';

const { Text } = Typography;

// 统一卡片标题样式
const cardTitleStyle = {
  fontSize: 15,
  fontWeight: 600,
  color: '#262626',
};

// 统一卡片 body 样式
const cardBodyStyle = {
  padding: '16px 24px 24px',
};

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

  const renderSalesRankColumns = salesRankColumns.map((col) => {
    if (col.key === 'range') {
      return {
        ...col,
        render: (v) => (
          <Text type={v > 0 ? 'success' : 'danger'}>
            {v > 0 ? '+' : ''}
            {v}%
          </Text>
        ),
      };
    }
    if (col.key === 'rank') {
      return {
        ...col,
        render: (v) => {
          let color = '#8c8c8c';
          let background = '#f5f5f5';
          if (v === 1) {
            color = '#fff';
            background = '#f5222d';
          } else if (v === 2) {
            color = '#fff';
            background = '#fa8c16';
          } else if (v === 3) {
            color = '#fff';
            background = '#faad14';
          }
          return (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 22,
                height: 22,
                borderRadius: '50%',
                background,
                color,
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              {v}
            </span>
          );
        },
      };
    }
    return col;
  });

  const renderStoreColumns = storeColumns.map((col) => {
    if (col.key === 'rank') {
      return {
        ...col,
        render: (v) => {
          let color = '#8c8c8c';
          let background = '#f5f5f5';
          if (v === 1) {
            color = '#fff';
            background = '#f5222d';
          } else if (v === 2) {
            color = '#fff';
            background = '#fa8c16';
          } else if (v === 3) {
            color = '#fff';
            background = '#faad14';
          }
          return (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 22,
                height: 22,
                borderRadius: '50%',
                background,
                color,
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              {v}
            </span>
          );
        },
      };
    }
    if (col.key === 'sales') {
      return { ...col, render: (v) => <span style={{ fontWeight: 500 }}>¥{v.toLocaleString()}</span> };
    }
    return col;
  });

  const renderTabItems = tabItems.map((item) => ({
    ...item,
    children:
      item.key === '1' ? (
        <Table
          columns={renderSalesRankColumns}
          dataSource={salesRankData}
          pagination={false}
          size="small"
          loading={loading}
          rowKey="rank"
          scroll={{ y: 380 }}
        />
      ) : (
        <Table
          columns={renderSalesRankColumns}
          dataSource={salesRankData.map((d) => ({ ...d, count: Math.floor(d.count * 0.8) }))}
          pagination={false}
          size="small"
          loading={loading}
          rowKey="rank"
          scroll={{ y: 380 }}
        />
      ),
  }));

  return (
    <div style={{ padding: 0, overflow: 'hidden', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* 顶部统计卡片 */}
      <Row gutter={[16, 16]}>
        {statCardsData.map((card, index) => (
          <Col xs={24} sm={12} key={index}>
            <StatCard card={card} loading={loading} getMiniChart={getMiniChart} />
          </Col>
        ))}
      </Row>

      {/* 销售趋势 */}
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={24}>
          <Card
            title={<span style={cardTitleStyle}>销售趋势</span>}
            loading={loading}
            extra={
              <Text type="secondary" style={{ fontSize: 13 }}>
                单位：万元
              </Text>
            }
            styles={{ body: { ...cardBodyStyle, height: 350 } }}
            style={{ borderRadius: 8 }}
          >
            <Line {...salesConfig} style={{ height: 280 }} />
          </Card>
        </Col>
      </Row>

      {/* 销售额 + 类别占比 */}
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={12}>
          <Card
            title={<span style={cardTitleStyle}>销售额</span>}
            loading={loading}
            styles={{ body: { ...cardBodyStyle, height: 350 } }}
            style={{ borderRadius: 8, height: '100%' }}
          >
            <Pie {...salesPieConfig} style={{ height: 280 }} />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card
            title={<span style={cardTitleStyle}>销售额类别占比</span>}
            loading={loading}
            styles={{ body: { ...cardBodyStyle, height: 350 } }}
            style={{ borderRadius: 8, height: '100%' }}
          >
            <Pie {...pieConfig} style={{ height: 280 }} />
          </Card>
        </Col>
      </Row>

      {/* 热门搜索 */}
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={24}>
          <Card
            title={<span style={cardTitleStyle}>热门搜索</span>}
            loading={loading}
            extra={
              <Tag color="blue" style={{ borderRadius: 10, padding: '0 8px' }}>
                TOP 7
              </Tag>
            }
            styles={{ body: { ...cardBodyStyle, height: 350 } }}
            style={{ borderRadius: 8 }}
          >
            <Column {...barConfig} />
          </Card>
        </Col>
      </Row>

      {/* 排名表格 */}
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={12}>
          <Card
            title={<span style={cardTitleStyle}>销售额排名</span>}
            loading={loading}
            styles={{ body: { padding: '0 20px 16px', height: 500 } }}
            style={{ borderRadius: 8, height: '100%' }}
          >
            <Tabs items={renderTabItems} size="small" />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card
            title={<span style={cardTitleStyle}>门店销售额排名</span>}
            loading={loading}
            styles={{ body: { ...cardBodyStyle, height: 500 } }}
            style={{ borderRadius: 8, height: '100%' }}
          >
            <Table
              columns={renderStoreColumns}
              dataSource={storeData}
              pagination={false}
              size="small"
              loading={loading}
              rowKey="rank"
              scroll={{ y: 410 }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Index;
