# hnz-mysql
用于mysql开发的链式调用包。

## 安装
```
npm install hnz-mysql
```

## 使用
### 引入
```
var hnzMysql = require("hnz-mysql");
```
### 构造函数
```
var m = new hnzMysql({
	host:'localhost',
	user:'root',
	password:"",
	database:"book2-6"
})
```

| 参数  |必填| 描述  |
|--------|-------|---------------------|
| host   | 是 |数据库主机  |
| user   | 是 | 数据库用户名 |
| password | 是 | 数据库密码  |
| port | 可选 | 数据库端口号,默认3306 |
| database | 是 | 数据库名称 |

### 常用方法
| 方法  | 描述  | 
|--------|-----------------|
| `t(table)` |  设置要操作表名称 |
| `f(field)` | 设置查询字段名称 |
| `data(data)` | 设置数据,格式为 `{}` |
| `o(order,type)` | 按照某个字段排序 |
| `l(offset,num)` | 截取数据 |
| `w(data)` | where条件,格式为 `{}` |
| `s(callback)` | 查找数据 |
| `u(callback)` |  更新某个字段数据 |
| `i(callback)` | 更新某个字段数据 |
| `d(callback)` |  删除条数据 |
| `query()` |  执行query操作(同mysql包，query用法) |

### 查询操作
```
// m.t('users') 设置表为users表
m.t('users').s(function(err,result){
 	console.log(err)
 	console.log(result)
})

// m.f('name,age,sex') 设置查询字段
m.t('users').f('name,age,sex').s(function(err,result){
 	console.log(err)
 	console.log(result)
})
```
### 更新操作
```
// m.data({description:"生活最终不会亏待任何人"}) 设置要操作数据
m.t("article")
.data({description:"生活最终不会亏待任何人"})
.w({id:1})
.u(function(err,result){
	console.log(err)
	console.log(result);
})
```

### 插入操作
```
m.t("users").data({username:'baihe', password:123456, nickname:'百合'}).i(function(err,result){
	console.log(err)
	console.log(result);
})
```

### 删除操作
```
// m.w({iuid:4})  设置查询条件
m.t("users").w({iuid:4}).d(function(err,result){
	console.log(result)
})
```
