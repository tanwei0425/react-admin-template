---
name: 'crud-module-generator'
description: 'Generates complete CRUD module scaffolding (list/form/detail/api) following project conventions. Invoke when user asks to create a new management page, add CRUD features, or scaffold a new system module.'
---

# CRUD Module Generator Skill

This skill generates complete CRUD module scaffolding for the React admin template project, following the established conventions observed in `src/pages/system/user/`.

## Skill Boundary

**This skill ONLY owns**: Code structure, file generation, API patterns, naming conventions.

**Does NOT own**: Fine-grained styling (padding, colors, typography), UX interaction patterns, accessibility. For those, defer to `ui-ux-pro-max` skill.

**When generating UI**: Use minimal inline styles. Apply `ui-ux-pro-max` standards separately if user requests visual polish.

## When to Invoke

Invoke this skill when:

- User asks to create a new management page (e.g., "创建一个XX管理页面")
- User asks to add CRUD features for a new entity
- User asks to scaffold a new system module
- User mentions 生成/创建/搭建 a module with list/form/detail

## Project Architecture Reference

### Tech Stack

- **React 19** + **React Router v7** + **Redux Toolkit** + **Ant Design 6**
- **ahooks** for API requests (`useApiRequest` wraps `useRequest`)
- **Vite 8** with path aliases (`@components`, `@pages`, `@api`, `@hooks`, `@utils`, etc.)
- **@ant-design/charts** for charts
- **styled-components** for styling (`useStyle` pattern)

### Path Aliases (vite.config.js)

```
@          → src
@components → src/components
@pages     → src/pages
@hooks     → src/hooks
@api       → src/api
@styles    → src/styles
@layouts   → src/layouts
@router    → src/router
@store     → src/store
@config    → src/config
@utils     → src/utils
@assets    → src/assets
```

## Module File Structure

A complete CRUD module lives at `src/pages/system/<module>/` and contains:

```
src/pages/system/<module>/
├── index.jsx              # List page (table + search + toolbar)
├── <module>Form.jsx       # Create/Edit form (used in Modal)
├── <module>Detail.jsx     # Detail view (used in Drawer)
└── <module>Modal.jsx      # Optional: Special modal (e.g., assign roles)
```

Plus the API file at `src/api/<module>.js`.

## File Templates

### 1. API Layer (`src/api/<module>.js`)

Follow the pattern from `src/api/user.js`. Each API is a hook using `useApiRequest`.

```javascript
import useApiRequest from '@hooks/useApiRequest';

export const use<Module>ListApi = () => {
  return useApiRequest({ url: '/mock/<module>/list' });
};

export const use<Module>CreateApi = () => {
  return useApiRequest({ url: '/mock/<module>/create', method: 'POST' });
};

export const use<Module>UpdateApi = () => {
  return useApiRequest({ url: '/mock/<module>/update', method: 'POST' });
};

export const use<Module>DeleteApi = () => {
  return useApiRequest({ url: '/mock/<module>/delete', method: 'POST' });
};

// Optional: special operations
export const use<Module>AllListApi = () => {
  return useApiRequest({ url: '/mock/<module>/allList', manual: true });
};
```

### 2. List Page (`index.jsx`)

Key conventions from `src/pages/system/user/index.jsx`:

