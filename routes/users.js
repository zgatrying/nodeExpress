var express = require('express');
var moment = require('moment');
var sql = require('../connect');
var jwt = require('jwt-simple');
var app = require('../app');
var { expiresTimeUnit, expiresTimeValue } = require('./../config/auth');
var router = express.Router();

/* GET users listing. */
router.post('/login', function(req, res, next) {
  sql.query('select user from account where user="' + req.body.username + '" and password="' + req.body.password+'"', function (err, rows) {
    if (err || rows.length == 0) {
      console.log(err)
      res.send({
        error_code: -1,
        error_msg: '检查用户名/密码是否正确'
      })
    }else {
      var expires = moment().add(expiresTimeValue, expiresTimeUnit).valueOf();
      var token = jwt.encode({
        iss: rows.id,
        exp: expires
      }, 'zgatry');
      res.json({
        data: {
          token: token,
          expires: expires
        },
        error_code: 0,
        error_msg: 'ok'
      })
    }
  })
});

module.exports = router;
