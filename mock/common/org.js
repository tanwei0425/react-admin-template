import Mock from 'mockjs';

const Random = Mock.Random;

const orgTypeKeys = ['1', '2', '3']; // 1=公司 2=部门 3=小组
const statusKeys = ['1', '0'];

const orgList = Array.from({ length: 38 }).map((_, i) => ({
  id: String(i + 1),
  code: `ORG${String(i + 1).padStart(4, '0')}`,
  name: Random.ctitle(4, 8) + (i % 3 === 0 ? '分公司' : i % 3 === 1 ? '部门' : '小组'),
  type: orgTypeKeys[i % 3],
  leader: Random.cname(),
  phone: Mock.mock(/^1[3-9]\d{9}$/),
  status: statusKeys[i % 2],
  createTime: Random.datetime('yyyy-MM-dd HH:mm:ss'),
  remark: i % 4 === 0 ? Random.csentence(10, 20) : '',
}));

const orgAnalysisData = [
  {
    url: '/dev-api/mock/org/list',
    method: 'get',
    timeout: 300,
    response: ({ query }) => {
      const { current = 1, pageSize = 10, code, name, type, leader, status } = query;

      let filtered = [...orgList];

      if (code) {
        filtered = filtered.filter((item) => item.code.includes(code));
      }
      if (name) {
        filtered = filtered.filter((item) => item.name.includes(name));
      }
      if (type) {
        filtered = filtered.filter((item) => item.type === type);
      }
      if (leader) {
        filtered = filtered.filter((item) => item.leader.includes(leader));
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
    url: '/dev-api/mock/org/create',
    method: 'post',
    timeout: 300,
    response: () => ({
      code: 200,
      message: '创建成功',
      data: null,
    }),
  },
  {
    url: '/dev-api/mock/org/update',
    method: 'post',
    timeout: 300,
    response: () => ({
      code: 200,
      message: '更新成功',
      data: null,
    }),
  },
  {
    url: '/dev-api/mock/org/delete',
    method: 'post',
    timeout: 300,
    response: () => ({
      code: 200,
      message: '删除成功',
      data: null,
    }),
  },
];

export default orgAnalysisData;
