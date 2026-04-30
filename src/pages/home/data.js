export const salesData = [
  { date: '01-01', value: 43 },
  { date: '01-02', value: 52 },
  { date: '01-03', value: 48 },
  { date: '01-04', value: 61 },
  { date: '01-05', value: 55 },
  { date: '01-06', value: 48 },
  { date: '01-07', value: 38 },
  { date: '01-08', value: 42 },
  { date: '01-09', value: 58 },
  { date: '01-10', value: 65 },
  { date: '01-11', value: 61 },
  { date: '01-12', value: 68 },
  { date: '01-13', value: 72 },
  { date: '01-14', value: 65 },
  { date: '01-15', value: 58 },
  { date: '01-16', value: 62 },
  { date: '01-17', value: 78 },
  { date: '01-18', value: 85 },
  { date: '01-19', value: 82 },
  { date: '01-20', value: 88 },
  { date: '01-21', value: 92 },
  { date: '01-22', value: 86 },
  { date: '01-23', value: 79 },
  { date: '01-24', value: 85 },
  { date: '01-25', value: 92 },
  { date: '01-26', value: 98 },
  { date: '01-27', value: 105 },
  { date: '01-28', value: 98 },
];

export const categoryData = [
  { type: '家用电器', value: 45 },
  { type: '食用酒水', value: 25 },
  { type: '个护美妆', value: 15 },
  { type: '服饰箱包', value: 10 },
  { type: '母婴产品', value: 5 },
];

export const rankingData = [
  { rank: 1, keyword: 'iPhone 15', count: 12340, range: 12 },
  { rank: 2, keyword: 'MacBook Pro', count: 9876, range: 8 },
  { rank: 3, keyword: 'AirPods Pro', count: 8642, range: -3 },
  { rank: 4, keyword: 'iPad Air', count: 7654, range: 5 },
  { rank: 5, keyword: 'Apple Watch', count: 6543, range: 2 },
  { rank: 6, keyword: '小米手机', count: 5432, range: -2 },
  { rank: 7, keyword: '华为平板', count: 4321, range: 1 },
];

export const salesRankData = [
  { rank: 1, keyword: 'iPhone 15 Pro', count: 12340, range: 12.5 },
  { rank: 2, keyword: 'MacBook Pro M3', count: 9876, range: 8.2 },
  { rank: 3, keyword: 'AirPods Pro 2', count: 8642, range: -3.1 },
  { rank: 4, keyword: 'iPad Air', count: 7654, range: 5.6 },
  { rank: 5, keyword: 'Apple Watch', count: 6543, range: 2.3 },
  { rank: 6, keyword: '华为Mate60', count: 6234, range: 4.5 },
  { rank: 7, keyword: '小米14', count: 5876, range: -1.2 },
  { rank: 8, keyword: 'OPPO Find X7', count: 5432, range: 3.8 },
  { rank: 9, keyword: 'vivo X100', count: 4987, range: 2.1 },
  { rank: 10, keyword: '荣耀Magic6', count: 4567, range: -0.5 },
  { rank: 11, keyword: '三星S24', count: 4321, range: 1.9 },
  { rank: 12, keyword: '一加12', count: 3987, range: 3.2 },
  { rank: 13, keyword: 'Realme GT5', count: 3654, range: -2.3 },
  { rank: 14, keyword: 'Redmi K70', count: 3421, range: 4.1 },
  { rank: 15, keyword: 'iQOO 12', count: 3098, range: 1.5 },
  { rank: 16, keyword: '魅族21', count: 2876, range: -1.8 },
  { rank: 17, keyword: '努比亚Z60', count: 2543, range: 2.7 },
  { rank: 18, keyword: '摩托罗拉Edge', count: 2210, range: 0.8 },
  { rank: 19, keyword: '索尼Xperia', count: 1987, range: -0.3 },
  { rank: 20, keyword: '联想拯救者', count: 1654, range: 1.2 },
];

export const storeData = [
  { rank: 1, name: '杭州西湖店', sales: 323234 },
  { rank: 2, name: '北京朝阳店', sales: 298765 },
  { rank: 3, name: '上海浦东店', sales: 256432 },
  { rank: 4, name: '深圳南山店', sales: 198765 },
  { rank: 5, name: '广州天河店', sales: 176543 },
  { rank: 6, name: '成都春熙路店', sales: 165432 },
  { rank: 7, name: '武汉光谷店', sales: 154321 },
  { rank: 8, name: '南京新街口店', sales: 143210 },
  { rank: 9, name: '杭州滨江店', sales: 132098 },
  { rank: 10, name: '北京海淀店', sales: 120987 },
  { rank: 11, name: '上海徐汇店', sales: 109876 },
  { rank: 12, name: '深圳福田店', sales: 98765 },
  { rank: 13, name: '广州越秀店', sales: 87654 },
  { rank: 14, name: '成都高新区店', sales: 76543 },
  { rank: 15, name: '武汉江汉路店', sales: 65432 },
  { rank: 16, name: '南京鼓楼店', sales: 54321 },
  { rank: 17, name: '杭州余杭店', sales: 43210 },
  { rank: 18, name: '北京西城店', sales: 32098 },
  { rank: 19, name: '上海静安店', sales: 20987 },
  { rank: 20, name: '深圳罗湖店', sales: 10987 },
];

export const miniAreaData = [
  264, 417, 438, 887, 309, 397, 550, 575, 563, 430, 525, 592, 492, 467, 513, 546, 983, 340, 539, 243, 226, 192,
].map((value, index) => ({ value, index }));

export const miniColumnData = [
  32, 28, 35, 42, 38, 72, 68, 75, 82, 78, 85, 92, 88, 95, 102,
].map((value, index) => ({ value, index }));

export const statCardsData = [
  {
    title: '总销售额',
    value: '¥112,893',
    weekTrend: 12.5,
    dayTrend: 8.2,
    daily: '¥12,423',
    footer: '日销售额',
    tip: '指标说明：今日销售额是指当日所有已完成订单的金额总和',
    type: 'trend'
  },
  {
    title: '访问量',
    value: '2,341',
    weekTrend: 8.2,
    dayTrend: -3.1,
    daily: '324',
    footer: '日访问量',
    tip: '指标说明：今日访问量是指当日网站的总访问次数',
    type: 'area'
  },
  {
    title: '支付笔数',
    value: '328',
    weekTrend: -3.1,
    dayTrend: 5.6,
    daily: '60%',
    footer: '转化率',
    tip: '指标说明：今日订单数是指当日所有已提交的订单数量',
    type: 'column'
  },
  {
    title: '运营活动效果',
    value: '78%',
    weekTrend: 15.3,
    dayTrend: 2.3,
    daily: '213',
    footer: '运营增量',
    tip: '指标说明：今日新增用户是指当日新注册的用户数量',
    type: 'progress'
  },
];

export const salesRankColumns = [
  { title: '排名', dataIndex: 'rank', key: 'rank', width: 50 },
  { title: '搜索关键词', dataIndex: 'keyword', key: 'keyword' },
  { title: '用户数', dataIndex: 'count', key: 'count', sorter: (a, b) => a.count - b.count },
  { title: '周涨幅', dataIndex: 'range', key: 'range' },
];

export const storeColumns = [
  { title: '排名', dataIndex: 'rank', key: 'rank', width: 50 },
  { title: '门店名称', dataIndex: 'name', key: 'name' },
  { title: '销售额', dataIndex: 'sales', key: 'sales', sorter: (a, b) => a.sales - b.sales },
];
