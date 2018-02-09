# mysqlvi
mysql链式查询版本!

## 安装
```
npm install mysqlvi
```

## 使用

### 构造函数
```
var mysqlvi = require("mysqlvi");

var m = new mysqlvi({
	host:'localhost',
	user:'root',
	password:"",
	database:"book2-6"
})
```

### 常用方法
| 方法  | 描述  |
|--------|-----------------|
| `t(table)` |  设置要操作表名称 |
| `f(field)` | 设置查询字段名称 |
| `data(data)` | 设置数据 `{}` |
| `o(order,type)` | 按照某个字段排序 |
| `l(offset,num)` | 截取数据 |
| `w(data)` | where条件 `{}` |
| `s(callback)` | 查找数据 |
| `u(callback)` |  更新某个字段数据 |
| `i(callback)` | 更新某个字段数据 |
| `d(callback)` |  删除条数据 |
| `query()` |  执行query操作(同mysql包，query用法) |

### 查询操作
```
m.t('users').s(function(err,result){
 	console.log(err)
 	console.log(result)
})

m.t('users').f('name,age,sex').s(function(err,result){
 	console.log(err)
 	console.log(result)
})
```
### 更新操作
```
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
m.t("users").w({iuid:4}).d(function(err,result){
	console.log(result)
})
```
