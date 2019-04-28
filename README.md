# webPerformance

> web performance   VUE NUXT(KOA + IVIEW)

## Server

##### Controllers

> server端路由入口，直接添加class文件即可

注解：

@Controller({prefix: '/'})  路由前缀

@Request({ url: '/login', method: Method.POST })  设置路由具体路径 和request method


##### Models

> 数据库表结构 参考Sequelize  初始化用户admin 密码admin

##### Repository

> Model 实体方法封装

##### middlewares

> Server 端中间件

##### config

> Server端配置文件夹


## Client

##### assets

> 图片 样式 字体等资源文件

##### components 

> vue组件放置

##### layouts

> 公共布局vue存储

##### middleware  

> nuxt client 中间件

##### pages 

> client vue页面

##### plugins

> 插件文件 引入 参考nuxt.config.js

##### static

> 静态目录

##### store 

> vuex


## utils

> 存储一些公共使用


## 进度

- [x] appid

- [x] 页面数据入库

- [x] 页面数据平均值定时计算

- [x] 数值页面显示

- [x] ajax接口统计

- [x] 页面报错统计

- [ ] 邮件报警机制

- [ ] 页面统计加入ip和地理位置

- [ ] 增加消息队列，避免直接入库

## TODO 

- [ ] visit_time 判断问题 

- [ ] 后续改为储存到客户端，积攒到一定数量或时间及unload的时候一次发送

- [ ] 报错增加sourcemap支持

- [ ] 新增appid 需要添加对应table 


## 页面预览


