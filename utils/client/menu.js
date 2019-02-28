export default [
  {
    name: '首页',
    path: '/',
    icon: 'md-rose'
  },
  {
    name: '搜索页面',
    path: '/search',
    icon: 'md-rose'
  },
  {
    name: 'ajax请求',
    path: '/ajax',
    icon: 'md-rose'
  },
  // {
  //   name: '页面访问',
  //   path: '/visit',
  //   icon: 'ios-compass'
  // },
  {
    name: '系统设置',
    path: '',
    icon: 'md-rose',
    children: [
      {
        name: 'appId',
        path: '/settings/appId',
        icon: 'md-rose'
      }
    ]
  }
]
