import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import CustomForm, { FormItem, FormRenderComponent } from '@components/formElements';

const RoleForm = ({ formRef, name, modalType, tableRecord }) => {
  const { dictData } = useSelector((state) => state.userInfo);

  const dictOptions = (dictKey) =>
    (dictData[dictKey] || []).map((item) => ({ key: item.key, value: item.value }));

  const formSchema = [
    {
      name: 'roleName',
      label: '角色名称',
      rules: [{ required: true, whitespace: true, message: '角色名称不能为空' }],
      fieldProps: {
        componentType: 'input',
        placeholder: '请输入角色名称',
      },
    },
    {
      name: 'roleCode',
      label: '角色编码',
      rules: [{ required: true, whitespace: true, message: '角色编码不能为空' }],
      fieldProps: {
        componentType: 'input',
        placeholder: '请输入角色编码',
        disabled: modalType === 'update',
      },
    },
    {
      name: 'roleType',
      label: '角色类型',
      initialValue: '1',
      rules: [{ required: true, message: '角色类型不能为空' }],
      fieldProps: {
        componentType: 'select',
        options: dictOptions('role_type'),
        placeholder: '请选择角色类型',
      },
    },
    {
      name: 'sort',
      label: '排序',
      initialValue: 1,
      rules: [{ required: true, message: '排序不能为空' }],
      fieldProps: {
        componentType: 'inputNumber',
        placeholder: '请输入排序',
        min: 0,
      },
    },
    {
      name: 'status',
      label: '状态',
      initialValue: '1',
      rules: [{ required: true, message: '状态不能为空' }],
      fieldProps: {
        componentType: 'radio',
        options: dictOptions('role_status'),
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

export default RoleForm;
