var express = require('express');
var moment = require('moment');
var sql = require('../connect');
var jwt = require('jwt-simple');
var app = require('../app');
var { expiresTimeUnit, expiresTimeValue } = require('./../config/auth');
var router = express.Router();
var tokenMap = require('../utils/auth')
/* GET users listing. */

router.get('/info', (req, res, next) => {
  var token = req.headers['x-access-token']
  var id = token && tokenMap[token]
  console.log(id)
  if (id === undefined) {
    res.json({
      error_code: -1,
      error_msg: 'token错误， 请重新登录'
    })
    return false
  }
  sql.query(`select * from account where id = ${id}`, function (err, rows) {
    if (err || rows.length == 0) {
      console.log(err)
      res.send({
        error_code: -1,
        error_msg: '未查询到指定用户信息'
      })
    } else {
      var data = rows.length === 1 && rows[0]
      res.json({
        data: {
          nickname: data.nickname,
          visitNum: data.visitNum
        },
        error_code: 0,
        error_msg: 'ok'
      })
    }
  })
})

router.post('/logout', (req, res, next) => {
  var token = req.headers['x-access-token'];
  tokenMap[token] = undefined;
  res.json({
    error_code: 0,
    error_msg: 'ok'
  });
})

router.post('/login', function(req, res, next) {
  sql.query('select * from account where account="' + req.body.username + '" and password="' + req.body.password+'"', function (err, rows) {
    if (err || rows.length == 0) {
      console.log(err)
      res.send({
        error_code: -1,
        error_msg: '检查用户名/密码是否正确'
      })
    }else {
      var data = rows.length === 1 && rows[0]
      var expires = moment().add(expiresTimeValue, expiresTimeUnit).valueOf();
      var token = jwt.encode({
        iss: data.id + new Date().getTime(),
        exp: expires
      }, 'zgatry');
      tokenMap[token] = data.id;
      res.json({
        token: token,
        expires: expires,
        data: {
          id: data.id,
          nickname: data.nickname,
          visitNum: data.visitNum
        },
        error_code: 0,
        error_msg: 'ok'
      })
    }
  })
});

module.exports = router;
