class Index {
  static async get(ctx, next) {
    ctx.state.data = 'get success'
  }

  static async post(ctx, next) {
    ctx.state.data = 'post success'
  }
}

module.exports = {
  'index-get': {
    path: '/inward',
    method: 'GET',
    fn: Index.get
  },
  'index-post': {
    path: '/inward',
    method: 'POST',
    fn: Index.post
  }
}
