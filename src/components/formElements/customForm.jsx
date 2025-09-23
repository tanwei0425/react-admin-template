// import React, { useImperativeHandle } from 'react';
import React from 'react';
import { Form } from 'antd';

// 默认布局配置
const defaultConfig = {
  labelCol: { span: 3 },
  wrapperCol: { span: 19 },
};

// 使用React.forwardRef以支持ref转发
const Index = React.forwardRef(
  ({ children, name = 'CustomFormName', ...restProps }, ref) => {
    const [form] = Form.useForm();
    // 暴露有限的方法给ref
    // useImperativeHandle(ref, () => ({
    //   submit: () => form.submit(),
    //   validateFields: () => form.validateFields(),
    //   resetFields: () => form.resetFields(),
    //   getFieldsValue: () => form.getFieldsValue(),
    // }));
    return (
      <Form form={form} ref={ref} name={name} {...defaultConfig} {...restProps}>
        {children}
      </Form>
    );
  }
);

// 直接从Form导出常用组件和方法
export const FormItem = Form.Item;
export const FormList = Form.List;

// 设置显示名称便于调试
Index.displayName = 'CustomFormComponents';

// 默认导出优化后的Form组件
export default Index;
