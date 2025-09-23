import { useEffect, useState, useRef } from 'react';
import { Divider } from 'antd';
import CustomModal from '@components/customModal';
import CustomTable, { OperateRender } from '@components/customTable';
import AuthButton from '@components/authButton';
import SearchForm from '@components/searchForm';
import { useTableListApi } from '@api/table';
const iniModalConifg = {
  title: '操作',
  open: false,
  width: 1000,
};
const initSearchFormData = {
  status: '1',
};
const Index = () => {
  const [modalConfig, setModalConfig] = useState(iniModalConifg);
  const [dataSource, setDataSource] = useState([]);
  const [modalType, setModalType] = useState();
  const [tableRecord, setTableRecord] = useState({});
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
  const formRefModal = useRef();
  const [searchFormData, setSearchFormData] = useState(initSearchFormData);
  const { loading, runAsync } = useTableListApi();
  const searchFormSchema = [
    {
      className: 'serachFormItem',
      name: 'name',
      label: '元素名称',
      fieldProps: {
        componentType: 'input',
        placeholder: '请输入元素名称',
      },
    },
    {
      className: 'serachFormItem',
      name: 'name2',
      label: '元素名称2',
      fieldProps: {
        componentType: 'input',
        placeholder: '请输入元素名称2',
      },
    },
    {
      className: 'serachFormItem',
      name: 'status',
      label: '元素状态',
      fieldProps: {
        componentType: 'select',
        options: [
          { key: '1', value: '111' },
          { key: '2', value: '222' },
          { key: '3', value: '333', disabled: true },
        ],
        placeholder: '请选择元素状态',
      },
    },
  ];
  const columns = [
    {
      title: '元素名称',
      dataIndex: 'name',
      fixed: 'left',
      ellipsis: true,
    },
    {
      title: '元素编码',
      dataIndex: 'code',
      ellipsis: true,
    },
    {
      title: '所属菜单',
      dataIndex: 'menuName',
      ellipsis: true,
      render(text, record) {
        return record?.menuId === 0 ? '公共接口' : text;
      },
    },
    {
      title: '操作',
      dataIndex: 'action',
      fixed: 'right',
      // width: 260,
      render: (_, record) => {
        const data = [
          {
            key: 'view',
            onClick: (props) => modalChange('view', '查看元素', props),
            text: '查看',
            // authKey: 'delete-element',
          },
          {
            key: 'update',
            onClick: (props) => modalChange('update', '编辑元素', props),
            text: '编辑元素',
            type: 'primary',
            // authKey: 'edit-element',
          },
          {
            key: 'delete',
            onClick: (props) => modalChange('delete', '删除元素', props),
            text: '删除元素',
            type: 'primary',
            danger: true,
            // authKey: 'delete-element',
          },
        ];
        return <OperateRender data={data} record={record} />;
      },
    },
  ];

  const getTableData = async () => {
    const data = {
      current: pagination.current,
      pageSize: pagination.pageSize,
      ...searchFormData,
    };
    const res = await runAsync(data);
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
    console.log(values, 'values');
    setPagination({ current: 1, pageSize: 10, total: 0 });
    setSearchFormData({ ...values });
  };

  const modalChange = async (type, title, record) => {
    setModalConfig({ ...modalConfig, title, open: true });
    setModalType(type);
    setTableRecord(record);
  };
  const onModalClose = () => {
    formRefModal.current?.resetFields();
    setModalConfig(iniModalConifg);
    setModalType();
    setTableRecord({});
  };
  const onModalOk = async () => {
    console.log(modalType, 'modalType');
    console.log(tableRecord, 'tableRecord');
    formRefModal.current.validateFields().then(async (values) => {
      console.log(values, 'values');
    });
  };
  return (
    <>
      <Divider orientation="left">{'modal表单'}</Divider>
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
        rowKey={'id'}
        loading={loading}
        title={'元素管理列表'}
        onChange={onChange}
        toolBarRender={
          <AuthButton
            type={'primary'}
            onClick={() => modalChange('create', '添加元素')}
            // authKey="add-element"
          >
            添加元素
          </AuthButton>
        }
        pagination={pagination}
      />
      <CustomModal {...modalConfig} draggable={true} onOk={onModalOk} onCancel={onModalClose}>
        123321
      </CustomModal>
    </>
  );
};

export default Index;
