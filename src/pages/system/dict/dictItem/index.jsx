import { useEffect, useState, useRef } from 'react';
import { Tag, App, Button } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import CustomModal from '@components/customModal';
import CustomTable, { EnhancedOperateRender } from '@components/customTable';
import AuthButton from '@components/authButton';
import { tableColumnToDict } from '@utils';
import {
  useDictDataListApi,
  useDictDataCreateApi,
  useDictDataUpdateApi,
  useDictDataDeleteApi,
} from '@api/dict';
import DictItemForm from './dictItemForm';

const iniModalConfig = {
  title: '操作',
  open: false,
  width: 600,
};

const statusColorMap = { 1: 'green', 0: 'red' };

const DictDataPage = () => {
  const { message, modal: modalApi } = App.useApp();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dictType = searchParams.get('dictType') || '';
  const dictName = searchParams.get('dictName') || '';

  const [modalConfig, setModalConfig] = useState(iniModalConfig);
  const [modalType, setModalType] = useState();
  const [tableRecord, setTableRecord] = useState({});
  const [dataSource, setDataSource] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
  const formRefModal = useRef();

  const { dictData } = useSelector((state) => state.userInfo);
  const { loading, runAsync: runList } = useDictDataListApi();
  const { runAsync: runCreate } = useDictDataCreateApi();
  const { runAsync: runUpdate } = useDictDataUpdateApi();
  const { runAsync: runDelete } = useDictDataDeleteApi();

  const dictLabel = (dictKey, value) => tableColumnToDict(dictData[dictKey], value) || value;

  const columns = [
    {
      title: '字典标签',
      dataIndex: 'dictLabel',
      ellipsis: true,
    },
    {
      title: '字典值',
      dataIndex: 'dictValue',
      ellipsis: true,
      copyable: true,
    },
    {
      title: '排序',
      dataIndex: 'sort',
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (text) => <Tag color={statusColorMap[text]}>{dictLabel('dict_status', text)}</Tag>,
    },
    {
      title: '操作',
      dataIndex: 'action',
      fixed: 'right',
      width: 130,
      render: (_, record) => {
        const data = [
          {
            key: 'update',
            onClick: () => modalChange('update', '编辑字典数据', record),
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
    if (!dictType) return;
    const data = {
      current: pagination.current,
      pageSize: pagination.pageSize,
      dictType,
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
    if (dictType) {
      getTableData();
    }
  }, [pagination?.current, pagination?.pageSize, dictType]);

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
      content: `确定要删除字典数据「${record.dictLabel}」吗？`,
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

  return (
    <>
      <CustomTable
        dataSource={dataSource}
        columns={columns}
        rowKey="id"
        loading={loading}
        title={`字典数据${dictName ? ` - ${dictName}（${dictType}）` : ''}`}
        onChange={onChange}
        toolBarRender={
          <>
            <Button onClick={() => navigate('/system/dict')}>返回字典列表</Button>
            <AuthButton type="primary" onClick={() => modalChange('create', '添加字典数据')}>
              添加字典数据
            </AuthButton>
          </>
        }
        scroll={{ x: 700 }}
        pagination={pagination}
      />
      <CustomModal {...modalConfig} draggable={true} onOk={onModalOk} onCancel={onModalClose}>
        <DictItemForm
          name="dictItemForm"
          formRef={formRefModal}
          tableRecord={tableRecord}
          dictType={dictType}
        />
      </CustomModal>
    </>
  );
};

export default DictDataPage;
