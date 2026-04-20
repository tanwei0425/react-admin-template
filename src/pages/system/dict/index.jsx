import { useEffect, useState, useRef } from 'react';
import { App } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CustomModal from '@components/customModal';
import CustomDrawer from '@components/customDrawer';
import CustomTable, { EnhancedOperateRender } from '@components/customTable';
import AuthButton from '@components/authButton';
import SearchForm from '@components/searchForm';
import {
  useDictTypeListApi,
  useDictTypeCreateApi,
  useDictTypeUpdateApi,
  useDictTypeDeleteApi,
} from '@api/dict';
import DictForm from './dictForm';
import DictDetail from './dictDetail';

const iniModalConfig = {
  title: '操作',
  open: false,
  width: 600,
};

const initSearchFormData = {
  status: null,
};

const Index = () => {
  const { message: messageApi, modal: modalApi } = App.useApp();
  const navigate = useNavigate();

  const [modalConfig, setModalConfig] = useState(iniModalConfig);
  const [dataSource, setDataSource] = useState([]);
  const [modalType, setModalType] = useState();
  const [tableRecord, setTableRecord] = useState({});
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
  const formRefModal = useRef();
  const [searchFormData, setSearchFormData] = useState(initSearchFormData);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { dictData } = useSelector((state) => state.userInfo);
  const { loading, runAsync: runList } = useDictTypeListApi();
  const { runAsync: runCreate } = useDictTypeCreateApi();
  const { runAsync: runUpdate } = useDictTypeUpdateApi();
  const { runAsync: runDelete } = useDictTypeDeleteApi();

  const dictOptions = (dictKey) =>
    (dictData[dictKey] || []).map((item) => ({ key: item.key, value: item.value }));

  const searchFormSchema = [
    {
      name: 'dictName',
      label: '字典名称',
      fieldProps: {
        componentType: 'input',
        placeholder: '请输入字典名称',
      },
    },
    {
      name: 'dictType',
      label: '字典编码',
      fieldProps: {
        componentType: 'input',
        placeholder: '请输入字典编码',
      },
    },
    {
      name: 'status',
      label: '状态',
      fieldProps: {
        componentType: 'select',
        options: dictOptions('dict_status'),
        placeholder: '请选择状态',
      },
    },
  ];

  const columns = [
    {
      title: '字典名称',
      dataIndex: 'dictName',
      fixed: 'left',
      ellipsis: true,
      width: 120,
    },
    {
      title: '字典编码',
      dataIndex: 'dictType',
      ellipsis: true,
      width: 140,
      copyable: true,
    },
    {
      title: '排序',
      dataIndex: 'sort',
      width: 70,
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 70,
      dict: { key: 'dict_status', colorMap: { 1: 'green', 0: 'red' } },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      ellipsis: true,
      width: 150,
    },
    {
      title: '操作',
      dataIndex: 'action',
      fixed: 'right',
      width: 210,
      render: (_, record) => {
        const data = [
          {
            key: 'view',
            onClick: () => handleView(record),
            text: '查看',
          },
          {
            key: 'dictData',
            onClick: () => handleDictData(record),
            text: '字典项',
            type: 'primary',
          },
          {
            key: 'update',
            onClick: () => modalChange('update', '编辑字典', record),
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

  const handleDictData = (record) => {
    navigate(`/system/dict-item?dictType=${record.dictType}&dictName=${encodeURIComponent(record.dictName)}`);
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
          messageApi.success('创建成功');
          onModalClose();
          getTableData();
        }
      } else if (modalType === 'update') {
        const res = await runUpdate({ ...values, id: tableRecord.id });
        if (res?.code === 200) {
          messageApi.success('更新成功');
          onModalClose();
          getTableData();
        }
      }
    });
  };

  const handleDelete = (record) => {
    modalApi.confirm({
      title: '删除确认',
      content: `确定要删除字典「${record.dictName}」吗？删除后不可恢复。`,
      okText: '确定删除',
      cancelText: '取消',
      okButtonProps: { danger: true },
      onOk: async () => {
        const res = await runDelete({ id: record.id });
        if (res?.code === 200) {
          messageApi.success('删除成功');
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
        title="字典管理列表"
        onChange={onChange}
        toolBarRender={
          <AuthButton type="primary" onClick={() => modalChange('create', '添加字典')}>
            添加字典
          </AuthButton>
        }
        pagination={pagination}
      />
      <CustomModal {...modalConfig} draggable={true} onOk={onModalOk} onCancel={onModalClose}>
        <DictForm name="dictForm" formRef={formRefModal} modalType={modalType} tableRecord={tableRecord} />
      </CustomModal>
      <CustomDrawer
        title="字典详情"
        size={680}
        onClose={onDrawerClose}
        open={drawerOpen}
        showOkButton={false}
        cancelText="关闭"
      >
        <DictDetail record={tableRecord} />
      </CustomDrawer>
    </>
  );
};

export default Index;
