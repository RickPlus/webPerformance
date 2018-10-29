module.exports = {
  secretName: 'web performance platform',
  mysql: {
    database: 'performance',
    user: 'admin',
    password: 'admin',
    option: {
      host: '127.0.0.1',
      port: 3306,
      dialect: 'mysql',
      timezone: '+08:00',
      pool: {
        max: 5,
        min: 0,
        idle: 10000
      },
      define: {
        timestamps: false // 不自动添加 updateAt 和 createdAt
      }
    }
  }
}
