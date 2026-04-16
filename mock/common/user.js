import Mock from 'mockjs';

const Random = Mock.Random;

const genderKeys = ['1', '2'];
const statusKeys = ['1', '0'];
const departmentKeys = ['1', '2', '3', '4', '5'];
const roleKeys = ['1', '2', '3', '4', '5'];

const userList = Array.from({ length: 56 }).map((_, i) => ({
  id: String(i + 1),
  username:
    i % 2 === 0
      ? `user_${String(i + 1).padStart(3, '0')}`
      : `user_${String(i + 1).padStart(3, '0')}测试超长测试超长测试超长测试超长`,
  nickname: Random.cname(),
  gender: genderKeys[i % 2],
  phone: Mock.mock(/^1[3-9]\d{9}$/),
  email: Random.email(),
  department: departmentKeys[i % departmentKeys.length],
  role: roleKeys[i % roleKeys.length],
  roleIds: [roleKeys[i % roleKeys.length], roleKeys[(i + 1) % roleKeys.length]],
  status: statusKeys[i % 2],
  createTime: Random.datetime('yyyy-MM-dd HH:mm:ss'),
  remark: i % 3 === 0 ? Random.csentence(10, 20) : '',
}));

const userAnalysisData = [
  {
    url: '/dev-api/mock/user/list',
    method: 'get',
    timeout: 300,
    response: ({ query }) => {
      const { current = 1, pageSize = 10, username, nickname, status, department } = query;

      let filtered = [...userList];

      if (username) {
        filtered = filtered.filter((item) => item.username.includes(username));
      }
      if (nickname) {
        filtered = filtered.filter((item) => item.nickname.includes(nickname));
      }
      if (status) {
        filtered = filtered.filter((item) => item.status === status);
      }
      if (department) {
        filtered = filtered.filter((item) => item.department === department);
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
    url: '/dev-api/mock/user/create',
    method: 'post',
    timeout: 300,
    response: () => ({
      code: 200,
      message: '创建成功',
      data: null,
    }),
  },
  {
    url: '/dev-api/mock/user/update',
    method: 'post',
    timeout: 300,
    response: () => ({
      code: 200,
      message: '更新成功',
      data: null,
    }),
  },
  {
    url: '/dev-api/mock/user/delete',
    method: 'post',
    timeout: 300,
    response: () => ({
      code: 200,
      message: '删除成功',
      data: null,
    }),
  },
  {
    url: '/dev-api/mock/user/resetPwd',
    method: 'post',
    timeout: 300,
    response: () => ({
      code: 200,
      message: '密码已重置为默认密码',
      data: null,
    }),
  },
  {
    url: '/dev-api/mock/user/allList',
    method: 'get',
    timeout: 200,
    response: () => ({
      code: 200,
      message: '操作成功',
      data: userList.map(({ id, username, nickname, status }) => ({ id, username, nickname, status })),
    }),
  },
  {
    url: '/dev-api/mock/user/assignRoles',
    method: 'post',
    timeout: 300,
    response: () => ({
      code: 200,
      message: '分配角色成功',
      data: null,
    }),
  },
];

export default userAnalysisData;
