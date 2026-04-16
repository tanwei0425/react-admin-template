import { useEffect, useState, useRef } from 'react';
import { Tag, message, Modal, Button, Space } from 'antd';
import { useSelector } from 'react-redux';
import CustomModal from '@components/customModal';
import CustomDrawer from '@components/customDrawer';
import CustomTable, { EnhancedOperateRender } from '@components/customTable';
import AuthButton from '@components/authButton';
import SearchForm from '@components/searchForm';
import { tableColumnToDict, arrayToTree } from '@utils';
import { useMenuListApi, useMenuCreateApi, useMenuUpdateApi, useMenuDeleteApi } from '@api/menu';
import MenuForm from './menuForm';
import MenuDetail from './menuDetail';

const iniModalConfig = {
  title: '操作',
  open: false,
  width: 600,
};

const initSearchFormData = {};

const statusColorMap = { 1: 'green', 0: 'red' };

const Index = () => {
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
  const { loading, runAsync: runList } = useMenuListApi();
  const { runAsync: runCreate } = useMenuCreateApi();
  const { runAsync: runUpdate } = useMenuUpdateApi();
  const { runAsync: runDelete } = useMenuDeleteApi();

  const dictOptions = (dictKey) =>
    (dictData[dictKey] || []).map((item) => ({ key: item.key, value: item.value }));

  const dictLabel = (dictKey, value) => tableColumnToDict(dictData[dictKey], value) || value;

  const searchFormSchema = [
    {
      name: 'name',
      label: '菜单名称',
      fieldProps: {
        componentType: 'input',
        placeholder: '请输入菜单名称',
      },
    },
    {
      name: 'status',
      label: '状态',
      fieldProps: {
        componentType: 'select',
        options: dictOptions('menu_status'),
        placeholder: '请选择状态',
      },
    },
    {
      name: 'menuType',
      label: '菜单类型',
      fieldProps: {
        componentType: 'select',
        options: dictOptions('menu_type'),
        placeholder: '请选择菜单类型',
      },
    },
  ];

  const columns = [
    {
      title: '菜单名称',
      dataIndex: 'name',
      width: 180,
      ellipsis: true,
    },
     {
      title: '菜单类型',
      dataIndex: 'menuType',
      width: 80,
      render: (text) => dictLabel('menu_type', text),
    },
    {
      title: '权限字符',
      dataIndex: 'permission',
      ellipsis: true,
      width: 160,
      copyable: true,
    },
    {
      title: '路由路径',
      dataIndex: 'path',
      ellipsis: true,
       width: 150,
    },
    {
      title: '组件路径',
      dataIndex: 'cmpPath',
      ellipsis: true,
       width: 150,
    },
   
    {
      title: '排序',
      dataIndex: 'sort',
      width: 60,
    },
    {
      title: '是否显示',
      dataIndex: 'isShow',
      width: 70,
      render: (text) => <Tag color={text === '1' ? 'green' : 'red'}>{text === '1' ? '显示' : '隐藏'}</Tag>,
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 60,
      render: (text) => <Tag color={statusColorMap[text]}>{dictLabel('menu_status', text)}</Tag>,
    },
    {
      title: '操作',
      dataIndex: 'action',
      fixed: 'right',
      width: 270,
      render: (_, record) => {
        const data = [
          {
            key: 'view',
            onClick: () => handleView(record),
            text: '查看',
          },
          {
            key: 'addChild',
            onClick: () => modalChange('create', '添加子菜单', { pid: record.id }),
            text: '添加子菜单',
          },
          {
            key: 'update',
            onClick: () => modalChange('update', '编辑菜单', record),
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
    Modal.confirm({
      title: '删除确认',
      content: `确定要删除菜单「${record.name}」吗？删除后不可恢复。`,
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
        title="菜单管理列表"
        scroll={{ x: 1300 }}
        pagination={false}
        expandable={{
          expandedRowKeys,
          onExpandedRowsChange: setExpandedRowKeys,
        }}
        toolBarRender={
          <Space size="middle">
            <AuthButton type="primary" onClick={() => modalChange('create', '添加菜单', { pid: '0' })}>
              添加菜单
            </AuthButton>
            <Button onClick={handleExpandAll}>全部展开</Button>
            <Button onClick={handleCollapseAll}>全部关闭</Button>
          </Space>
        }
      />
      <CustomModal {...modalConfig} draggable={true} onOk={onModalOk} onCancel={onModalClose}>
        <MenuForm
          name="menuForm"
          formRef={formRefModal}
          modalType={modalType}
          tableRecord={tableRecord}
          flatList={flatList}
        />
      </CustomModal>
      <CustomDrawer
        title="菜单详情"
        size={680}
        onClose={onDrawerClose}
        open={drawerOpen}
        showOkButton={false}
        cancelText="关闭"
      >
        <MenuDetail record={tableRecord} flatList={flatList} />
      </CustomDrawer>
    </>
  );
};

export default Index;
