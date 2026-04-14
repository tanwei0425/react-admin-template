import CustomForm, { FormItem, FormRenderComponent } from '@components/formElements';
import { G_PASSWORD_PATTERN, G_PASSWORD_PATTERN_MESSAGE } from '@config';

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 18 },
};
const Index = ({ formRef, name }) => {
  const formSchema = [
    {
      name: 'oldPassword',
      label: '旧密码',
      rules: [{ required: true, whitespace: true, message: '旧密码不能为空' }],
      fieldProps: {
        componentType: 'input',
        placeholder: '请输入旧密码',
      },
    },
    {
      name: 'password',
      label: '新密码',
      rules: [
        { required: true, whitespace: true, message: '新密码不能为空' },
        {
          pattern: G_PASSWORD_PATTERN,
          message: G_PASSWORD_PATTERN_MESSAGE,
        },
      ],
      fieldProps: {
        componentType: 'input',
        placeholder: '请输入新密码',
      },
    },
    {
      name: 'confirmPassword',
      label: '确认新密码',
      rules: [
        { required: true, whitespace: true, message: '确认新密码不能为空' },
        {
          pattern: G_PASSWORD_PATTERN,
          message: G_PASSWORD_PATTERN_MESSAGE,
        },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue('password') === value) {
              return Promise.resolve();
            }
            return Promise.reject(new Error('两次输入的新密码不一致'));
          },
        }),
      ],
      fieldProps: {
        componentType: 'input',
        placeholder: '请输入确认新密码',
      },
    },
  ];

  return (
    <CustomForm name={name} ref={formRef} {...formItemLayout}>
      {formSchema?.map((val) => {
        const { fieldProps, ...restFiled } = val;
        return (
          <FormItem key={val.name} {...restFiled}>
            <FormRenderComponent {...fieldProps} />
          </FormItem>
        );
      })}
    </CustomForm>
  );
};

export default Index;
