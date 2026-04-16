import Mock from 'mockjs';

const Random = Mock.Random;

const statusKeys = ['1', '0'];
const roleTypeKeys = ['1', '2', '3'];

const roleList = Array.from({ length: 18 }).map((_, i) => ({
  id: String(i + 1),
  roleName: ['超级管理员测试超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员超级管理员测试超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超级管理员测试超长超长超长超长超级管理员测试超长超长超级管理员测试超长超长测试超长超长超长超长超级管理员测试超长超长超级管理员测试超长超长', '普通用户', '运维人员', '开发人员', '产品经理', '审计员', '测试人员', '项目经理', '技术总监', '运营主管', '客服专员', '数据分析师', '架构师', 'DBA', '安全工程师', '前端开发', '后端开发', '全栈开发'][i],
  roleCode: ['admin', 'user', 'ops', 'dev', 'pm', 'auditor', 'tester', 'project_manager测试超长超长超长project_manager测试超长超长超长', 'cto', 'ops_lead', 'cs', 'analyst', 'architect', 'dba', 'security', 'frontend', 'backend', 'fullstack'][i],
  roleType: roleTypeKeys[i % roleTypeKeys.length],
  status: i === 0 ? '1' : statusKeys[i % 2],
  sort: i + 1,
  userIds: [String((i % 5) + 1), String((i % 5) + 6)],
  remark: i % 3 === 0 ? Random.csentence(10, 20) : '',
  createTime: Random.datetime('yyyy-MM-dd HH:mm:ss'),
}));

const roleAnalysisData = [
  {
    url: '/dev-api/mock/role/list',
    method: 'get',
    timeout: 300,
    response: ({ query }) => {
      const { current = 1, pageSize = 10, roleName, roleCode, status, roleType } = query;

      let filtered = [...roleList];

      if (roleName) {
        filtered = filtered.filter((item) => item.roleName.includes(roleName));
      }
      if (roleCode) {
        filtered = filtered.filter((item) => item.roleCode.includes(roleCode));
      }
      if (status) {
        filtered = filtered.filter((item) => item.status === status);
      }
      if (roleType) {
        filtered = filtered.filter((item) => item.roleType === roleType);
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
    url: '/dev-api/mock/role/create',
    method: 'post',
    timeout: 300,
    response: () => ({
      code: 200,
      message: '创建成功',
      data: null,
    }),
  },
  {
    url: '/dev-api/mock/role/update',
    method: 'post',
    timeout: 300,
    response: () => ({
      code: 200,
      message: '更新成功',
      data: null,
    }),
  },
  {
    url: '/dev-api/mock/role/delete',
    method: 'post',
    timeout: 300,
    response: () => ({
      code: 200,
      message: '删除成功',
      data: null,
    }),
  },
  {
    url: '/dev-api/mock/role/allList',
    method: 'get',
    timeout: 200,
    response: () => ({
      code: 200,
      message: '操作成功',
      data: roleList.map(({ id, roleName, roleCode, status }) => ({ id, roleName, roleCode, status })),
    }),
  },
  {
    url: '/dev-api/mock/role/assignUsers',
    method: 'post',
    timeout: 300,
    response: () => ({
      code: 200,
      message: '分配用户成功',
      data: null,
    }),
  },
];

export default roleAnalysisData;
