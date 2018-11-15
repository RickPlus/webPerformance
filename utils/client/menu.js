export default [
  {
    name: '首页',
    path: '/',
    icon: 'ios-body'
  },
  {
    name: '页面访问',
    path: '',
    icon: 'ios-body',
    children: [
      {
        name: '页面访问1',
        path: '/1',
        icon: 'ios-body'
      },
      {
        name: '页面访问2',
        path: '/2',
        icon: 'ios-body'
      }
    ]
  }
]
