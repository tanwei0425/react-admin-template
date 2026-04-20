import { useEffect, useState, useRef } from 'react';
import { App } from 'antd';
import { useSelector } from 'react-redux';
import CustomModal from '@components/customModal';
import CustomDrawer from '@components/customDrawer';
import CustomTable, { EnhancedOperateRender } from '@components/customTable';
import AuthButton from '@components/authButton';
import SearchForm from '@components/searchForm';
import {
  useUserListApi,
  useUserCreateApi,
  useUserUpdateApi,
  useUserDeleteApi,
  useUserResetPwdApi,
  useUserAssignRolesApi,
} from '@api/user';
import UserForm from './userForm';
import UserDetail from './userDetail';
import AssignRolesModal from './assignRolesModal';

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
  const [assignRolesOpen, setAssignRolesOpen] = useState(false);
  const [assignRolesRecord, setAssignRolesRecord] = useState({});

  const { dictData } = useSelector((state) => state.userInfo);
  const { loading, runAsync: runList } = useUserListApi();
  const { runAsync: runCreate } = useUserCreateApi();
  const { runAsync: runUpdate } = useUserUpdateApi();
  const { runAsync: runDelete } = useUserDeleteApi();
  const { runAsync: runResetPwd } = useUserResetPwdApi();
  const { loading: assignRolesLoading, runAsync: runAssignRoles } = useUserAssignRolesApi();

  const dictOptions = (dictKey) =>
    (dictData[dictKey] || []).map((item) => ({ key: item.key, value: item.value }));

  const searchFormSchema = [
    {
      name: 'username',
      label: '登录账号',
      fieldProps: {
        componentType: 'input',
        placeholder: '请输入登录账号',
      },
    },
    {
      name: 'nickname',
      label: '用户名称',
      fieldProps: {
        componentType: 'input',
        placeholder: '请输入用户名称',
      },
    },
    {
      name: 'status',
      label: '状态',
      fieldProps: {
        componentType: 'select',
        options: dictOptions('user_status'),
        placeholder: '请选择状态',
      },
    },
    {
      name: 'department',
      label: '部门',
      fieldProps: {
        componentType: 'select',
        options: dictOptions('department'),
        placeholder: '请选择部门',
      },
    },
  ];

  const columns = [
    {
      title: '登录账号',
      dataIndex: 'username',
      fixed: 'left',
      width: 130,
      ellipsis: true,
    },
    {
      title: '用户名称',
      dataIndex: 'nickname',
      width: 80,
      ellipsis: true,
    },
    {
      title: '性别',
      dataIndex: 'gender',
      width: 60,
      align: 'center',
      dict: 'gender',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      width: 110,
      ellipsis: true,
    },
     {
      title: '角色',
      dataIndex: 'roleIds',
      width: 130,
      ellipsis: true,
      dict: { key: 'role', separator: '、' },
    },
    {
      title: '部门',
      dataIndex: 'department',
      width: 90,
      ellipsis: true,
      dict: 'department',
    },
   
    {
      title: '状态',
      dataIndex: 'status',
      width: 70,
      align: 'center',
      dict: { key: 'user_status', colorMap: { '1': 'green', '0': 'red' } },
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
          {
            key: 'view',
            onClick: () => handleView(record),
            text: '查看',
          },
          {
            key: 'update',
            onClick: () => modalChange('update', '编辑用户', record),
            text: '编辑',
            type: 'primary',
          },
          {
            key: 'assignRoles',
            onClick: () => handleAssignRoles(record),
            text: '分配角色',
          },
          {
            key: 'resetPwd',
            onClick: () => handleResetPwd(record),
            text: '重置密码',
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
    modalApi.confirm({
      title: '删除确认',
      content: `确定要删除用户「${record.nickname}」吗？删除后不可恢复。`,
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

  const handleResetPwd = (record) => {
    modalApi.confirm({
      title: '重置密码',
      content: `确定将用户「${record.nickname}」的密码重置为默认密码（123456）吗？`,
      okText: '确定重置',
      cancelText: '取消',
      okButtonProps: { danger: true },
      onOk: async () => {
        const res = await runResetPwd({ id: record.id });
        if (res?.code === 200) {
          message.success('密码已重置为默认密码');
        }
      },
    });
  };

  const handleAssignRoles = (record) => {
    setAssignRolesRecord(record);
    setAssignRolesOpen(true);
  };

  const onAssignRolesOk = async (params) => {
    const res = await runAssignRoles(params);
    if (res?.code === 200) {
      message.success('分配角色成功');
      setAssignRolesOpen(false);
      setAssignRolesRecord({});
      getTableData();
    }
  };

  const onAssignRolesCancel = () => {
    setAssignRolesOpen(false);
    setAssignRolesRecord({});
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
        title="用户管理列表"
        onChange={onChange}
        toolBarRender={
          <AuthButton type="primary" onClick={() => modalChange('create', '添加用户')}>
            添加用户
          </AuthButton>
        }
        scroll={{ x: 1250 }}
        pagination={pagination}
      />
      <CustomModal {...modalConfig} draggable={true} onOk={onModalOk} onCancel={onModalClose}>
        <UserForm name="userForm" formRef={formRefModal} modalType={modalType} tableRecord={tableRecord} />
      </CustomModal>
      <CustomDrawer
        title="用户详情"
        size={680}
        onClose={onDrawerClose}
        open={drawerOpen}
        showOkButton={false}
        cancelText="关闭"
      >
        <UserDetail record={tableRecord} />
      </CustomDrawer>
      <AssignRolesModal
        open={assignRolesOpen}
        record={assignRolesRecord}
        onCancel={onAssignRolesCancel}
        onOk={onAssignRolesOk}
        confirmLoading={assignRolesLoading}
      />
    </>
  );
};

export default Index;