```javascript
import { useEffect, useState, useRef } from 'react';
import { App } from 'antd';
import { useSelector } from 'react-redux';
import CustomModal from '@components/customModal';
import CustomDrawer from '@components/customDrawer';
import CustomTable, { EnhancedOperateRender } from '@components/customTable';
import AuthButton from '@components/authButton';
import SearchForm from '@components/searchForm';
import {
  use<Module>ListApi,
  use<Module>CreateApi,
  use<Module>UpdateApi,
  use<Module>DeleteApi,
} from '@api/<module>';
import <Module>Form from './<module>Form';
import <Module>Detail from './<module>Detail';

const iniModalConfig = {
  title: '操作',
  open: false,
  width: 600,
};

const initSearchFormData = {
  status: null,
};

const Index = () => {
  const { message, modal: modalApi } = App.useApp();
  const [modalConfig, setModalConfig] = useState(iniModalConfig);
  const [dataSource, setDataSource] = useState([]);
  const [modalType, setModalType] = useState();
  const [tableRecord, setTableRecord] = useState({});
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
  const formRefModal = useRef();
  const [searchFormData, setSearchFormData] = useState(initSearchFormData);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { dictData } = useSelector((state) => state.userInfo);
  const { loading, runAsync: runList } = use<Module>ListApi();
  const { runAsync: runCreate } = use<Module>CreateApi();
  const { runAsync: runUpdate } = use<Module>UpdateApi();
  const { runAsync: runDelete } = use<Module>DeleteApi();

  const dictOptions = (dictKey) =>
    (dictData[dictKey] || []).map((item) => ({ key: item.key, value: item.value }));

  // Search form schema
  const searchFormSchema = [
    {
      name: 'name',
      label: '名称',
      fieldProps: { componentType: 'input', placeholder: '请输入名称' },
    },
    {
      name: 'status',
      label: '状态',
      fieldProps: {
        componentType: 'select',
        options: dictOptions('<module>_status'),
        placeholder: '请选择状态',
      },
    },
  ];

  // Table columns - use dict for dictionary translation
  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      width: 130,
      ellipsis: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 70,
      align: 'center',
      dict: { key: '<module>_status', colorMap: { 1: 'green', 0: 'red' } },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: 160,
      ellipsis: true,
    },
    {
      title: '操作',
      dataIndex: 'action',
      fixed: 'right',
      width: 220,
      render: (_, record) => {
        const data = [
          { key: 'view', onClick: () => handleView(record), text: '查看' },
          { key: 'update', onClick: () => modalChange('update', '编辑', record), text: '编辑', type: 'primary' },
          { key: 'delete', onClick: () => handleDelete(record), text: '删除', type: 'primary', danger: true },
        ];
        return <EnhancedOperateRender data={data} />;
      },
    },
  ];

  const getTableData = async () => {
    const data = {
      current: pagination.current,
      pageSize: pagination.pageSize,
      ...searchFormData,
    };
    const res = await runList(data);
    if (res?.code === 200) {
      setDataSource(res?.data?.list || []);
      setPagination({ ...pagination, total: res?.data?.total });
    }
  };

  const onChange = (paginationConfig) => {
    setPagination({
      current: paginationConfig.current,
      pageSize: paginationConfig.pageSize,
      total: paginationConfig.total,
    });
  };

  useEffect(() => {
    getTableData();
  }, [pagination?.current, pagination?.pageSize, searchFormData]);

  const reset = () => {
    setPagination({ current: 1, pageSize: 10, total: 0 });
    setSearchFormData({ ...initSearchFormData });
  };

  const onFinish = async (values) => {
    setPagination({ current: 1, pageSize: 10, total: 0 });
    setSearchFormData({ ...values });
  };

  const handleView = (record) => {
    setTableRecord(record);
    setDrawerOpen(true);
  };

  const modalChange = (type, title, record = {}) => {
    setModalConfig({ ...modalConfig, title, open: true });
    setModalType(type);
    setTableRecord(record);
  };

  const onModalClose = () => {
    formRefModal.current?.resetFields();
    setModalConfig(iniModalConfig);
    setModalType();
    setTableRecord({});
  };

  const onModalOk = async () => {
    formRefModal.current.validateFields().then(async (values) => {
      if (modalType === 'create') {
        const res = await runCreate(values);
        if (res?.code === 200) {
          message.success('创建成功');
          onModalClose();
          getTableData();
        }
      } else if (modalType === 'update') {
        const res = await runUpdate({ ...values, id: tableRecord.id });
        if (res?.code === 200) {
          message.success('更新成功');
          onModalClose();
          getTableData();
        }
      }
    });
  };

  const handleDelete = (record) => {
    modalApi.confirm({
      title: '删除确认',
      content: `确定要删除「${record.name}」吗？删除后不可恢复。`,
      okText: '确定删除',
      cancelText: '取消',
      okButtonProps: { danger: true },
      onOk: async () => {
        const res = await runDelete({ id: record.id });
        if (res?.code === 200) {
          message.success('删除成功');
          getTableData();
        }
      },
    });
  };

  const onDrawerClose = () => {
    setDrawerOpen(false);
    setTableRecord({});
  };

  return (
    <>
      <SearchForm
        loading={loading}
        reset={reset}
        formSchema={searchFormSchema}
        collapseNum={3}
        formConfig={{ initialValues: initSearchFormData, onFinish: onFinish }}
      />
      <CustomTable
        dataSource={dataSource}
        columns={columns}
        rowKey="id"
        loading={loading}
        title="<Module>列表"
        onChange={onChange}
        toolBarRender={
          <AuthButton type="primary" onClick={() => modalChange('create', '添加')}>
            添加
          </AuthButton>
        }
        scroll={{ x: 1250 }}
        pagination={pagination}
      />
      <CustomModal {...modalConfig} draggable={true} onOk={onModalOk} onCancel={onModalClose}>
        <<Module>Form name="<module>Form" formRef={formRefModal} modalType={modalType} tableRecord={tableRecord} />
      </CustomModal>
      <CustomDrawer
        title="<Module>详情"
        size={680}
        onClose={onDrawerClose}
        open={drawerOpen}
        showOkButton={false}
        cancelText="关闭"
      >
        <<Module>Detail record={tableRecord} />
      </CustomDrawer>
    </>
  );
};

export default Index;
```

