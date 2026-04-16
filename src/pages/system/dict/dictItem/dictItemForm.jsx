import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import CustomForm, { FormItem, FormRenderComponent } from '@components/formElements';

const DictItemForm = ({ formRef, name, tableRecord, dictType }) => {
  const { dictData } = useSelector((state) => state.userInfo);

  const dictOptions = (dictKey) =>
    (dictData[dictKey] || []).map((item) => ({ key: item.key, value: item.value }));

  const formSchema = [
    {
      name: 'dictType',
      label: '字典编码',
      initialValue: dictType,
      rules: [{ required: true, whitespace: true, message: '字典编码不能为空' }],
      fieldProps: {
        componentType: 'input',
        disabled: true,
      },
    },
    {
      name: 'dictLabel',
      label: '字典标签',
      rules: [{ required: true, whitespace: true, message: '字典标签不能为空' }],
      fieldProps: {
        componentType: 'input',
        placeholder: '请输入字典标签',
      },
    },
    {
      name: 'dictValue',
      label: '字典值',
      rules: [{ required: true, whitespace: true, message: '字典值不能为空' }],
      fieldProps: {
        componentType: 'input',
        placeholder: '请输入字典值',
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
        min: 1,
      },
    },
    {
      name: 'status',
      label: '状态',
      initialValue: '1',
      rules: [{ required: true, message: '状态不能为空' }],
      fieldProps: {
        componentType: 'radio',
        options: dictOptions('dict_status'),
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

export default DictItemForm;
