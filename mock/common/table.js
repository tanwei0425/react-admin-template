// 定义模拟的请求处理程序
const loginAnalysisData = [
  {
    url: '/dev-api/mock/tableList', // 接口地址
    method: 'get', // 请求方式
    timeout: 500,
    response: () => {
      // 模拟数据
      return {
        code: 200,
        message: '操作成功',
        data: {
          list: [
            {
              id: '1',
              name: '222测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1试1测试1测试1测试1测试1测试1测试1测试1测试1呵呵呵呵呵呵',
              code: '333code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1code1哈哈哈哈哈',
              menuName: '菜单1菜单1菜单1菜单1菜单1菜单1菜单1',
            },
            { id: '2', name: '测试2', code: 'code2', menuName: '菜单2', menuId: 0 },
            { id: '3', name: '测试3', code: 'code3', menuName: '菜单3' },
            { id: '4', name: '测试4', code: 'code4', menuName: '菜单4' },
            { id: '5', name: '测试5', code: 'code5', menuName: '菜单5', menuId: 0 },
            { id: '6', name: '测试6', code: 'code6', menuName: '菜单6' },
            { id: '7', name: '测试7', code: 'code7', menuName: '菜单7', menuId: 0 },
            { id: '8', name: '测试8', code: 'code8', menuName: '菜单8' },
            { id: '9', name: '测试9', code: 'code9', menuName: '菜单9' },
            { id: '10', name: '测试10', code: 'code10', menuName: '菜单10' },
            { id: '11', name: '测试11', code: 'code11', menuName: '菜单11' },
          ],
        },
        total: 11,
      };
    },
  },
];

export default loginAnalysisData;
