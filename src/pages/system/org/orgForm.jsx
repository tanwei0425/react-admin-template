import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import CustomForm, { FormItem, FormRenderComponent } from '@components/formElements';

const OrgForm = ({ formRef, name, modalType, tableRecord }) => {
  const { dictData } = useSelector((state) => state.userInfo);

  const dictOptions = (dictKey) =>
    (dictData[dictKey] || []).map((item) => ({ key: item.key, value: item.value }));

  const formSchema = [
    {
      name: 'code',
      label: '机构编码',
      rules: [
        { required: true, whitespace: true, message: '机构编码不能为空' },
        { pattern: /^[A-Za-z0-9_-]+$/, message: '只能包含字母、数字、下划线和短横线' },
      ],
      fieldProps: {
        componentType: 'input',
        placeholder: '请输入机构编码',
        disabled: modalType === 'update',
        maxLength: 50,
      },
    },
    {
      name: 'name',
      label: '机构名称',
      rules: [{ required: true, whitespace: true, message: '机构名称不能为空' }],
      fieldProps: {
        componentType: 'input',
        placeholder: '请输入机构名称',
        maxLength: 50,
      },
    },
    {
      name: 'type',
      label: '机构类型',
      initialValue: '2',
      rules: [{ required: true, message: '机构类型不能为空' }],
      fieldProps: {
        componentType: 'select',
        options: dictOptions('org_type'),
        placeholder: '请选择机构类型',
      },
    },
    {
      name: 'leader',
      label: '负责人',
      rules: [{ required: true, whitespace: true, message: '负责人不能为空' }],
      fieldProps: {
        componentType: 'input',
        placeholder: '请输入负责人姓名',
        maxLength: 20,
      },
    },
    {
      name: 'phone',
      label: '联系电话',
      rules: [
        { required: true, message: '联系电话不能为空' },
        { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确' },
      ],
      fieldProps: {
        componentType: 'input',
        placeholder: '请输入联系电话',
      },
    },
    {
      name: 'status',
      label: '状态',
      initialValue: '1',
      rules: [{ required: true, message: '状态不能为空' }],
      fieldProps: {
        componentType: 'radio',
        options: dictOptions('org_status'),
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

export default OrgForm;
