import Mock from 'mockjs';

const Random = Mock.Random;

const dictTypeList = [
  { id: '1', dictName: '用户状态', dictType: 'user_status', status: '1', sort: 1, remark: '用户状态列表', createTime: Random.datetime('yyyy-MM-dd HH:mm:ss') },
  { id: '2', dictName: '部门', dictType: 'department', status: '1', sort: 2, remark: '部门列表', createTime: Random.datetime('yyyy-MM-dd HH:mm:ss') },
  { id: '3', dictName: '角色', dictType: 'role', status: '1', sort: 3, remark: '角色列表', createTime: Random.datetime('yyyy-MM-dd HH:mm:ss') },
  { id: '4', dictName: '性别', dictType: 'gender', status: '1', sort: 4, remark: '性别列表', createTime: Random.datetime('yyyy-MM-dd HH:mm:ss') },
  { id: '5', dictName: '角色状态', dictType: 'role_status', status: '1', sort: 5, remark: '角色状态列表', createTime: Random.datetime('yyyy-MM-dd HH:mm:ss') },
  { id: '6', dictName: '角色类型', dictType: 'role_type', status: '1', sort: 6, remark: '角色类型列表', createTime: Random.datetime('yyyy-MM-dd HH:mm:ss') },
  { id: '7', dictName: '菜单状态', dictType: 'menu_status', status: '1', sort: 7, remark: '菜单状态列表', createTime: Random.datetime('yyyy-MM-dd HH:mm:ss') },
  { id: '8', dictName: '菜单类型', dictType: 'menu_type', status: '1', sort: 8, remark: '菜单类型列表', createTime: Random.datetime('yyyy-MM-dd HH:mm:ss') },
  { id: '9', dictName: '字典状态', dictType: 'dict_status', status: '1', sort: 9, remark: '字典状态列表', createTime: Random.datetime('yyyy-MM-dd HH:mm:ss') },
  { id: '10', dictName: '是否', dictType: 'yes_no', status: '1', sort: 10, remark: '是否列表', createTime: Random.datetime('yyyy-MM-dd HH:mm:ss') },
  { id: '11', dictName: '通知类型', dictType: 'notice_type', status: '0', sort: 11, remark: '通知类型列表（停用）', createTime: Random.datetime('yyyy-MM-dd HH:mm:ss') },
  { id: '12', dictName: '操作类型', dictType: 'operate_type', status: '1', sort: 12, remark: '操作类型列表', createTime: Random.datetime('yyyy-MM-dd HH:mm:ss') },
  { id: '13', dictName: '部门状态', dictType: 'dept_status', status: '1', sort: 13, remark: '部门状态列表', createTime: Random.datetime('yyyy-MM-dd HH:mm:ss') },
];

const dictDataList = [
  { id: '1-1', dictType: 'user_status', dictLabel: '启用', dictValue: '1', sort: 1, status: '1', remark: '' },
  { id: '1-2', dictType: 'user_status', dictLabel: '禁用', dictValue: '0', sort: 2, status: '1', remark: '' },
  { id: '2-1', dictType: 'department', dictLabel: '技术部', dictValue: '1', sort: 1, status: '1', remark: '' },
  { id: '2-2', dictType: 'department', dictLabel: '产品部', dictValue: '2', sort: 2, status: '1', remark: '' },
  { id: '2-3', dictType: 'department', dictLabel: '运营部', dictValue: '3', sort: 3, status: '1', remark: '' },
  { id: '2-4', dictType: 'department', dictLabel: '市场部', dictValue: '4', sort: 4, status: '1', remark: '' },
  { id: '2-5', dictType: 'department', dictLabel: '人事部', dictValue: '5', sort: 5, status: '1', remark: '' },
  { id: '3-1', dictType: 'role', dictLabel: '超级管理员', dictValue: '1', sort: 1, status: '1', remark: '' },
  { id: '3-2', dictType: 'role', dictLabel: '普通用户', dictValue: '2', sort: 2, status: '1', remark: '' },
  { id: '3-3', dictType: 'role', dictLabel: '运维人员', dictValue: '3', sort: 3, status: '1', remark: '' },
  { id: '4-1', dictType: 'gender', dictLabel: '男', dictValue: '1', sort: 1, status: '1', remark: '' },
  { id: '4-2', dictType: 'gender', dictLabel: '女', dictValue: '2', sort: 2, status: '1', remark: '' },
  { id: '5-1', dictType: 'role_status', dictLabel: '启用', dictValue: '1', sort: 1, status: '1', remark: '' },
  { id: '5-2', dictType: 'role_status', dictLabel: '禁用', dictValue: '0', sort: 2, status: '1', remark: '' },
  { id: '6-1', dictType: 'role_type', dictLabel: '系统角色', dictValue: '1', sort: 1, status: '1', remark: '' },
  { id: '6-2', dictType: 'role_type', dictLabel: '业务角色', dictValue: '2', sort: 2, status: '1', remark: '' },
  { id: '6-3', dictType: 'role_type', dictLabel: '自定义角色', dictValue: '3', sort: 3, status: '1', remark: '' },
  { id: '7-1', dictType: 'menu_status', dictLabel: '启用', dictValue: '1', sort: 1, status: '1', remark: '' },
  { id: '7-2', dictType: 'menu_status', dictLabel: '停用', dictValue: '0', sort: 2, status: '1', remark: '' },
  { id: '8-1', dictType: 'menu_type', dictLabel: '目录', dictValue: '1', sort: 1, status: '1', remark: '' },
  { id: '8-2', dictType: 'menu_type', dictLabel: '菜单', dictValue: '2', sort: 2, status: '1', remark: '' },
  { id: '8-3', dictType: 'menu_type', dictLabel: '按钮', dictValue: '3', sort: 3, status: '1', remark: '' },
  { id: '9-1', dictType: 'dict_status', dictLabel: '启用', dictValue: '1', sort: 1, status: '1', remark: '' },
  { id: '9-2', dictType: 'dict_status', dictLabel: '停用', dictValue: '0', sort: 2, status: '1', remark: '' },
  { id: '10-1', dictType: 'yes_no', dictLabel: '是', dictValue: '1', sort: 1, status: '1', remark: '' },
  { id: '10-2', dictType: 'yes_no', dictLabel: '否', dictValue: '0', sort: 2, status: '1', remark: '' },
  { id: '11-1', dictType: 'notice_type', dictLabel: '通知', dictValue: '1', sort: 1, status: '1', remark: '' },
  { id: '11-2', dictType: 'notice_type', dictLabel: '公告', dictValue: '2', sort: 2, status: '1', remark: '' },
  { id: '12-1', dictType: 'operate_type', dictLabel: '新增', dictValue: '1', sort: 1, status: '1', remark: '' },
  { id: '12-2', dictType: 'operate_type', dictLabel: '修改', dictValue: '2', sort: 2, status: '1', remark: '' },
  { id: '12-3', dictType: 'operate_type', dictLabel: '删除', dictValue: '3', sort: 3, status: '1', remark: '' },
  { id: '13-1', dictType: 'dept_status', dictLabel: '启用', dictValue: '1', sort: 1, status: '1', remark: '' },
  { id: '13-2', dictType: 'dept_status', dictLabel: '停用', dictValue: '0', sort: 2, status: '1', remark: '' },
];

