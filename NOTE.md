## 安装
```
$ cnpm install -g create-react-app
$ create-react-app react-demo
$ cd react-demo
$ yarn start

*** 注意： eject需要一开始就运行，否则后面会有冲突会报错。
npm run eject
```
## 安装依赖
* npm install redux express --save 安装第三方库redux
* npm run eject弹出配置文件，可以自定义配置webpack
* 扩展package.json里的script字段，扩展npm run命令
## ES6
* 块级作用域、字符串、函数
* 对象扩展、解构
* 类、模块化等等
```js
const obj = {
  name: 'bob',
  age: 33
}

console.log(Object.keys(obj))
console.log(Object.values(obj))
console.log(Object.entries(obj))
```
## Express
* npm install express --save 安装express
* 启动服务
* 监听路由和响应内容，使用nodemon自动重启
> 其他特性
* app.get、app.post分别开发get和post接口
* app.use使用模块
* 代res.send、res.json、res.sendfile响应不同的内容
## MongoDB
* 安装
> Mac: brew install mongodb
* 启动
> mongod --config /usr/local/etc/mongod.conf
`mongo`
* 安装mongoose
`cnpm install mongoose --save`
* 引入
```js
// server/server.js
const mongoose = require('mongoose')

// 连接mongodb
// 本地服务： mongodb://localhost:27017
const DB_URL = 'mongodb://admin:admin123@ds155864.mlab.com:55864/job-chat'
mongoose.connect(DB_URL)
mongoose.connection.on('connected', function() {
  console.log('数据库连接成功！')
})

```
## mongoose基础使用
* connect连接数据库
* 定义文档模型，Schema和model新建模型
* String、Number等数据结构
* 定create，remove，update分别用来增删改操作
* find和findone用来查询数据
> 新增数据
```js
// server/server.js
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
User.create({
  user: 'test',
  pwd: 'test1',
  type: 'genius'
}, function(err, doc) {
  if(!err){
    console.log(doc)
  } else {
    console.log(err)
  }
})

```
> 返回打印结果：
```json
{
    "_id": {
        "$oid": "5ea14822ede61728fc9b0639"
    },
    "user": "test",
    "pwd": "test1",
    "type": "genius",
    "__v": 0
}
```
> 查询数据
```js
// server/server.js
app.get('/data', function (req, res) {
  // 查询全部
  User.find({}, function(err, doc) {
    res.json(doc)
  })
})

```
> 删除数据
```js
// server/server.js
User.remove({
  user: 'bob'
}, function(err, doc) {
  if(!err) {
    console.log('删除成功')
    User.find({}, function(e,d) {
      console.log(d)
    })
  }
})

```
> 更新数据
```js
// server/server.js

User.update({user: 'test'}, {'$set': {type: 'boss'}}, function(err, doc) {
  console.log(doc)
})
```
## express和mongodb结合
* mongodb独立工具函数
* express使用body-parser（body 解析中间件）支持post参数
* 使用cookie-parser存储登录信息cookie
## React基础
* Facebook出品，专注View层
* 一切皆组件
* 全部使用ES6语法
## JSX基础语法
* js里直接写html
* class要写成className
* 变量用{}包裹即可
> 以下两种方法都可以
```js
// App.js
class App extends React.Component{
  render() {
    return (
      <div className="App">
        <h1>React 面试</h1>
      </div>
    )
  }
}
// 如果组件只有render函数，还可以用函数的形式写组件
// function App() {
//   return (
//     <div className="App">
//       <h1>React 面试</h1>
//     </div>
//   );
// }

```
* 使用组件
```js
// App.js
import React from 'react';

class App extends React.Component{
  render() {
    return (
      <div className="App">
        <h1>React 面试</h1>
        <NewComponent />
      </div>
    )
  }
}
// function App() {
//   return (
//     <div className="App">
//       <h1>React 面试</h1>
//     </div>
//   );
// }

class NewComponent extends React.Component {
  render() {
    const boss = 'CTO'
    return <h2>面试官，{boss}</h2>
  }
}

export default App;

```
## 组件之间传递数据
> 组件之间用props传递数据
* 使用<组件 数据="值">的形式传递
* 组件里使用this.props获取值
* 如果组件只有render函数，还可以用函数的形式写组件
```js
// App.js
import React from 'react';

class App extends React.Component{
  render() {
    return (
      <div className="App">
        <h1>React 面试</h1>
        <NewComponent boss="CTO" />
        <Interview boss="Mr.黄" />
      </div>
    )
  }
}

function Interview(props) {
  return <h2>面试由技术{props.boss}，先开始提问</h2>
}

class NewComponent extends React.Component {
  render() {
    return <h2>面试官，{this.props.boss}</h2>
  }
}

export default App;

```
## 组件内部state
> 组件内部通过state管理状态
* JSX本质就是js，所以直接数组.map渲染列表
* Constructor设置初始状态，记得执行super(props)
* 如State就是一个不可变的对象，使用this.state获取
## 事件
> onClick点击事件、this绑定
## React生命周期
> React组件有若干钩子函数，在组件不同的状态执行
* 初始化周期
* 组件重新渲染生命周期
* 组件卸载生命周期
```js
// App.js
class NewComponent extends React.Component {
  constructor(props) {
    // ...
    // this.addSkill = this.addSkill.bind(this)
    console.log('组件初始化')
  }

  // 生命周期
  // componentWillMount已经废弃
  // componentWillMount() {
  //   console.log('组件马上就要加载了')
  // }
  componentDidMount() {
    console.log('组件已加载')
  }

  componentDidUpdate() {
    console.log('在更新发生后立即被调用。 这个方法在第一次渲染时不会被调用。')
  }

  componentWillUnmount() {
    console.log('组件卸载')
  }
  // ...
  render() {
    console.log('组件正在加载...')
    return (
      // ...
    )
  }
}
```
## 蚂蚁金服antd UI
* 1. 安装
`npm install antd-mobile --save`
* 2. 引入
```js
import React from 'react';
import {Button} from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
// ...
class NewComponent extends React.Component {
  // ...
  render() {
    return (
      <div>
        <Button type="primary" onClick={() => this.addSkill()}>添加技能</Button>
      </div>
    )
  }
}

export default App;

```
* 3. 按需加载
`cnpm i babel-plugin-import --save-dev`
```js
// package.json
  "babel": {
    "presets": [
      "react-app"
    ],
    "plugins": [
      ["import", {
        "libraryName": "antd-mobile",
        "style": "css"
      }]
    ]
  },
```
> 手动添加
```
· 其他组件官网挨个展示
· 直接import会加载所有组件，需要自定义配置按需加载
· 个性化配置后面统一配置（需要执行npm run eject)
```
[参考文档：](https://mobile.ant.design/docs/react/introduce-cn)