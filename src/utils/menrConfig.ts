const menuList = [
  {
    label: '控制台',
    key: '/home',
  },
  {
    label: '订单管理',
    key: '/order',
    children: [
      {
        label: '订单详情',
        key: 'detail',
      },
      {
        label: '结束订单',
        key: 'finish',
      },
    ],
  },
  {
    label: '权限设置',
    key: '/permission',
  },
];
export default menuList;
