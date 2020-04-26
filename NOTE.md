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
[参考文档：https://mobile.ant.design/docs/react/introduce-cn](https://mobile.ant.design/docs/react/introduce-cn)
## 组件使用
* props传递数据
* props传递函数
* props类型检查
## setState
```js
// 不可变值（函数式编程，纯函数） - 数组
const list5Copy = this.state.list5.slice()
list5Copy.splice(2, 0, 'a') // 中间插入/删除
this.setState({
    list1: this.state.list1.concat(100), // 追加
    list2: [...this.state.list2, 100], // 追加
    list3: this.state.list3.slice(0, 3), // 截取
    list4: this.state.list4.filter(item => item > 100), // 筛选
    list5: list5Copy // 其他操作
})
// 注意，不能直接对 this.state.list 进行 push pop splice 等，这样违反不可变值

// 不可变值 - 对象
this.setState({
    obj1: Object.assign({}, this.state.obj1, {a: 100}),
    obj2: {...this.state.obj2, a: 100}
})
// 注意，不能直接对 this.state.obj 进行属性设置，这样违反不可变值
```
## Redux
* 1. 基本使用
```js
// App.js
import { createStore } from 'redux'
// ...
// redux
function counter(state = 0, action) {
  switch (action.type) {
    case 'add':
      return state + 1
    case 'reduce':
      return state - 1
    default:
      return 10
  }
}

// 新建store
const store = createStore(counter)
const init = store.getState()
console.log(init)

// 订阅
function listener() {
  const current = store.getState()
  console.log(`现在拥有技能${current}`)
}
store.subscribe(listener)

// 派发事件 传递action
store.dispatch({
  type: 'add'
})
// console.log(store.getState())
store.dispatch({
  type: 'reduce'
})
// console.log(store.getState())
```
* 2. redux如何和React一起用
> 把store.dispatch方法传递给组件，内部可以调用修改状态
> subscribe订阅render函数，每次修改都重新渲染
> redux相关内容，移到单独的文件进行管理
```js
// index.redux.js
const ADD = 'add'
const REDUCE = 'reduce'
// reducer
export function counter(state = 0, action) {
  switch (action.type) {
    case ADD:
      return state + 1
    case REDUCE:
      return state - 1
    default:
      return 10
  }
}
// action creator
export function add() {
  return {
    type: ADD
  }
}

export function reduce() {
  return {
    type: REDUCE
  }
}

// index.js

// App.js
  render() {
    const store = this.props.store
    const num = store.getState()
    const add = this.props.add
    const reduce = this.props.reduce
    return (
      <div className="App">
        {/* 省略 */}
        <Button type="primary" onClick={()=>store.dispatch(add())}>新增</Button>
        <br/>
        <Button type="primary" onClick={()=>store.dispatch(reduce())}>减少</Button>
      </div>
    )
  }
```
* 3. 处理异步、调试工具、更优雅的和React结合
```
· Redux处理异步，需要redux-thunk插件

npm install redux-thunk --save
使用applyMiddleware开启thunk中间件
action可以返回函数，使用dispatch提交action

· npm install redux-devtools-extension并且开启
· 使用react-redux优雅的链接react和redux
```
```js
// index.js
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { counter, add, reduce } from './index.redux'

const store = createStore(counter, applyMiddleware(thunk))
// 添加异步方法
```
## 调试工具
* Chrome搜索redux安装
* 新建store的时候判断window.devToolsExtension
* 使用compose结合thunk和window.devToolsExtension
* 调试窗的redux选项卡，实时看到state
```js
// index.js
import {createStore, applyMiddleware, compose} from 'redux'
const store = createStore(counter, compose(
  applyMiddleware(thunk),
  window.devToolsExtension?window.devToolsExtension():f=>f
))
```
## 优雅管理
* 使用react-redux
* 安装 npm install react-redux --save
* 忘记subscribe，记住reducer，action和dispatch即可
* react-redux提供Provider和connect两个接口来连接
#### 具体使用
* Provider组件在应用最外层，传入store即可，只用一次
```js
// index.js
import { counter, addGun, reduceGun, addGunAsync } from './index.redux'

function render () {
  ReactDOM.render(<App store={store} addGun={addGun} reduceGun={reduceGun} addGunAsync={addGunAsync} />, document.getElementById('root'));
}
render()
store.subscribe(render)
// 改为
import {Provider} from 'react-redux'
import { counter } from './index.redux'

// ReactDOM.render(
//   (<Provider store={store}>
//     <App />
//   </Provider>),
//   document.getElementById('root')
// )
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}><App /></Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

```
* Connect负责从外部获取组件需要的参数
```js
// App.js
import { connect } from 'react-redux';
import { add, reduce, addAsync } from './index.redux';

// react-redux
const mapStateToProps = (state) => {
  return {
    num: state
  }
}
const actionCreateors = { add, reduce, addAsync }
App = connect(mapStateToProps, actionCreateors)(App)

export default App;

```
* 使用装饰器优化connect代码
`cnpm i @babel/plugin-proposal-decorators --save-dev`
```json
  "plugins": [
    [
      "import",
      {
        "libraryName": "antd-mobile",
        "style": "css"
      }
    ],
    [
      "@babel/plugin-proposal-decorators",
      {
        "legacy": true
      }
    ]
  ]
},
```
```js
// App.js
// react-redux
@connect(
  // 你要state什么属性放到props里
  state => ({num: state}),
  // 你要什么方法， 放到props里，自动dispatch
  { add, reduce, addAsync }
)
```