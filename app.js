var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var blog = require('./routes/blog');

var cors = require('cors');
var jwt = require('jwt-simple');
var app = express();
var { secret } = require('./config/auth');
var tokenMap = require('./utils/auth')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('jwtTokenSecret', secret);

//跨域配置
app.use(cors());

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', index);
app.use((req, res, next) => {
  var token = req.headers['x-access-token']
  var id = token && tokenMap[token]
  console.log(`当前操作的用户: ${id}`)
  if (id === undefined) {
    res.json({
      error_code: -1,
      error_msg: 'token错误， 请重新登录'
    })
  } else {
    next()
  }
})
app.use('/users', users);
app.use('/blog', blog);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
