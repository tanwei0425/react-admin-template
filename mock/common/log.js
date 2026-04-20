import Mock from 'mockjs';

const Random = Mock.Random;

const logTypeKeys = ['1', '2', '3', '4'];
const logStatusKeys = ['1', '0'];

const logList = Array.from({ length: 50 }).map((_, i) => ({
  id: String(i + 1),
  title: ['用户登录', '用户登出', '新增用户', '编辑用户', '删除用户', '新增角色', '编辑角色', '删除角色', '导出数据', '导入数据', '重置密码', '分配角色', '授权操作'][i % 13],
  logType: logTypeKeys[i % logTypeKeys.length],
  moduleName: ['系统管理', '用户管理', '角色管理', '菜单管理', '部门管理', '字典管理', '日志管理'][i % 7],
  operationName: ['登录', '新增', '编辑', '删除', '导出', '导入', '授权', '重置'][i % 8],
  method: ['POST', 'GET', 'PUT', 'DELETE'][i % 4],
  requestUrl: `/api/system/${['user', 'role', 'menu', 'dept', 'dict', 'log'][i % 6]}/${['list', 'create', 'update', 'delete', 'export', 'import'][i % 6]}`,
  requestMethod: ['POST', 'GET', 'PUT', 'DELETE'][i % 4],
  requestParams: i % 3 === 0 ? JSON.stringify({ id: i + 1, name: Random.cname() }) : '',
  requestIp: Random.ip(),
  requestLocation: ['北京市', '上海市', '广州市', '深圳市', '杭州市', '成都市', '武汉市', '南京市'][i % 8],
  browser: ['Chrome', 'Firefox', 'Safari', 'Edge'][i % 4],
  os: ['Windows 10', 'Windows 11', 'macOS', 'Linux', 'Android', 'iOS'][i % 6],
  status: logStatusKeys[i % 2],
  errorMsg: i % 5 === 0 ? '操作失败：权限不足' : '',
  operatorName: Random.cname(),
  operatorId: String((i % 10) + 1),
  createTime: Random.datetime('yyyy-MM-dd HH:mm:ss'),
  duration: Math.floor(Math.random() * 1000) + 50,
}));

const logAnalysisData = [
  {
    url: '/dev-api/mock/log/list',
    method: 'get',
    timeout: 300,
    response: ({ query }) => {
      const { current = 1, pageSize = 10, title, logType, moduleName, status, operatorName, createTime } = query;

      let filtered = [...logList];

      if (title) {
        filtered = filtered.filter((item) => item.title.includes(title));
      }
      if (logType) {
        filtered = filtered.filter((item) => item.logType === logType);
      }
      if (moduleName) {
        filtered = filtered.filter((item) => item.moduleName.includes(moduleName));
      }
      if (status) {
        filtered = filtered.filter((item) => item.status === status);
      }
      if (operatorName) {
        filtered = filtered.filter((item) => item.operatorName.includes(operatorName));
      }
      if (createTime && Array.isArray(createTime) && createTime.length === 2) {
        filtered = filtered.filter((item) => {
          const time = item.createTime;
          return time >= createTime[0] && time <= createTime[1];
        });
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
    url: '/dev-api/mock/log/delete',
    method: 'post',
    timeout: 300,
    response: () => ({
      code: 200,
      message: '删除成功',
      data: null,
    }),
  },
  {
    url: '/dev-api/mock/log/clear',
    method: 'post',
    timeout: 300,
    response: () => ({
      code: 200,
      message: '清空成功',
      data: null,
    }),
  },
  {
    url: '/dev-api/mock/log/batchDelete',
    method: 'post',
    timeout: 300,
    response: () => ({
      code: 200,
      message: '批量删除成功',
      data: null,
    }),
  },
];

export default logAnalysisData;
