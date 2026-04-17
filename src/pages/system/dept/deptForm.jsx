import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import CustomForm, { FormItem, FormRenderComponent } from '@components/formElements';
import { arrayToTree } from '@utils';

const DeptForm = ({ formRef, name, modalType, tableRecord, flatList }) => {
  const { dictData } = useSelector((state) => state.userInfo);

  const dictOptions = (dictKey) =>
    (dictData[dictKey] || []).map((item) => ({ key: item.key, value: item.value }));

  const parentTreeData = (() => {
    const tree = arrayToTree(flatList || []);
    const convertToTreeData = (nodes) =>
      nodes.map((node) => {
        const item = {
          title: node.deptName,
          value: String(node.id),
          key: String(node.id),
        };
        if (node.children?.length) {
          item.children = convertToTreeData(node.children);
        }
        return item;
      });
    return [
      {
        title: '顶级部门',
        value: '0',
        key: '0',
        children: convertToTreeData(tree),
      },
    ];
  })();

  const formSchema = [
    {
      name: 'pid',
      label: '上级部门',
      initialValue: '0',
      rules: [{ required: true, message: '上级部门不能为空' }],
      fieldProps: {
        componentType: 'treeSelect',
        treeData: parentTreeData,
        placeholder: '请选择上级部门',
        treeDefaultExpandAll: false,
      },
    },
    {
      name: 'deptName',
      label: '部门名称',
      rules: [{ required: true, whitespace: true, message: '部门名称不能为空' }],
      fieldProps: {
        componentType: 'input',
        placeholder: '请输入部门名称',
        maxLength: 50,
      },
    },
    {
      name: 'status',
      label: '部门状态',
      initialValue: '1',
      rules: [{ required: true, message: '部门状态不能为空' }],
      fieldProps: {
        componentType: 'radio',
        options: dictOptions('dept_status'),
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
        max: 9999,
      },
    },
    {
      name: 'leader',
      label: '负责人',
      fieldProps: {
        componentType: 'input',
        placeholder: '请输入负责人',
        maxLength: 20,
      },
    },
    {
      name: 'phone',
      label: '联系电话',
      fieldProps: {
        componentType: 'input',
        placeholder: '请输入联系电话',
        maxLength: 20,
      },
    },
    {
      name: 'email',
      label: '邮箱',
      fieldProps: {
        componentType: 'input',
        placeholder: '请输入邮箱',
        maxLength: 50,
      },
    },
    {
      name: 'remark',
      label: '备注',
      fieldProps: {
        componentType: 'textArea',
        placeholder: '请输入备注',
        maxLength: 200,
      },
    },
  ];

  useEffect(() => {
    if (formRef?.current && tableRecord && Object.keys(tableRecord).length > 0) {
      if (modalType === 'update') {
        const values = { ...tableRecord, pid: String(tableRecord.pid ?? '0') };
        formRef.current.setFieldsValue(values);
      } else if (modalType === 'create') {
        formRef.current.setFieldsValue({ pid: String(tableRecord.pid ?? '0') });
      }
    }
  }, [tableRecord, formRef, modalType]);

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

export default DeptForm;
