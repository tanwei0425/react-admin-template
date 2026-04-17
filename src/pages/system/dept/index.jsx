import { useEffect, useState, useRef } from 'react';
import { Tag, Button, Space, App } from 'antd';
import { useSelector } from 'react-redux';
import CustomModal from '@components/customModal';
import CustomDrawer from '@components/customDrawer';
import CustomTable, { EnhancedOperateRender } from '@components/customTable';
import AuthButton from '@components/authButton';
import SearchForm from '@components/searchForm';
import { tableColumnToDict, arrayToTree } from '@utils';
import { useDeptListApi, useDeptCreateApi, useDeptUpdateApi, useDeptDeleteApi } from '@api/dept';
import DeptForm from './deptForm';
import DeptDetail from './deptDetail';

const iniModalConfig = {
  title: '操作',
  open: false,
  width: 600,
};

const initSearchFormData = {};

const statusColorMap = { 1: 'green', 0: 'red' };

const Index = () => {
  const { message, modal: modalApi } = App.useApp();
  const [modalConfig, setModalConfig] = useState(iniModalConfig);
  const [dataSource, setDataSource] = useState([]);
  const [flatList, setFlatList] = useState([]);
  const [modalType, setModalType] = useState();
  const [tableRecord, setTableRecord] = useState({});
  const formRefModal = useRef();
  const [searchFormData, setSearchFormData] = useState(initSearchFormData);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);

  const { dictData } = useSelector((state) => state.userInfo);
  const { loading, runAsync: runList } = useDeptListApi();
  const { runAsync: runCreate } = useDeptCreateApi();
  const { runAsync: runUpdate } = useDeptUpdateApi();
  const { runAsync: runDelete } = useDeptDeleteApi();

  const dictOptions = (dictKey) =>
    (dictData[dictKey] || []).map((item) => ({ key: item.key, value: item.value }));

  const dictLabel = (dictKey, value) => tableColumnToDict(dictData[dictKey], value) || value;

  const searchFormSchema = [
    {
      name: 'deptName',
      label: '部门名称',
      fieldProps: {
        componentType: 'input',
        placeholder: '请输入部门名称',
      },
    },
    {
      name: 'status',
      label: '状态',
      fieldProps: {
        componentType: 'select',
        options: dictOptions('dept_status'),
        placeholder: '请选择状态',
      },
    },
  ];

  const columns = [
    {
      title: '部门名称',
      dataIndex: 'deptName',
      width: 180,
      ellipsis: true,
      fixed: 'left',
    },
    {
      title: '负责人',
      dataIndex: 'leader',
      width: 90,
      ellipsis: true,
    },
    {
      title: '联系电话',
      dataIndex: 'phone',
      width: 110,
      ellipsis: true,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      width: 160,
      ellipsis: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 70,
      render: (text) => <Tag color={statusColorMap[text]}>{dictLabel('dept_status', text)}</Tag>,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      ellipsis: true,
      width: 155,
    },
    {
      title: '操作',
      dataIndex: 'action',
      fixed: 'right',
      width: 255,
      render: (_, record) => {
        const data = [
          {
            key: 'view',
            onClick: () => handleView(record),
            text: '查看',
          },
          {
            key: 'addChild',
            onClick: () => modalChange('create', '添加子部门', { pid: record.id }),
            text: '添加子部门',
          },
          {
            key: 'update',
            onClick: () => modalChange('update', '编辑部门', record),
            text: '编辑',
            type: 'primary',
          },
          {
            key: 'delete',
            onClick: () => handleDelete(record),
            text: '删除',
            type: 'primary',
            danger: true,
          },
        ];
        return <EnhancedOperateRender data={data} visibleCount={4} />;
      },
    },
  ];

  const getTableData = async () => {
    const res = await runList(searchFormData);
    if (res?.code === 200) {
      const list = res?.data || [];
      setFlatList(list);
      const tree = arrayToTree(list);
      setDataSource(tree);
      const firstLevelKeys = tree.map((item) => item.id);
      setExpandedRowKeys(firstLevelKeys);
    }
  };

  useEffect(() => {
    getTableData();
  }, [searchFormData]);

  const reset = () => {
    setSearchFormData(initSearchFormData);
  };

  const onFinish = async (values) => {
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
      content: `确定要删除部门「${record.deptName}」吗？删除后不可恢复。`,
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

  const getAllRowKeys = (data) => {
    const keys = [];
    const traverse = (nodes) => {
      nodes.forEach((node) => {
        keys.push(node.id);
        if (node.children?.length) {
          traverse(node.children);
        }
      });
    };
    traverse(data);
    return keys;
  };

  const handleExpandAll = () => {
    setExpandedRowKeys(getAllRowKeys(dataSource));
  };

  const handleCollapseAll = () => {
    setExpandedRowKeys([]);
  };

  return (
    <>
      <SearchForm
        loading={loading}
        reset={reset}
        formSchema={searchFormSchema}
        collapseNum={3}
        formConfig={{
          initialValues: initSearchFormData,
          onFinish: onFinish,
        }}
      />
      <CustomTable
        dataSource={dataSource}
        columns={columns}
        rowKey="id"
        loading={loading}
        title="部门管理列表"
        scroll={{ x: 1100 }}
        pagination={false}
        expandable={{
          expandedRowKeys,
          onExpandedRowsChange: setExpandedRowKeys,
        }}
        toolBarRender={
          <Space size="middle">
            <AuthButton type="primary" onClick={() => modalChange('create', '添加部门', { pid: '0' })}>
              添加部门
            </AuthButton>
            <Button onClick={handleExpandAll}>全部展开</Button>
            <Button onClick={handleCollapseAll}>全部关闭</Button>
          </Space>
        }
      />
      <CustomModal {...modalConfig} draggable={true} onOk={onModalOk} onCancel={onModalClose}>
        <DeptForm
          name="deptForm"
          formRef={formRefModal}
          modalType={modalType}
          tableRecord={tableRecord}
          flatList={flatList}
        />
      </CustomModal>
      <CustomDrawer
        title="部门详情"
        size={680}
        onClose={onDrawerClose}
        open={drawerOpen}
        showOkButton={false}
        cancelText="关闭"
      >
        <DeptDetail record={tableRecord} flatList={flatList} />
      </CustomDrawer>
    </>
  );
};

export default Index;
