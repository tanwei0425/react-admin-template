import { useEffect, useState } from 'react';
import { App } from 'antd';
import { useSelector } from 'react-redux';
import CustomDrawer from '@components/customDrawer';
import CustomTable, { EnhancedOperateRender } from '@components/customTable';
import SearchForm from '@components/searchForm';
import AuthButton from '@components/authButton';
import { useLogListApi, useLogDeleteApi, useLogClearApi, useLogBatchDeleteApi } from '@api/log';
import LogDetail from './logDetail';

const initSearchFormData = {
  logType: null,
  status: null,
  createTime: null,
};
const Index = () => {
  const { message, modal: modalApi } = App.useApp();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
  const [searchFormData, setSearchFormData] = useState(initSearchFormData);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [logRecord, setLogRecord] = useState({});

  const { dictData } = useSelector((state) => state.userInfo);
  const { loading, runAsync: runList } = useLogListApi();
  const { runAsync: runDelete } = useLogDeleteApi();
  const { runAsync: runClear } = useLogClearApi();
  const { runAsync: runBatchDelete } = useLogBatchDeleteApi();

  const dictOptions = (dictKey) =>
    (dictData[dictKey] || []).map((item) => ({ key: item.key, value: item.value }));

  const searchFormSchema = [
    {
      name: 'title',
      label: '操作标题',
      fieldProps: {
        componentType: 'input',
        placeholder: '请输入操作标题',
      },
    },
    {
      name: 'logType',
      label: '日志类型',
      fieldProps: {
        componentType: 'select',
        options: dictOptions('log_type'),
        placeholder: '请选择日志类型',
      },
    },
    {
      name: 'moduleName',
      label: '操作模块',
      fieldProps: {
        componentType: 'input',
        placeholder: '请输入操作模块',
      },
    },
    {
      name: 'operatorName',
      label: '操作人员',
      fieldProps: {
        componentType: 'input',
        placeholder: '请输入操作人员',
      },
    },
    {
      name: 'status',
      label: '执行状态',
      fieldProps: {
        componentType: 'select',
        options: dictOptions('log_status'),
        placeholder: '请选择执行状态',
      },
    },
    {
      name: 'createTime',
      label: '操作时间',
      style: { width: '330px' },
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
      fieldProps: {
        componentType: 'datePicker',
        range: true,
        placeholder: ['开始时间', '结束时间'],
      },
    },
  ];

  const columns = [
    {
      title: '日志 ID',
      dataIndex: 'id',
      width: 80,
    },
    {
      title: '操作标题',
      dataIndex: 'title',
      width: 120,
      ellipsis: true,
    },
    {
      title: '日志类型',
      dataIndex: 'logType',
      width: 100,
      dict: { key: 'log_type', colorMap: { 1: 'blue', 2: 'green', 3: 'orange', 4: 'purple' } },
    },
    {
      title: '操作模块',
      dataIndex: 'moduleName',
      width: 100,
      ellipsis: true,
    },
    {
      title: '操作类型',
      dataIndex: 'operationName',
      width: 80,
    },
    {
      title: '请求 IP',
      dataIndex: 'requestIp',
      width: 130,
    },
    {
      title: '操作地点',
      dataIndex: 'requestLocation',
      width: 100,
      ellipsis: true,
    },
    {
      title: '执行状态',
      dataIndex: 'status',
      width: 80,
      align: 'center',
      dict: { key: 'log_status', colorMap: { 1: 'green', 0: 'red' } },
    },
    {
      title: '操作人员',
      dataIndex: 'operatorName',
      width: 90,
      ellipsis: true,
    },
    {
      title: '操作时间',
      dataIndex: 'createTime',
      width: 160,
      ellipsis: true,
    },
    {
      title: '耗时 (ms)',
      dataIndex: 'duration',
      width: 80,
      align: 'right',
    },
    {
      title: '操作',
      dataIndex: 'action',
      fixed: 'right',
      width: 120,
      render: (_, record) => {
        const data = [
          {
            key: 'view',
            onClick: () => handleView(record),
            text: '查看',
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
    setLogRecord(record);
    setDrawerOpen(true);
  };

  const handleDelete = (record) => {
    modalApi.confirm({
      title: '删除确认',
      content: `确定要删除该日志记录吗？`,
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

  const handleBatchDelete = () => {
    if (selectedRowKeys.length === 0) {
      message.warning('请选择要删除的日志记录');
      return;
    }
    modalApi.confirm({
      title: '批量删除确认',
      content: `确定要删除选中的 ${selectedRowKeys.length} 条日志记录吗？删除后不可恢复！`,
      okText: '确定删除',
      cancelText: '取消',
      okButtonProps: { danger: true },
      onOk: async () => {
        const res = await runBatchDelete({ ids: selectedRowKeys });
        if (res?.code === 200) {
          message.success('批量删除成功');
          setSelectedRowKeys([]);
          getTableData();
        }
      },
    });
  };

  const handleClear = () => {
    modalApi.confirm({
      title: '清空确认',
      content: '确定要清空所有日志记录吗？此操作不可恢复！',
      okText: '确定清空',
      cancelText: '取消',
      okButtonProps: { danger: true },
      onOk: async () => {
        const res = await runClear();
        if (res?.code === 200) {
          message.success('清空成功');
          setSelectedRowKeys([]);
          getTableData();
        }
      },
    });
  };

  const onDrawerClose = () => {
    setDrawerOpen(false);
    setLogRecord({});
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
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
        title="操作日志列表"
        onChange={onChange}
        toolBarRender={
          <>
            <AuthButton
              type="primary"
              danger
              disabled={selectedRowKeys.length === 0}
              onClick={handleBatchDelete}
            >
              批量删除
            </AuthButton>
            <AuthButton type="primary" danger onClick={handleClear}>
              清空日志
            </AuthButton>
          </>
        }
        pagination={pagination}
        scroll={{ x: 1400 }}
        rowSelection={rowSelection}
      />
      <CustomDrawer
        title="日志详情"
        size={680}
        onClose={onDrawerClose}
        open={drawerOpen}
        showOkButton={false}
        cancelText="关闭"
      >
        <LogDetail record={logRecord} />
      </CustomDrawer>
    </>
  );
};

export default Index;
