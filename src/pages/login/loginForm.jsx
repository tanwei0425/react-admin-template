import { Button, Form, Input, Row, Col, Spin } from 'antd';
import { UserOutlined, LockOutlined, VerifiedOutlined } from '@ant-design/icons';
import { setLocalStorageItem } from '@utils';
import { useStyle } from './useStyle';
import { useCaptchaApi, useLoginApi } from '@api/login';

const Index = () => {
  const [form] = Form.useForm();
  const { styles } = useStyle();
  const { data, loading, run } = useCaptchaApi();
  const { loading: loginLoading, runAsync: loginRunAsync } = useLoginApi();
  const onFinish = async (values) => {
    const reqData = {
      username: values.username,
      password: values.password,
      code: values.code,
      uuid: data?.data?.uuid,
    };
    const res = await loginRunAsync(reqData);
    if (res.code === 200) {
      setLocalStorageItem('token', res.data.token);
      // 直接href跳转，不用单独写请求用户信息了
      window.location.href = '/';
    } else {
      run();
    }
  };
  return (
    <Form
      form={form}
      size="large"
      name="loginForm"
      onFinish={onFinish}
      initialValues={{
        username: 'tanwei',
        password: '123456',
        code: '2',
      }}
      style={{
        maxWidth: 600,
      }}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            whitespace: true,
            message: '账号不能为空',
          },
        ]}
      >
        <Input placeholder="请输入账号" addonBefore={<UserOutlined />} autoComplete="off" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            whitespace: true,
            message: '密码不能为空',
          },
        ]}
      >
        <Input.Password placeholder="请输入密码" addonBefore={<LockOutlined />} autoComplete="off" />
      </Form.Item>
      <Form.Item extra="点击右侧验证码可以刷新验证码">
        <Row gutter={8}>
          <Col span={16}>
            <Form.Item
              name="code"
              noStyle
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: '验证码不能为空',
                },
              ]}
            >
              <Input placeholder="请输入验证码" addonBefore={<VerifiedOutlined />} autoComplete="off" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Spin spinning={loading}>
              <span
                className={styles.captchaImg}
                onClick={() => run()}
                dangerouslySetInnerHTML={{
                  __html: data?.data?.captcha,
                }}
              ></span>
            </Spin>
          </Col>
        </Row>
      </Form.Item>
      <Form.Item>
        <Button block type="primary" loading={loginLoading} htmlType="submit">
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};
export default Index;
