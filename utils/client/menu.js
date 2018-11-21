export default [
  {
    name: '首页',
    path: '/',
    icon: 'ios-body'
  },
  {
    name: '页面访问',
    path: '/visit',
    icon: 'ios-compass'
  },
  {
    name: '系统设置',
    path: '',
    icon: 'ios-settings',
    children: [
      {
        name: 'appId',
        path: '/settings/appId',
        icon: 'ios-appstore'
      }
    ]
  }
]
