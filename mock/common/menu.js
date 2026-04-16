import Mock from 'mockjs';

const Random = Mock.Random;

const menuList = [
  { id: '1', pid: '0', name: '首页', path: '/', icon: 'HomeOutlined', cmpPath: 'pages/home', menuType: '1', isShow: '1', isRouter: '1', permission: '', sort: 1, status: '1', createTime: Random.datetime('yyyy-MM-dd HH:mm:ss'), remark: '' },
  { id: '998', pid: '0', name: 'demo', path: '/demo', icon: 'HomeOutlined', cmpPath: 'pages/demo', menuType: '1', isShow: '1', isRouter: '1', permission: '', sort: 1, status: '1', createTime: Random.datetime('yyyy-MM-dd HH:mm:ss'), remark: '示例页面' },
  { id: '2', pid: '0', name: '统计分析', path: '/statistics', icon: 'IdcardOutlined', cmpPath: '', menuType: '1', isShow: '1', isRouter: '1', permission: '', sort: 2, status: '1', createTime: Random.datetime('yyyy-MM-dd HH:mm:ss'), remark: '' },
  { id: '2-1', pid: '2', name: '集群统计', path: '/statistics/colony', icon: '', cmpPath: 'pages/statistics/colony', menuType: '2', isShow: '1', isRouter: '1', permission: 'statistics:colony:list', sort: 1, status: '1', createTime: Random.datetime('yyyy-MM-dd HH:mm:ss'), remark: '' },
  { id: '2-2', pid: '2', name: '系统统计', path: '/statistics/system', icon: '', cmpPath: 'pages/statistics/system', menuType: '2', isShow: '1', isRouter: '1', permission: 'statistics:system:list', sort: 2, status: '1', createTime: Random.datetime('yyyy-MM-dd HH:mm:ss'), remark: '' },
  { id: '2-3', pid: '2', name: 'API统计', path: '/statistics/api', icon: '', cmpPath: 'pages/statistics/api', menuType: '2', isShow: '1', isRouter: '1', permission: 'statistics:api:list', sort: 3, status: '1', createTime: Random.datetime('yyyy-MM-dd HH:mm:ss'), remark: '' },
  { id: '2-4', pid: '2', name: '日志统计', path: '/statistics/log', icon: '', cmpPath: 'pages/statistics/log', menuType: '2', isShow: '1', isRouter: '1', permission: 'statistics:log:list', sort: 4, status: '0', createTime: Random.datetime('yyyy-MM-dd HH:mm:ss'), remark: '暂未开放' },
  { id: '5', pid: '0', name: 'API管理', path: '/gatewayApi', icon: 'IdcardOutlined', cmpPath: '', menuType: '1', isShow: '1', isRouter: '1', permission: '', sort: 3, status: '1', createTime: Random.datetime('yyyy-MM-dd HH:mm:ss'), remark: '' },
  { id: '5-1', pid: '5', name: 'API管理', path: '/gatewayApi/api', icon: '', cmpPath: 'pages/gatewayApi/api', menuType: '2', isShow: '1', isRouter: '1', permission: 'gatewayApi:api:list', sort: 1, status: '1', createTime: Random.datetime('yyyy-MM-dd HH:mm:ss'), remark: '' },
  { id: '5-2', pid: '5', name: '系统管理', path: '/gatewayApi/system', icon: '', cmpPath: 'pages/gatewayApi/system', menuType: '2', isShow: '1', isRouter: '1', permission: 'gatewayApi:system:list', sort: 2, status: '1', createTime: Random.datetime('yyyy-MM-dd HH:mm:ss'), remark: '' },
  { id: '5-3', pid: '5', name: '上游管理', path: '/gatewayApi/upstream', icon: '', cmpPath: 'pages/gatewayApi/upstream', menuType: '2', isShow: '1', isRouter: '1', permission: 'gatewayApi:upstream:list', sort: 3, status: '1', createTime: Random.datetime('yyyy-MM-dd HH:mm:ss'), remark: '' },
  { id: '5-4', pid: '5', name: '消费者管理', path: '/gatewayApi/consumer', icon: '', cmpPath: 'pages/gatewayApi/consumer', menuType: '2', isShow: '1', isRouter: '1', permission: 'gatewayApi:consumer:list', sort: 4, status: '1', createTime: Random.datetime('yyyy-MM-dd HH:mm:ss'), remark: '' },
  { id: '5-5', pid: '5', name: '插件管理', path: '/gatewayApi/plugins', icon: '', cmpPath: 'pages/gatewayApi/plugins', menuType: '2', isShow: '1', isRouter: '1', permission: 'gatewayApi:plugins:list', sort: 5, status: '1', createTime: Random.datetime('yyyy-MM-dd HH:mm:ss'), remark: '' },
  { id: '6', pid: '0', name: '权限管理', path: '/system', icon: 'IdcardOutlined', cmpPath: '', menuType: '1', isShow: '1', isRouter: '1', permission: '', sort: 4, status: '1', createTime: Random.datetime('yyyy-MM-dd HH:mm:ss'), remark: '' },
  { id: '6-1', pid: '6', name: '用户管理', path: '/system/user', icon: '', cmpPath: 'pages/system/user', menuType: '2', isShow: '1', isRouter: '1', permission: 'system:user:list', sort: 1, status: '1', createTime: Random.datetime('yyyy-MM-dd HH:mm:ss'), remark: '' },
  { id: '6-2', pid: '6', name: '角色管理', path: '/system/role', icon: '', cmpPath: 'pages/system/role', menuType: '2', isShow: '1', isRouter: '1', permission: 'system:role:list', sort: 2, status: '1', createTime: Random.datetime('yyyy-MM-dd HH:mm:ss'), remark: '' },
  { id: '6-3', pid: '6', name: '菜单管理', path: '/system/menu', icon: '', cmpPath: 'pages/system/menu', menuType: '2', isShow: '1', isRouter: '1', permission: 'system:menu:list', sort: 3, status: '1', createTime: Random.datetime('yyyy-MM-dd HH:mm:ss'), remark: '' },
  { id: '6-4', pid: '6', name: '集群管理', path: '/system/colony', icon: '', cmpPath: 'pages/system/colony', menuType: '2', isShow: '1', isRouter: '1', permission: 'system:colony:list', sort: 4, status: '1', createTime: Random.datetime('yyyy-MM-dd HH:mm:ss'), remark: '' },
  { id: '7', pid: '0', name: '监控服务', path: '/monitor', icon: 'IdcardOutlined', cmpPath: '', menuType: '1', isShow: '1', isRouter: '1', permission: '', sort: 5, status: '1', createTime: Random.datetime('yyyy-MM-dd HH:mm:ss'), remark: '' },
  { id: '7-1', pid: '7', name: '系统监控', path: '/monitor/system', icon: '', cmpPath: 'pages/monitor/system', menuType: '2', isShow: '1', isRouter: '1', permission: 'monitor:system:list', sort: 1, status: '1', createTime: Random.datetime('yyyy-MM-dd HH:mm:ss'), remark: '' },
  { id: '7-2', pid: '7', name: '应用监控', path: '/monitor/app', icon: '', cmpPath: 'pages/monitor/app', menuType: '2', isShow: '1', isRouter: '1', permission: 'monitor:app:list', sort: 2, status: '0', createTime: Random.datetime('yyyy-MM-dd HH:mm:ss'), remark: '暂未开放' },
  { id: '3', pid: '0', name: '菜单测试', path: '/menuDemo', icon: 'IdcardOutlined', cmpPath: '', menuType: '1', isShow: '1', isRouter: '1', permission: '', sort: 0, status: '1', createTime: Random.datetime('yyyy-MM-dd HH:mm:ss'), remark: '' },
  { id: '3-1', pid: '3', name: '菜单测试1', path: '/menuDemo/menuDemoOne', icon: '', cmpPath: '', menuType: '1', isShow: '1', isRouter: '1', permission: '', sort: 0, status: '1', createTime: Random.datetime('yyyy-MM-dd HH:mm:ss'), remark: '' },
  { id: '3-1-1', pid: '3-1', name: '菜单测试3-1-1', path: '/menuDemo/menuDemoOne/menuDemoOneOne', icon: '', cmpPath: 'pages/menuDemo/menuDemoOne/menuDemoOneOne', menuType: '2', isShow: '1', isRouter: '1', permission: 'menuDemo:oneOne:list', sort: 0, status: '1', createTime: Random.datetime('yyyy-MM-dd HH:mm:ss'), remark: '' },
  { id: '3-1-2', pid: '3-1', name: '菜单测试3-1-2', path: '/menuDemo/menuDemoOne/menuDemoOneTwo', icon: '', cmpPath: 'pages/menuDemo/menuDemoOne/menuDemoOneTwo', menuType: '2', isShow: '1', isRouter: '1', permission: 'menuDemo:oneTwo:list', sort: 0, status: '1', createTime: Random.datetime('yyyy-MM-dd HH:mm:ss'), remark: '' },
  { id: '3-2', pid: '3', name: '菜单测试2', path: '/menuDemo/menuDemoTwo', icon: '', cmpPath: 'pages/menuDemo/menuDemoTwo', menuType: '2', isShow: '1', isRouter: '1', permission: 'menuDemo:two:list', sort: 0, status: '1', createTime: Random.datetime('yyyy-MM-dd HH:mm:ss'), remark: '' },
];

const menuAnalysisData = [
  {
    url: '/dev-api/mock/menu/list',
    method: 'get',
    timeout: 300,
    response: ({ query }) => {
      const { name, status, menuType } = query;

      let filtered = [...menuList];

      if (name) {
        filtered = filtered.filter((item) => item.name.includes(name));
      }
      if (status) {
        filtered = filtered.filter((item) => item.status === status);
      }
      if (menuType) {
        filtered = filtered.filter((item) => item.menuType === menuType);
      }

      return {
        code: 200,
        message: '操作成功',
        data: filtered,
      };
    },
  },
  {
    url: '/dev-api/mock/menu/create',
    method: 'post',
    timeout: 300,
    response: () => ({
      code: 200,
      message: '创建成功',
      data: null,
    }),
  },
  {
    url: '/dev-api/mock/menu/update',
    method: 'post',
    timeout: 300,
    response: () => ({
      code: 200,
      message: '更新成功',
      data: null,
    }),
  },
  {
    url: '/dev-api/mock/menu/delete',
    method: 'post',
    timeout: 300,
    response: () => ({
      code: 200,
      message: '删除成功',
      data: null,
    }),
  },
];

export default menuAnalysisData;
