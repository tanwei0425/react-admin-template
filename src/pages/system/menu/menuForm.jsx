import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CustomForm, { FormItem, FormRenderComponent } from '@components/formElements';
import { arrayToTree } from '@utils';

const FIELD_VISIBILITY = {
  pid: ['1', '2', '3'],
  menuType: ['1', '2', '3'],
  name: ['1', '2', '3'],
  status: ['1', '2', '3'],
  isShow: ['1', '2'],
  sort: ['1', '2', '3'],
  path: ['1', '2'],
  icon: ['1', '2'],
  cmpPath: ['2'],
  permission: ['2', '3'],
  remark: ['1', '2', '3'],
};

const MenuForm = ({ formRef, name, modalType, tableRecord, flatList }) => {
  const { dictData } = useSelector((state) => state.userInfo);
  const [currentMenuType, setCurrentMenuType] = useState(tableRecord?.menuType || '1');

  const dictOptions = (dictKey) =>
    (dictData[dictKey] || []).map((item) => ({ key: item.key, value: item.value }));

  const parentTreeData = (() => {
    const tree = arrayToTree(flatList || []);
    const convertToTreeData = (nodes) =>
      nodes.map((node) => {
        const item = {
          title: node.name,
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
        title: '顶级菜单',
        value: '0',
        key: '0',
        children: convertToTreeData(tree),
      },
    ];
  })();

  const handleMenuTypeChange = (e) => {
    const newType = e.target.value;
    setCurrentMenuType(newType);
    if (formRef?.current) {
      const fieldsToClear = Object.entries(FIELD_VISIBILITY)
        .filter(([, types]) => !types.includes(newType))
        .map(([fieldName]) => fieldName);
      const clearValues = {};
      fieldsToClear.forEach((field) => {
        clearValues[field] = undefined;
      });
      formRef.current.setFieldsValue(clearValues);
    }
  };

  const allFields = [
    {
      name: 'pid',
      label: '上级菜单',
      initialValue: '0',
      rules: [{ required: true, message: '上级菜单不能为空' }],
      fieldProps: {
        componentType: 'treeSelect',
        treeData: parentTreeData,
        placeholder: '请选择上级菜单',
        treeDefaultExpandAll: false,
      },
    },
    {
      name: 'menuType',
      label: '菜单类型',
      initialValue: '1',
      rules: [{ required: true, message: '菜单类型不能为空' }],
      fieldProps: {
        componentType: 'radio',
        options: dictOptions('menu_type'),
        onChange: handleMenuTypeChange,
      },
    },
    {
      name: 'name',
      label: '菜单名称',
      rules: [{ required: true, whitespace: true, message: '菜单名称不能为空' }],
      fieldProps: {
        componentType: 'input',
        placeholder: '请输入菜单名称',
        maxLength: 20,
      },
    },
    {
      name: 'status',
      label: '菜单状态',
      initialValue: '1',
      rules: [{ required: true, message: '菜单状态不能为空' }],
      fieldProps: {
        componentType: 'radio',
        options: dictOptions('menu_status'),
      },
    },
    {
      name: 'isShow',
      label: '显示状态',
      initialValue: '1',
      rules: [{ required: true, message: '显示状态不能为空' }],
      fieldProps: {
        componentType: 'radio',
        options: [
          { key: '1', value: '显示' },
          { key: '0', value: '隐藏' },
        ],
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
      name: 'path',
      label: '路由地址',
      rules: [{ required: true, whitespace: true, message: '路由地址不能为空' }],
      fieldProps: {
        componentType: 'input',
        placeholder: '请输入路由地址',
        maxLength: 100,
      },
    },
    {
      name: 'icon',
      label: '图标',
      fieldProps: {
        componentType: 'input',
        placeholder: '请输入图标名称（如 HomeOutlined）',
        maxLength: 100,
      },
    },
    {
      name: 'cmpPath',
      label: '组件路径',
      rules: [{ required: true, whitespace: true, message: '组件路径不能为空' }],
      fieldProps: {
        componentType: 'input',
        placeholder: '请输入组件路径（如 pages/system/menu）',
        maxLength: 100,
      },
    },
    {
      name: 'permission',
      label: '权限字符',
      rules: [{ required: true, whitespace: true, message: '权限字符不能为空' }],
      fieldProps: {
        componentType: 'input',
        placeholder: '请输入权限字符（如 system:user:list）',
        maxLength: 100,
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

  const visibleFields = allFields.filter((field) => FIELD_VISIBILITY[field.name]?.includes(currentMenuType));

  useEffect(() => {
    if (formRef?.current && tableRecord && Object.keys(tableRecord).length > 0) {
      if (modalType === 'update') {
        const values = { ...tableRecord, pid: String(tableRecord.pid ?? '0') };
        formRef.current.setFieldsValue(values);
        setCurrentMenuType(tableRecord.menuType || '1');
      } else if (modalType === 'create') {
        formRef.current.setFieldsValue({ pid: String(tableRecord.pid ?? '0') });
        setCurrentMenuType('1');
      }
    }
  }, [tableRecord, formRef, modalType]);

  return (
    <CustomForm name={name} ref={formRef}>
      {visibleFields.map((val) => {
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

export default MenuForm;