### 3. Form Component (`<module>Form.jsx`)

Pattern from `src/pages/system/user/userForm.jsx`. Uses `CustomForm` + `FormRenderComponent`:

```javascript
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import CustomForm, { FormItem, FormRenderComponent } from '@components/formElements';

const <Module>Form = ({ formRef, name, modalType, tableRecord }) => {
  const { dictData } = useSelector((state) => state.userInfo);

  const dictOptions = (dictKey) =>
    (dictData[dictKey] || []).map((item) => ({ key: item.key, value: item.value }));

  const formSchema = [
    {
      name: 'name',
      label: '名称',
      rules: [{ required: true, whitespace: true, message: '名称不能为空' }],
      fieldProps: { componentType: 'input', placeholder: '请输入名称' },
    },
    {
      name: 'status',
      label: '状态',
      initialValue: '1',
      rules: [{ required: true, message: '状态不能为空' }],
      fieldProps: {
        componentType: 'radio',
        options: dictOptions('<module>_status'),
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

export default <Module>Form;
```

### 4. Detail Component (`<module>Detail.jsx`)

Pattern from `src/pages/system/user/userDetail.jsx`. Uses `Descriptions` with `column={2}`:

```javascript
import { useSelector } from 'react-redux';
import { Descriptions, Tag } from 'antd';
import { tableColumnToDict } from '@utils';

const statusColorMap = { 1: 'green', 0: 'red' };

const <Module>Detail = ({ record }) => {
  const { dictData } = useSelector((state) => state.userInfo);

  const dictLabel = (dictKey, value) => tableColumnToDict(dictData[dictKey], value) || value;

  return (
    <Descriptions column={2} bordered size="small">
      <Descriptions.Item label="名称">{record.name}</Descriptions.Item>
      <Descriptions.Item label="状态">
        <Tag color={statusColorMap[record.status]}>{dictLabel('<module>_status', record.status)}</Tag>
      </Descriptions.Item>
      <Descriptions.Item label="创建时间">{record.createTime}</Descriptions.Item>
      <Descriptions.Item label="备注" span={2}>
        {record.remark}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default <Module>Detail;
```

