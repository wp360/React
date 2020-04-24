const express = require('express')
const mongoose = require('mongoose')

// 连接mongodb
const DB_URL = 'mongodb://admin:admin123@ds155864.mlab.com:55864/job-chat'
mongoose.connect(DB_URL)
mongoose.connection.on('connected', function() {
  console.log('数据库连接成功！')
})

// 类似于mysql的表 mongo里有文档、字段的概念
const User = mongoose.model('users', new mongoose.Schema({
  user: {
    type: String,
    require: true
  },
  pwd: {
    type: String,
    require: true
  },
  type: {
    type: String,
    require: true
  }
}))

// 新增数据
// User.create({
//   user: 'test',
//   pwd: 'test1',
//   type: 'genius'
// }, function(err, doc) {
//   if(!err){
//     console.log(doc)
//   } else {
//     console.log(err)
//   }
// })

// 删除数据
// User.remove({
//   user: 'bob'
// }, function(err, doc) {
  // if(!err) {
  //   console.log('删除成功')
  //   User.find({}, function(e,d) {
  //     console.log(d)
  //   })
  // }
// })

// 更新数据
// User.update({user: 'test'}, {'$set': {type: 'boss'}}, function(err, doc) {
//   console.log(doc)
// })

// 新建App
const app = express()

app.get('/', function(req,res) {
  res.send('<h1>Hello React</h1>')
})

app.get('/data', function (req, res) {
  // findOne
  User.find({}, function(err, doc) {
    res.json(doc)
  })
  // res.json({name: '前端', type: 'js'})
})

app.listen(9003, function() {
  console.log('Node 服务启动，端口9003')
})