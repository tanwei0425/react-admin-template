import { useEffect, useState, useRef } from 'react';
import { App } from 'antd';
import { useSelector } from 'react-redux';
import CustomModal from '@components/customModal';
import CustomDrawer from '@components/customDrawer';
import CustomTable, { EnhancedOperateRender } from '@components/customTable';
import AuthButton from '@components/authButton';
import SearchForm from '@components/searchForm';
import { useOrgListApi, useOrgCreateApi, useOrgUpdateApi, useOrgDeleteApi } from '@api/org';
import OrgForm from './orgForm';
import OrgDetail from './orgDetail';

const iniModalConfig = {
  title: '操作',
  open: false,
  width: 600,
};

const initSearchFormData = {
  status: null,
  type: null,
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
  const { loading, runAsync: runList } = useOrgListApi();
  const { runAsync: runCreate } = useOrgCreateApi();
  const { runAsync: runUpdate } = useOrgUpdateApi();
  const { runAsync: runDelete } = useOrgDeleteApi();

  const dictOptions = (dictKey) =>
    (dictData[dictKey] || []).map((item) => ({ key: item.key, value: item.value }));

  const searchFormSchema = [
    {
      name: 'code',
      label: '机构编码',
      fieldProps: {
        componentType: 'input',
        placeholder: '请输入机构编码',
      },
    },
    {
      name: 'name',
      label: '机构名称',
      fieldProps: {
        componentType: 'input',
        placeholder: '请输入机构名称',
      },
    },
    {
      name: 'type',
      label: '机构类型',
      fieldProps: {
        componentType: 'select',
        options: dictOptions('org_type'),
        placeholder: '请选择机构类型',
      },
    },
    {
      name: 'leader',
      label: '负责人',
      fieldProps: {
        componentType: 'input',
        placeholder: '请输入负责人',
      },
    },
    {
      name: 'status',
      label: '状态',
      fieldProps: {
        componentType: 'select',
        options: dictOptions('org_status'),
        placeholder: '请选择状态',
      },
    },
  ];

  const columns = [
    {
      title: '机构编码',
      dataIndex: 'code',
      width: 130,
      ellipsis: true,
    },
    {
      title: '机构名称',
      dataIndex: 'name',
      width: 180,
      ellipsis: true,
    },
    {
      title: '机构类型',
      dataIndex: 'type',
      width: 100,
      align: 'center',
      dict: 'org_type',
    },
    {
      title: '负责人',
      dataIndex: 'leader',
      width: 100,
      ellipsis: true,
    },
    {
      title: '联系电话',
      dataIndex: 'phone',
      width: 130,
      ellipsis: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 80,
      align: 'center',
      dict: { key: 'org_status', colorMap: { 1: 'green', 0: 'red' } },
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
      width: 180,
      render: (_, record) => {
        const data = [
          {
            key: 'view',
            onClick: () => handleView(record),
            text: '查看',
          },
          {
            key: 'update',
            onClick: () => modalChange('update', '编辑机构', record),
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
      current: paginationConfig?.current,
      pageSize: paginationConfig?.pageSize,
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
      content: `确定要删除机构「${record.name}」吗？删除后不可恢复。`,
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
        title="组织机构列表"
        onChange={onChange}
        toolBarRender={
          <AuthButton type="primary" onClick={() => modalChange('create', '添加机构')}>
            添加机构
          </AuthButton>
        }
        scroll={{ x: 1250 }}
        pagination={pagination}
      />
      <CustomModal {...modalConfig} draggable={true} onOk={onModalOk} onCancel={onModalClose}>
        <OrgForm name="orgForm" formRef={formRefModal} modalType={modalType} tableRecord={tableRecord} />
      </CustomModal>
      <CustomDrawer
        title="机构详情"
        size={680}
        onClose={onDrawerClose}
        open={drawerOpen}
        showOkButton={false}
        cancelText="关闭"
      >
        <OrgDetail record={tableRecord} />
      </CustomDrawer>
    </>
  );
};

export default Index;