## Conventions to Follow

### Naming

- **Files**: `index.jsx`, `<module>Form.jsx`, `<module>Detail.jsx`, `<module>Modal.jsx` (camelCase)
- **Components**: PascalCase (`UserForm`, `UserDetail`)
- **API hooks**: `use<Module><Action>Api` (e.g., `useUserCreateApi`)
- **Variables**: camelCase

### API Patterns

- All APIs use `useApiRequest` hook (wraps ahooks `useRequest`)
- GET for list/query, POST for create/update/delete
- Response shape: `{ code: 200, data: { list, total }, message }`
- Code 200 = success, 901/902/903/904 = auth failure (auto-logout)

### Component Usage

- **CustomTable**: Built-in dict translation via `dict` column property
  ```javascript
  // Simple dict
  { title: '状态', dataIndex: 'status', dict: 'user_status' }
  // With color
  { title: '状态', dataIndex: 'status', dict: { key: 'user_status', colorMap: { 1: 'green', 0: 'red' } } }
  // Multiple values
  { title: '角色', dataIndex: 'roleIds', dict: { key: 'role', separator: '、' } }
  ```
- **SearchForm**: Schema-driven, supports `collapseNum` for collapsible fields
- **CustomModal**: `draggable` prop, `onOk`/`onCancel` callbacks
- **CustomDrawer**: `size` prop, `showOkButton` to toggle OK button
- **AuthButton**: For permission-controlled buttons
- **EnhancedOperateRender**: For action column with multiple buttons

### Form Component Types

Available `componentType` values for `FormRenderComponent`:

- `input` - Text input
- `textArea` - Textarea
- `select` - Select (supports `mode: 'multiple'`)
- `radio` - Radio group
- `checkbox` - Checkbox group
- `inputNumber` - Number input
- `datePicker` - Date picker
- `timePicker` - Time picker
- `cascader` - Cascader
- `treeSelect` - Tree select
- `switch` - Switch
- `upload` - File upload
- `transfer` - Transfer
- `colorPicker` - Color picker
- `richText` - Rich text editor

### State Management

- **Redux**: Used for global state (`userInfo`, `common`, `theme`)
- **dictData**: Stored in `state.userInfo.dictData`, accessed via `useSelector`
- **Local state**: Use `useState` for component-level state

### Descriptions Span Rule

⚠️ Critical: When using `Descriptions` with `column={2}`, ensure span sum per row = 2:

- Default span is 1
- Use `span={2}` for full-width items
- Avoid odd number of span=1 items (last one will be lonely)
- For conditional items, calculate span dynamically if needed

## Generation Steps

When generating a new module:

1. **Gather Requirements**: Ask user for module name, fields, and special operations
2. **Create API file**: `src/api/<module>.js` with CRUD hooks
3. **Create list page**: `src/pages/system/<module>/index.jsx`
4. **Create form**: `src/pages/system/<module>/<module>Form.jsx`
5. **Create detail**: `src/pages/system/<module>/<module>Detail.jsx`
6. **Add menu route**: User needs to add menu entry in menu management
7. **Add mock data**: If using mock, add to `mock/` directory

## Example Prompt

User: "帮我创建一个产品管理模块，包含名称、价格、分类、状态字段"

Generated files:

- `src/api/product.js` - API hooks
- `src/pages/system/product/index.jsx` - List page
- `src/pages/system/product/productForm.jsx` - Form
- `src/pages/system/product/productDetail.jsx` - Detail

## Important Notes

- Always use path aliases (`@components`, `@api`, etc.) instead of relative paths
- Follow the established `useApiRequest` pattern for all API calls
- Use `App.useApp()` for `message` and `modal` (not static methods)
- Wrap delete operations with `modalApi.confirm` for safety
- Use `AuthButton` for permission-controlled actions
- Set `rowKey="id"` on CustomTable
- Handle loading states properly (use `loading` from API hooks)
