const mysql = require("mysql");

/*
new hnzMysql({
	host:"localhost",
	user:"root",
	password:"root",
	port:3306,
	database: "tmall"
})
*/
function hnzMysql(config){
	this.config = {
		host: config.host,
		user: config.user,
    	password: config.password,
    	port: config.port || 3306,
    	database: config.database,
	}
	this.pool = mysql.createPool(this.config);
	this.table = null;
	this.field = '*';
	this.Data = {};
	this.order = "";
	this.where = "";
	this.limit = "";
	this.groupBy = "";
}
hnzMysql.prototype.init = function(){
	this.table = null;
	this.field = '*';
	this.Data = {};
	this.order = "";
	this.where = "";
	this.limit = "";
	this.groupBy = "";
}
/**
 * t(table) 
 * 设置表名称
 * @param table  string  表名
 * @return object
 */
hnzMysql.prototype.t = function(table){
	this.table = table;
	return this;
}

/**
 * f(field) 
 * 设置查询字段名称
 * @param table  string  表名
 * @return object
 */
hnzMysql.prototype.f = function(field){
	this.field = field;
	return this;
}

/**
 * data(data)
 * 设置数据 {}
 * @param data  object  {name:'',age:''}
 * @return object
 */
hnzMysql.prototype.data = function(data){
	this.Data = data;
	return this;
}

/**
 * o(order,type)
 * 按照某个字段排序
 * @param order string  排列字段
 * @param type  string  排列顺序 默认asc  desc
 * @return object
 */
hnzMysql.prototype.o = function(order,type='asc'){
	this.order = ' order by '+order+' '+type +" ";
	return this;
}

/**
 * l(offset,num)  
 * 截取数据
 * @param offset number  要跳过条数
 * @param num    number  要取条数
 * @return object
 */
hnzMysql.prototype.l = function(offset,num){
	if(num){
		this.order = ' limit '+offset+','.num+" ";
	}else{
		this.order = ' limit '+offset+" ";
	}
	return this;
}

/**
 * w(data)
 * where条件 
 * @param data object  {username:'admin'}
 * @return object
 */
hnzMysql.prototype.w = function(data){
	for(var i in data){
		this.where = ' where '+i+'="'+data[i]+'" ';
	}
	return this;
}
hnzMysql.prototype.g = function(field){
	this.groupBy = ' group by '+field+' ';
	return this;
}

/**
 * s(callback)
 * 查找数据
 * @param callback function  回调函数
 * @return undefined
 */
hnzMysql.prototype.s = function(callback){
	var field = this.field||"*";
	var table = this.table;
	var where = this.where;
	var groupBy = this.groupBy;
	var order = this.order;
	var limit = this.limit;
	this.pool.query("select "+field+ " from "+table+where+groupBy+order+limit,callback)
	this.init();
}

/**
 * u(callback)
 * 更新某个字段数据
 * @param callback function  回调函数
 * @return undefined
 */
hnzMysql.prototype.u = function(callback){
	var table = this.table;
	var where = this.where;
	var data = this.Data;
	var str = "";
	for(var i in data){
		str+=i+"='"+data[i]+"',";
	}
	str = str.slice(0,-1);
	this.pool.query("update "+table+" set "+str+where,callback)
	this.init();
}

/**
 * i(callback)
 * 更新某个字段数据
 * @param callback function  回调函数
 * @return undefined
 */
hnzMysql.prototype.i = function(callback){
	var table = this.table;
	var data = this.Data;
	var attr = "(";
	var str = "(";
	for(var i in data){
		attr += i+',';
		str += "'"+data[i]+"',";
	}
	attr = attr.slice(0,-1)+')';
	str = str.slice(0,-1)+')';
	this.pool.query("insert into "+table+ " "+attr+'values'+str,callback);
	this.init();
}

/**
 * d(callback)
 * 删除条数据
 * @param callback function  回调函数
 * @return undefined
 */
hnzMysql.prototype.d = function(callback){
	var table = this.table;
	var where = this.where;
	this.pool.query("delete from "+table+ " "+where,callback);
	this.init();
}

/**
 * query()
 * 执行mysql  query操作
 * @param null all 任意
 * @return undefined
 */
hnzMysql.prototype.query = function(){
	this.pool.query(...arguments);
	this.init();
};

module.exports = hnzMysql;