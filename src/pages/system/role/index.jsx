import { useEffect, useState, useRef } from 'react';
import { Tag, message, Modal } from 'antd';
import { useSelector } from 'react-redux';
import CustomModal from '@components/customModal';
import CustomDrawer from '@components/customDrawer';
import CustomTable, { EnhancedOperateRender } from '@components/customTable';
import AuthButton from '@components/authButton';
import SearchForm from '@components/searchForm';
import { tableColumnToDict } from '@utils';
import { useRoleListApi, useRoleCreateApi, useRoleUpdateApi, useRoleDeleteApi, useRoleAssignUsersApi } from '@api/role';
import RoleForm from './roleForm';
import RoleDetail from './roleDetail';
import AssignUsersModal from './assignUsersModal';

const iniModalConfig = {
  title: '操作',
  open: false,
  width: 600,
};

const initSearchFormData = {
  status: null,
};

const statusColorMap = { 1: 'green', 0: 'red' };

const Index = () => {
  const [modalConfig, setModalConfig] = useState(iniModalConfig);
  const [dataSource, setDataSource] = useState([]);
  const [modalType, setModalType] = useState();
  const [tableRecord, setTableRecord] = useState({});
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
  const formRefModal = useRef();
  const [searchFormData, setSearchFormData] = useState(initSearchFormData);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [assignUsersOpen, setAssignUsersOpen] = useState(false);
  const [assignUsersRecord, setAssignUsersRecord] = useState({});

  const { dictData } = useSelector((state) => state.userInfo);
  const { loading, runAsync: runList } = useRoleListApi();
  const { runAsync: runCreate } = useRoleCreateApi();
  const { runAsync: runUpdate } = useRoleUpdateApi();
  const { runAsync: runDelete } = useRoleDeleteApi();
  const { loading: assignUsersLoading, runAsync: runAssignUsers } = useRoleAssignUsersApi();

  const dictOptions = (dictKey) =>
    (dictData[dictKey] || []).map((item) => ({ key: item.key, value: item.value }));

  const dictLabel = (dictKey, value) => tableColumnToDict(dictData[dictKey], value) || value;

  const searchFormSchema = [
    {
      name: 'roleName',
      label: '角色名称',
      fieldProps: {
        componentType: 'input',
        placeholder: '请输入角色名称',
      },
    },
    {
      name: 'roleCode',
      label: '角色编码',
      fieldProps: {
        componentType: 'input',
        placeholder: '请输入角色编码',
      },
    },
    {
      name: 'status',
      label: '状态',
      fieldProps: {
        componentType: 'select',
        options: dictOptions('role_status'),
        placeholder: '请选择状态',
      },
    },
    {
      name: 'roleType',
      label: '角色类型',
      fieldProps: {
        componentType: 'select',
        options: dictOptions('role_type'),
        placeholder: '请选择角色类型',
      },
    },
  ];

  const columns = [
    {
      title: '角色名称',
      dataIndex: 'roleName',
      fixed: 'left',
      ellipsis: true,
      width: 120,
    },
    {
      title: '角色编码',
      dataIndex: 'roleCode',
      ellipsis: true,
      width: 130,
      copyable: true,
    },
    {
      title: '角色类型',
      dataIndex: 'roleType',
      ellipsis: true,
      width: 100,
      render: (text) => dictLabel('role_type', text),
    },

    {
      title: '状态',
      dataIndex: 'status',
      width: 70,
      render: (text) => <Tag color={statusColorMap[text]}>{dictLabel('role_status', text)}</Tag>,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      ellipsis: true,
      width: 160,
    },
    {
      title: '操作',
      dataIndex: 'action',
      fixed: 'right',
      width: 220,
      render: (_, record) => {
        const data = [
          {
            key: 'view',
            onClick: () => handleView(record),
            text: '查看',
          },
          {
            key: 'update',
            onClick: () => modalChange('update', '编辑角色', record),
            text: '编辑',
            type: 'primary',
          },
          {
            key: 'assignUsers',
            onClick: () => handleAssignUsers(record),
            text: '分配用户',
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
    setSearchFormData(initSearchFormData);
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
    Modal.confirm({
      title: '删除确认',
      content: `确定要删除角色「${record.roleName}」吗？删除后不可恢复。`,
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

  const handleAssignUsers = (record) => {
    setAssignUsersRecord(record);
    setAssignUsersOpen(true);
  };

  const onAssignUsersOk = async (params) => {
    const res = await runAssignUsers(params);
    if (res?.code === 200) {
      message.success('分配用户成功');
      setAssignUsersOpen(false);
      setAssignUsersRecord({});
      getTableData();
    }
  };

  const onAssignUsersCancel = () => {
    setAssignUsersOpen(false);
    setAssignUsersRecord({});
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
        title="角色管理列表"
        onChange={onChange}
        toolBarRender={
          <AuthButton type="primary" onClick={() => modalChange('create', '添加角色')}>
            添加角色
          </AuthButton>
        }
        pagination={pagination}
      />
      <CustomModal {...modalConfig} draggable={true} onOk={onModalOk} onCancel={onModalClose}>
        <RoleForm name="roleForm" formRef={formRefModal} modalType={modalType} tableRecord={tableRecord} />
      </CustomModal>
      <CustomDrawer
        title="角色详情"
        size={680}
        onClose={onDrawerClose}
        open={drawerOpen}
        showOkButton={false}
        cancelText="关闭"
      >
        <RoleDetail record={tableRecord} />
      </CustomDrawer>
      <AssignUsersModal
        open={assignUsersOpen}
        record={assignUsersRecord}
        onCancel={onAssignUsersCancel}
        onOk={onAssignUsersOk}
        confirmLoading={assignUsersLoading}
      />
    </>
  );
};

export default Index;
