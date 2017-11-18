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
      sql.query('CREATE TABLE account(id smallint(6) unsigned NOT NULL auto_increment,account varchar(255),password varchar(255),nickname varchar(255),visitNum int(10),PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=gbk', function (err) {
        if (!err) {
          console.log('account表创建成功')
          sql.query('insert into account set ?', {
            account: NAME,
            password: PASSWORD,
            nickname: NAME,
            visitNum: 0
          }, function (err) {
            !err ? console.log('account初始化成功') : console.log(err)
          })
        } else {
          console.log(err)
        }
      })
      sql.end()
    }
  })
}
dbInit()