import Mock from 'mockjs';

const Random = Mock.Random;

const deptList = [
  { id: '1', pid: '0', deptName: '总公司', status: '1', sort: 1, leader: '张总', phone: '13800000001', email: 'zhangzong@example.com', remark: '总公司', createTime: Random.datetime('yyyy-MM-dd HH:mm:ss') },
  { id: '2', pid: '1', deptName: '技术部', status: '1', sort: 1, leader: '李工', phone: '13800000002', email: 'ligong@example.com', remark: '', createTime: Random.datetime('yyyy-MM-dd HH:mm:ss') },
  { id: '3', pid: '1', deptName: '产品部', status: '1', sort: 2, leader: '王产品', phone: '13800000003', email: 'wangchanpin@example.com', remark: '', createTime: Random.datetime('yyyy-MM-dd HH:mm:ss') },
  { id: '4', pid: '1', deptName: '运营部', status: '1', sort: 3, leader: '赵运营', phone: '13800000004', email: 'zhaoyunying@example.com', remark: '', createTime: Random.datetime('yyyy-MM-dd HH:mm:ss') },
  { id: '5', pid: '1', deptName: '市场部', status: '1', sort: 4, leader: '钱市场', phone: '13800000005', email: 'qianshichang@example.com', remark: '', createTime: Random.datetime('yyyy-MM-dd HH:mm:ss') },
  { id: '6', pid: '1', deptName: '人事部', status: '1', sort: 5, leader: '孙人事', phone: '13800000006', email: 'sunrenshi@example.com', remark: '', createTime: Random.datetime('yyyy-MM-dd HH:mm:ss') },
  { id: '2-1', pid: '2', deptName: '前端组', status: '1', sort: 1, leader: '周前端', phone: '13800000021', email: 'zhouqianduan@example.com', remark: '', createTime: Random.datetime('yyyy-MM-dd HH:mm:ss') },
  { id: '2-2', pid: '2', deptName: '后端组', status: '1', sort: 2, leader: '吴后端', phone: '13800000022', email: 'wuhouduan@example.com', remark: '', createTime: Random.datetime('yyyy-MM-dd HH:mm:ss') },
  { id: '2-3', pid: '2', deptName: '测试组', status: '0', sort: 3, leader: '郑测试', phone: '13800000023', email: 'zhengceshi@example.com', remark: '暂停运作', createTime: Random.datetime('yyyy-MM-dd HH:mm:ss') },
  { id: '3-1', pid: '3', deptName: '产品设计组', status: '1', sort: 1, leader: '', phone: '', email: '', remark: '', createTime: Random.datetime('yyyy-MM-dd HH:mm:ss') },
  { id: '3-2', pid: '3', deptName: 'UI设计组', status: '1', sort: 2, leader: '', phone: '', email: '', remark: '', createTime: Random.datetime('yyyy-MM-dd HH:mm:ss') },
];

const deptAnalysisData = [
  {
    url: '/dev-api/mock/dept/list',
    method: 'get',
    timeout: 300,
    response: ({ query }) => {
      const { deptName, status } = query;

      let filtered = [...deptList];

      if (deptName) {
        filtered = filtered.filter((item) => item.deptName.includes(deptName));
      }
      if (status) {
        filtered = filtered.filter((item) => item.status === status);
      }

      return {
        code: 200,
        message: '操作成功',
        data: filtered,
      };
    },
  },
  {
    url: '/dev-api/mock/dept/create',
    method: 'post',
    timeout: 300,
    response: () => ({
      code: 200,
      message: '创建成功',
      data: null,
    }),
  },
  {
    url: '/dev-api/mock/dept/update',
    method: 'post',
    timeout: 300,
    response: () => ({
      code: 200,
      message: '更新成功',
      data: null,
    }),
  },
  {
    url: '/dev-api/mock/dept/delete',
    method: 'post',
    timeout: 300,
    response: () => ({
      code: 200,
      message: '删除成功',
      data: null,
    }),
  },
];

export default deptAnalysisData;
