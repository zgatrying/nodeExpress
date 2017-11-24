var express = require('express');
var path = require('path');
var router = express.Router();
var { expiresTimeUnit, expiresTimeValue } = require('./../config/auth');
var tokenMap = require('../utils/auth')
var jwt = require('jwt-simple');
var moment = require('moment');
var sql = require('../connect');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

router.get('/favicon.ico', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../dist/favicon.ico'))
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
