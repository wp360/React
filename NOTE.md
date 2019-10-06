## 开发指南
1. 项目构建
* 脚手架
`npm install -g create-react-app`
2. 安装项目
`create-react-app bike`
3. 运行项目
```
>> cd bike
>> yarn start
```
4. 安装插件
`yarn add react-router-dom axios less-loader`
5. 暴露配置
`yarn eject`
6. webpack配置less
7. 安装antd
`yarn add antd`
8. 按需加载
`yarn add babel-plugin-import`

[react暴露后，webpack4.19.1实现按需加载antd](https://juejin.im/post/5c3964986fb9a049b41cb040)

9. 页面布局
10. 左侧导航
```js
// NavLeft >> index.js
import React from 'react';
import { Menu } from 'antd';
import MenuConfig from './../../config/menuConfig';
import './index.less';

const { SubMenu } = Menu;

export default class NavLeft extends React.Component {
  // componentWillMount
  UNSAFE_componentWillMount() {
    const menuTreeNode = this.renderMenu(MenuConfig);
    this.setState({
      menuTreeNode
    })
  }

  // 菜单渲染
  renderMenu=(data)=>{
    return data.map((item)=>{
      if(item.children) {
        return (
          <SubMenu title={item.title} key={item.key}>
            {this.renderMenu(item.children)}
          </SubMenu>
        )
      }
      return (
        <Menu.Item title={item.title} key={item.key}>
          {item.title}
        </Menu.Item>
      )
    })
  }

  render() {
    return(
      <div>
        <div className="logo">
          <img src="/assets/logo-ant.svg" alt="logo"/>
          <h1>共享单车<br/>后台管理系统</h1>
        </div>
        <Menu theme="dark">
          {this.state.menuTreeNode}
        </Menu>
      </div>
    )
  }
}

```
11. 添加系统时间
12. 调用百度天气API
```
百度天气API接口
http://api.map.baidu.com/telematics/v3/weather?location=beijing&output=json&ak=3p49MVra6urFRGOT9s8UBWr2
参考文档： https://blog.csdn.net/younghaiqing/article/details/54799303
```
13. 跨域jsonp的使用
`yarn add jsonp --save`
14. axios封装
```js
// axios >> index.js
import JsonP from 'jsonp';

export default class Axios {
  static jsonp(options) {
    return new Promise((resolve,reject) => {
      JsonP(options.url, {
        params: 'callback'
      }, function(err,response) {
        // to-do
        if(response.status === 'success') {
          resolve(response);
        } else {
          reject(response.message);
        }
      })
    })
  }
}

```
15. 页面天气接口调用
```js
// Header >> index.js
// 省略
import axios from '../../axios';
export default class Header extends React.Component {
    // 省略
    // 调用天气api
    this.getWeatherAPIData()
  }

  getWeatherAPIData(){
    let city = 'shanghai'
    // 中文的话需要编码 encodeURIComponent(city)
    axios.jsonp({
      url: 'http://api.map.baidu.com/telematics/v3/weather?location='+ city +'&output=json&ak=3p49MVra6urFRGOT9s8UBWr2'
    }).then((res)=> {
      if(res.status === 'success') {
        let data = res.results[0].weather_data[0];
        this.setState({
          dayPictureUrl: data.dayPictureUrl,
          weather: data.weather
        })
      }
    })
  }

// 天气内容
<span className="weather-img">
  <img src={this.state.dayPictureUrl} alt=""/>
</span>
<span className="weather-detail">
  {this.state.weather}
</span>

```
## 底部组件开发

## 首页
* css3伪类箭头函数实现

## React Router 4.0
1. 基本概念
* react-router
* react-router-dom
`npm install react-router-dom --save`
* react-router-dom核心用法
```
HashRouter和BrowserRouter
Route: path、exact、component、render
NavLink、Link
Switch
```
2. 使用介绍
3. 实战操作
* 新建路由文件
```js
// src >> router.js
import React from 'react'
import {HashRouter, Route} from 'react-router-dom'
import App from './App'
import Login from './pages/login'
import Admin from './admin'
import Buttons from './pages/ui/buttons'

export default class IRouter extends React.Component {
  render() {
    return(
      <HashRouter>
        <App>
          <Route path="/login" component={Login} />
          <Route path="/admin" render={()=>
            <Admin>
              <Route path="/admin/ui/buttons" component={Buttons} />
            </Admin>
          } />
        </App>
      </HashRouter>
    );
  }
}

```
* 设置App外层组件
```js
// src >> App.js
import React, {Component} from 'react'
import './App.css'

class App extends Component{
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default App;

```
* 管理页面内容更新
```js
<Home/>
换成
{this.props.children}
```
* 添加对应子路由及组件
```js
import Login from './pages/login'
import Buttons from './pages/ui/buttons'
```
* 左侧导航组件路由调整
```js
// src >> components >> NavLeft >> index.js
import { NavLink } from 'react-router-dom'
// 省略
  // 菜单渲染
  renderMenu=(data)=>{
    return data.map((item)=>{
      if(item.children) {
        return (
          <SubMenu title={item.title} key={item.key}>
            {this.renderMenu(item.children)}
          </SubMenu>
        )
      }
      return (
        <Menu.Item title={item.title} key={item.key}>
          {item.title}
        </Menu.Item>
      )
    })
  }
// 改成
  renderMenu=(data)=>{
    return data.map((item)=>{
      // 省略
      return (
        <Menu.Item title={item.title} key={item.key}>
          <NavLink to={item.key}>{item.title}</NavLink>
        </Menu.Item>
      )
    })
  }
```
* 添加404页面
> nomatch >> index.js/index.less
```js
// src >> router.js
import NoMatch from './pages/nomatch/index'
// 省略
  <Admin>
    <Switch>
      <Route path="/admin/ui/buttons" component={Buttons} />
      <Route component={NoMatch} />
    </Switch>
  </Admin>
```

[React Router 中文文档](http://react-guide.github.io/react-router-cn/index.html)

#### react-router 4.0 对于接受参数采用 { this.props.match.params.id }

#### this.props.children，它表示组件的所有子节点

## Antd UI组件
1. Button组件
2. Modal组件
3. Loading组件
4. Notice组件
5. Message组件
6. Tab组件
7. Gallery组件
8. Carousel组件

## moment的使用
* 安装
`yarn add moment --save`

## Antd Form组件中Form.create()的方法
> 经 Form.create() 包装过的组件会自带 this.props.form 属性
```js
class CustomizedForm extends React.Component {
// ...代码
}

CustomizedForm = Form.create({})(CustomizedForm);
```

## Antd Table组件
> 项目工程化 - Table动态渲染
* 项目工程化 - Mock数据
* 项目工程化 - Axios封装
* 项目工程化 - Loading处理、错误拦截

## Easy Mock

[官网：https://www.easy-mock.com](https://www.easy-mock.com)

* 新建个人项目（团队项目需要添加组员）
> 点击加号 》 设置项目名称 》 项目基础 URL 》 项目描述 》 点击创建

* 创建接口
> 点击项目 》 点击+创建接口 》 Method(get)、URL(/table/list)、描述(动态表格渲染)
```js
// 数据
{
  "code": 0,
  "msg": "",
  "result|10": [{
    id: '0',
    userName: 'Bob',
    sex: '1',
    state: '1',
    interest: '1',
    birthday: '2000-01-01',
    address: '上海市浦东新区',
    time: '08:00'
  }]
}

// 动态生成
{
  "code": 0,
  "msg": "",
  "result|10": [{
    "id|+1": 0,
    "userName": '@cname',
    "sex|1-2": 1,
    "state|1-5": 1,
    "interest|1-8": 1,
    birthday: '2000-01-01',
    address: '上海市浦东新区',
    time: '08:00'
  }]
}
```

## Mock.js(Mock规范)

[github：https://github.com/nuysoft/Mock/wiki/Getting-Started](https://github.com/nuysoft/Mock/wiki/Getting-Started)

## loading加载
1. 全局html内容添加
```html
<!-- public >> index.html -->
<!-- loading加载 -->
<div class="ajax-loading" id="ajaxLoading" style="display: none;">
  <div class="overlay"></div>
  <div class="loading">
    <img src="https://media.number-7.cn/ebike-h5/static/images/common/loading.gif" alt="">
    <span>加载中，请稍后...</span>
  </div>
</div>
```
2. 样式添加
> src >> style >> loading.less
3. 导入样式
```less
/*common.less*/
@import './loading.less';
```
4. 添加使用
```js
// src >> axios >> index.js
static ajax(options) {
  let loading;
  if (options.data && options.data.isShowLoading !== false) {
    loading = document.getElementById('ajaxLoading')
    loading.style.display = 'block'
  }
  let baseApi = 'https://www.easy-mock.com/mock/5d99a991896b9432186c1e7f/bikeapi'
  return new Promise((resolve, reject) => {
    axios({
      // 省略
    }).then((response) => {
      if (options.data && options.data.isShowLoading !== false) {
        loading = document.getElementById('ajaxLoading')
        loading.style.display = 'none'
      }
      // 省略
    })
  })
}
```

## React v16.9 新特性
`npx react-codemod rename-unsafe-lifecycles`
[React 新特性 —— https://blog.csdn.net/lunahaijiao/article/details/99619460](https://blog.csdn.net/lunahaijiao/article/details/99619460)

## github上传
```
git remote add origin https://github.com/wp360/React.git

git checkout -b bike

git status

git add .

git commit -m "项目初始化"

git push

git push --set-upstream origin bike
```
