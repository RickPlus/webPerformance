# webPerformance

> web performance   VUE NUXT(KOA + IVIEW)

## Server

##### Controllers

> server端路由入口，直接添加class文件即可

注解：

@Controller({prefix: '/'})  路由前缀

@Request({ url: '/login', method: Method.POST })  设置路由具体路径 和request method


##### Models

> 数据库表结构 参考Sequelize

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
