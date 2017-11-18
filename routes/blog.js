var express = require('express');
var router = express.Router();
var sql = require('../connect');

router.post('/create', (req, res, next) => {
  let reqData = req.body;
  let checkTitle = typeof reqData.title === 'string' && reqData.title !== ''
  let checkTags = Array.isArray(reqData.tags)
  let checkContent = typeof reqData.content === 'string'
  if (!checkTitle || !checkTags || !checkContent) {
    let error = new Error()
    if (!checkTitle) {
      error.message += '标题不对'
    }
    if (!checkTags) {
      error.message += '标签不对'
    }
    if (!checkContent) {
      error.message += '内容不对'
    }
    res.json({
      error_code: -1,
      error_msg: error.tolocaleString()
    })
  } else {
    sql.query(`select * from article where title = '${reqData.title}'`, function (err, rows) {
      if (err) {
        res.json({
          error_code: -2,
          error_msg: '数据库操作错误'
        })
      } else if (!err && rows.length !== 0) {
        res.json({
          error_code: -3,
          error_msg: '已存在该标题的博客'
        })
      } else {
        sql.query('insert into article set ?', {
          title: reqData.title,
          tags: JSON.stringify(reqData.tags),
          content: reqData.content
        }, function (err) {
          if (!err) {
            sql.query(`select id from article where title = '${reqData.title}'`, function(err, rows) {
              res.json({
                data: {
                  id: rows[0].id
                },
                error_code: 0,
                error_msg: 'ok'
              })
            })
          } else {
            console.log(err)
            res.json({
              error_code: -2,
              error_msg: '数据库写入错误'
            })
          }
        })
      }
    })
  }
})

router.get('/list', (req, res, next) => {
  let id = req.query.id
  if (id !== undefined) {
    sql.query(`select * from article`, (err, rows) => {
      if (!err) {
        res.json({
          data: {
            list: rows
          },
          error_code: 0,
          error_msg: 'ok'
        })
      } else {
        console.log(err)
        res.json({
          error_code: -2,
          error_msg: 'error'
        })
      }
    })
  }
  console.log(`当前请求用户${id}的博客文章`)
})

module.exports = router