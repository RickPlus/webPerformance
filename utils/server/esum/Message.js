export default {
  Success: { code: 1, message: '成功' },
  Error: { code: 0, message: '失败' },
  NotLogin: { code: -1, message: '用户未登录' },
  LoginFail: { code: 0, message: '用户名和密码不匹配' },
  Expired: { code: -1, message: 'token验证失效' }
}
