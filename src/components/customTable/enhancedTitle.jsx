import { Row, Col, Space } from 'antd';

const enhancedTitle = ({ title, toolBarRender }) => {
  return (
    <div className="table-title-wrapper">
      <Row justify="space-between" align="middle" wrap={false}>
        <Col flex="none">{typeof title === 'function' ? title() : title}</Col>
        <Col flex="auto">
          <Row justify="end" wrap={false}>
            <Space size="middle" align="center">
              {Array.isArray(toolBarRender) ? toolBarRender.map((item) => item) : toolBarRender}
            </Space>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default enhancedTitle;