const dictAnalysisData = [
  {
    url: '/dev-api/mock/dict/type/list',
    method: 'get',
    timeout: 300,
    response: ({ query }) => {
      const { current = 1, pageSize = 10, dictName, dictType, status } = query;

      let filtered = [...dictTypeList];

      if (dictName) {
        filtered = filtered.filter((item) => item.dictName.includes(dictName));
      }
      if (dictType) {
        filtered = filtered.filter((item) => item.dictType.includes(dictType));
      }
      if (status) {
        filtered = filtered.filter((item) => item.status === status);
      }

      const start = (Number(current) - 1) * Number(pageSize);
      const end = start + Number(pageSize);
      const list = filtered.slice(start, end);

      return {
        code: 200,
        message: '操作成功',
        data: {
          list,
          total: filtered.length,
        },
      };
    },
  },
  {
    url: '/dev-api/mock/dict/type/create',
    method: 'post',
    timeout: 300,
    response: () => ({
      code: 200,
      message: '创建成功',
      data: null,
    }),
  },
  {
    url: '/dev-api/mock/dict/type/update',
    method: 'post',
    timeout: 300,
    response: () => ({
      code: 200,
      message: '更新成功',
      data: null,
    }),
  },
  {
    url: '/dev-api/mock/dict/type/delete',
    method: 'post',
    timeout: 300,
    response: () => ({
      code: 200,
      message: '删除成功',
      data: null,
    }),
  },
  {
    url: '/dev-api/mock/dict/data/list',
    method: 'get',
    timeout: 300,
    response: ({ query }) => {
      const { current = 1, pageSize = 10, dictType, dictLabel, status } = query;

      let filtered = [...dictDataList];

      if (dictType) {
        filtered = filtered.filter((item) => item.dictType === dictType);
      }
      if (dictLabel) {
        filtered = filtered.filter((item) => item.dictLabel.includes(dictLabel));
      }
      if (status) {
        filtered = filtered.filter((item) => item.status === status);
      }

      const start = (Number(current) - 1) * Number(pageSize);
      const end = start + Number(pageSize);
      const list = filtered.slice(start, end);

      return {
        code: 200,
        message: '操作成功',
        data: {
          list,
          total: filtered.length,
        },
      };
    },
  },
  {
    url: '/dev-api/mock/dict/data/create',
    method: 'post',
    timeout: 300,
    response: () => ({
      code: 200,
      message: '创建成功',
      data: null,
    }),
  },
  {
    url: '/dev-api/mock/dict/data/update',
    method: 'post',
    timeout: 300,
    response: () => ({
      code: 200,
      message: '更新成功',
      data: null,
    }),
  },
  {
    url: '/dev-api/mock/dict/data/delete',
    method: 'post',
    timeout: 300,
    response: () => ({
      code: 200,
      message: '删除成功',
      data: null,
    }),
  },
];

export default dictAnalysisData;
