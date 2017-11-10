var sql = require('./connect')
var md5 = require('md5')
const NAME = 'admin'
const PASSWORD = md5('123456')
var dbInit = function () {
  sql.connect(function (err) {
    if (err) {
      console.log('数据库连接失败')
    }else {
      console.log('成功连接数据库,正在初始化数据库')
      sql.query('CREATE TABLE account(userId smallint(6) unsigned NOT NULL auto_increment,user varchar(255),password varchar(255),name varchar(255),visitNum int(10),PRIMARY KEY (`userId`)) ENGINE=InnoDB DEFAULT CHARSET=gbk', function (err) {
        !err ? console.log('account表创建成功') : console.log(err)
      })
      sql.query('insert into account set ?', {user: NAME,password: PASSWORD}, function (err) {
        !err ? console.log('account初始化成功') : console.log(err)
      })
      sql.end()
    }
  })
}
dbInit()