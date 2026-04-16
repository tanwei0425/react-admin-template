import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import CustomForm, { FormItem, FormRenderComponent } from '@components/formElements';

const UserForm = ({ formRef, name, modalType, tableRecord }) => {
  const { dictData } = useSelector((state) => state.userInfo);

  const dictOptions = (dictKey) =>
    (dictData[dictKey] || []).map((item) => ({ key: item.key, value: item.value }));

  const formSchema = [
    {
      name: 'username',
      label: '登录账号',
      rules: [{ required: true, whitespace: true, message: '登录账号不能为空' }],
      fieldProps: {
        componentType: 'input',
        placeholder: '请输入登录账号',
        disabled: modalType === 'update',
      },
    },
    {
      name: 'nickname',
      label: '用户名称',
      rules: [{ required: true, whitespace: true, message: '用户名称不能为空' }],
      fieldProps: {
        componentType: 'input',
        placeholder: '请输入用户名称',
      },
    },
    {
      name: 'gender',
      label: '性别',
      initialValue: '1',
      rules: [{ required: true, message: '性别不能为空' }],
      fieldProps: {
        componentType: 'radio',
        options: dictOptions('gender'),
      },
    },
    {
      name: 'phone',
      label: '手机号',
      rules: [
        { required: true, message: '手机号不能为空' },
        { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确' },
      ],
      fieldProps: {
        componentType: 'input',
        placeholder: '请输入手机号',
      },
    },
    {
      name: 'email',
      label: '邮箱',
      rules: [
        { type: 'email', message: '邮箱格式不正确' },
      ],
      fieldProps: {
        componentType: 'input',
        placeholder: '请输入邮箱',
      },
    },
    {
      name: 'department',
      label: '部门',
      rules: [{ required: true, message: '部门不能为空' }],
      fieldProps: {
        componentType: 'select',
        options: dictOptions('department'),
        placeholder: '请选择部门',
      },
    },
    {
      name: 'roleIds',
      label: '角色',
      rules: [{ required: true, message: '角色不能为空' }],
      fieldProps: {
        componentType: 'select',
        mode: 'multiple',
        options: dictOptions('role'),
        placeholder: '请选择角色',
      },
    },
    {
      name: 'status',
      label: '状态',
      initialValue: '1',
      rules: [{ required: true, message: '状态不能为空' }],
      fieldProps: {
        componentType: 'radio',
        options: dictOptions('user_status'),
      },
    },
    {
      name: 'remark',
      label: '备注',
      fieldProps: {
        componentType: 'textArea',
        placeholder: '请输入备注',
        maxLength: 100,
      },
    },
  ];

  useEffect(() => {
    if (formRef?.current && tableRecord && Object.keys(tableRecord).length > 0) {
      formRef.current.setFieldsValue(tableRecord);
    }
  }, [tableRecord, formRef]);

  return (
    <CustomForm name={name} ref={formRef}>
      {formSchema.map((val) => {
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

export default UserForm;
