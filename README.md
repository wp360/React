## 构建环境搭建
1. 新建项目
```
打开cmd，输入 > mkdir waimai_webapp
> cd waimai_webapp
> npm init
> code .
```

2. 安装webpack
`npm i webpack@4.3.0 --save`

3. 新建目录
```
+-- src
|   +-- component  // 公共组件
|   +-- page // 页面
|   |   +-- index     // 首页
|   |   +-- category  // 分类
|   |   +-- detail    // 详情
|   +-- static // 静态文件
|   +-- json // Mock数据
```

4. webpack配置文件
* webpack.config.dev.js
* webpack.config.build.js

5. 安装插件html-webpack-plugin
`npm i html-webpack-plugin --save`
```js
// webpack.config.dev.js 添加
const HtmlWebPackPlugin = require('html-webpack-plugin');

// ...省略
  plugins: [
    new HtmlWebPackPlugin()
  ]
```

## ES6 配置
1. 安装babel
`npm install --save-dev babel-core babel-loader babel-preset-env`
2. webpack.config设置
```js
  module: {
    rules: [
      // ...省略
      {
        test: /\.(js|jsx)$/,
        use: [{loader: 'babel-loader'}],
        include: srcRoot
      },
```
3. 添加.babelrc文件
```js
{
  "plugins": ["transform-react-jsx"]
}
```
4. jsx语法控件安装
`npm install babel-plugin-transform-react-jsx`

*注意：babel安装的版本问题，babel-core与babel-loader版本尽量一致，差太多会报错
`babel-loader@8 requires Babel 7.x (the package '@babel/core'). If you'd like to use Babel 6.x ('babel-core'), you should install 'babel-loader@7'.`

## Redux的使用
[参考链接：https://www.jianshu.com/p/21960f78937d](https://www.jianshu.com/p/21960f78937d)
1. react-redux provider组件
* provider组件的作用
> provider包裹在根组件外层，使所有的子组件都可以拿到state。
```js
// index.js
import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import Main from './Main/Main.jsx';
import store from './store';

ReactDom.render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById('root')
);

// 它接受store作为props，然后通过context往下传，这样react中任何组件都可以通过context获取store。
// 参考：https://www.jianshu.com/p/2501a9703d13
```
2. React+Redux之combineReducers方法
> Redux 提供了一个combineReducers方法，用于 Reducer 的拆分。你只要定义各个子 Reducer 函数，然后用这个方法，将它们合成一个大的 Reducer。
[参考链接：https://www.jianshu.com/p/1608786c9c46](https://www.jianshu.com/p/1608786c9c46)

## 利用webpack-dev-server搭建一个webpack的服务器
1. 安装webpack-dev-server
`npm i webpack-dev-server --save`
2. webpack.config.dev.js添加对应配置
```js
devServer: {
  contentBase: devPath
},
```
3. 修改package.json
```js
"dev": "./node_modules/.bin/webpack --config webpack.config.dev.js"
// 改成
"dev": "./node_modules/.bin/webpack-dev-server --config webpack.config.dev.js"
```
4. 运行命令
`npm run dev`

## 底部tab
1. 新建文件 BottomBar.jsx、BottomBar.scss
2. 首页入口文件导入底部tab组件
3. index.html添加reset.scss文件
```
<link rel="stylesheet" href="./static/reset.css">
```
4. 新建img文件夹添加对应图片
5. tabReducer里定义初始化数据
```js
const initState = {
  tabs: [
    {
      name: '首页',
      key: TABKEY.home
    },
    {
      name: '订单',
      key: TABKEY.order
    },
    {
      name: '我的',
      key: TABKEY.my
    }
  ],
  activeKey: TABKEY.home
};
// BottomBar.jsx组件 =》 容器组件使用 connect() 方法连接 Redux
export default connect(state => ({
  tabs: state.tabReducer.tabs,
  activeKey: state.tabReducer.activeKey
}))(BottomBar);
```
6. redux设置
```js
// actionTypes.js
export const CHANGE_TAB = 'CHANGE_TAB';
// tabAction.js
import {CHANGE_TAB} from './actionTypes';

export const changeTab = (obj) => {
  return {
    type: CHANGE_TAB,
    obj: obj
  }
}
// tabReducer.js
import { CHANGE_TAB } from '../actions/actionTypes';
import {TABKEY} from '../config.js';

const initState = {
// ...省略
};

const changeTab = (state, action) => {
  let activeKey = action.obj.activeKey;
  return {...state, activeKey: activeKey};
};

const tabReducer = (state=initState,action) => {
  switch(action.type) {
    case CHANGE_TAB: return changeTab(state, action);
    default: return state;
  }
}

export default tabReducer;
```
7. tab组件页面
```jsx
  changeTab(item) {
    this.props.dispatch(changeTab({
      activeKey: item.key
    }));
  }

  renderItems() {
    let tabs = this.props.tabs;
    return tabs.map((item, index) => {
      let cls = item.key + ' btn-item';
      let name = item.name;

      if(item.key === this.props.activeKey) {
        cls += ' active';
      }

      return (
        <div className={cls} key={index} onClick={()=>this.changeTab(item)}>
          <div className="tab-icon"></div>
          <div className="btn-name">{name}</div>
        </div>
      )
    })
  }
  render() {
    return (
      <div className="bottom-bar">
        {this.renderItems()}
      </div>
    )
  }
```

## 使用rem
1. 新建rem.js [dev >> static >> rem.js]
2. scss定义px to rem的转换function
```
@function px2rem($px) {
  $rem: 37.5px;
  @return ($px/$rem) + rem;
}
```
3. 封装公共方法
* component文件夹 》common.scss
4. webpack引入common.scss
* 安装依赖 `npm i sass-resources-loader --save`
* 设置
```js
// webpack.config.dev.js
      {
        test: /\.scss$/,
        use: [
          // ...省略
        , {
          loader: 'sass-resources-loader',
          options: {
            resources: srcRoot + '/component/common.scss'
          }
        }],
        include: srcRoot
      },
```
5. VS code 安装插件Px to rem with scss
6. 配置VS code插件
```js
// C:\Users\用户名\.vscode\extensions\medzhidov.px-to-rem-with-scss-1.0.3\out\src\extension.js
text = text.replace(val, `rem(${parseInt(val)})`);
// 改成
text = text.replace(val, `px2rem(${parseInt(val)}px)`);
```
7. 重启VS code，选中px，按快捷键alt + c，完成切换。

## eslint的使用
1. 安装依赖
`npm i eslint eslint-loader eslint-plugin-react --save`
2. 设置webpack
```js
  module: {
    rules: [
      {
        // ... 省略
        {
          loader: 'eslint-loader'
        }],
        include: srcRoot
      },
```
3. 新建.eslintrc文件

## webpack热更新
1. 安装插件
`npm i react-hot-loader --save`
2. 设置webpack
```js
module.exports = {
  mode: 'development',
  devServer: {
    // ...省略
    hot: true
  },
  // ...省略
    plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ].concat(htmlArray)
```
3. 新建Container.jsx
```jsx
import React from 'react';

import Main from './Main.jsx';
import { hot } from 'react-hot-loader';


class Container extends React.Component {
    render() {
        return <Main />
    }
}

export default hot(module)(Container);
```
4. 修改index.js，引入Container.jsx替换Main.jsx
5. store.js热更新判断
```js
if (module.hot) {
  module.hot.accept('./reducers/main', () => {
    const nextRootReducer = require('./reducers/main.js').default;
    store.replaceReducer(nextRootReducer)
  });
}
```

## Home首页
1. 新建文件Home.jsx、Home.scss
2. 头部文件Header.jsx、Header.scss
3. 搜索框SearchBar.jsx、SearchBar.scss

## 首页附近商家列表
1. 新建文件夹ContentList，再新建ContentList.jsx、ContentList.scss
2. actionTypes.js添加参数
```js
export const LIST_DATA = 'LIST_DATA';
```
3. 新建contentListAction.js
```js
import {LIST_DATA} from './actionTypes';
import axios from 'axios';

export const getListData = () => (dispatch) => {
  axios({
    method: 'get',
    url: '/json/homelist.json'
  }).then((resp) => {
    dispatch({
      type: LIST_DATA,
      obj: resp.data
    })
  });
}
```
4. 新建contentListReducer.js
```js
import {LIST_DATA} from '../actions/actionTypes';

const initState = {
  list: []
};

const getListData = (state,action) => {
  return {...state, list: action.obj.data.poilist};
}

const contentListReducer = (state=initState,action) => {
  switch(action.type) {
    case LIST_DATA: return getListData(state, action);
    default: return state;
  }
}

export default contentListReducer;
```
6. reducers/main.js添加contentListReducer.js
```js
// ...省略
import contentListReducer from './contentListReducer.js';
import {combineReducers} from 'redux';

const reducers = combineReducers({
  // ...省略
  contentListReducer
});

export default reducers;
```
7. ContentList组件页面制作，数据绑定
8. Home.jsx添加ContentList组件
```js
import ContentList from './Category/ContentList/ContentList';

class Home extends React.Component {
  // ...省略
  render() {
    return (
        // ...省略
        <ContentList/>
    )
```

## 滚动加载
> scrollTop + clientHeight >= scrollHeight
1. 通过react生命周期监听滚动事件判断页面滚动
```jsx
  onLoadPage() {
    let clientHeight = document.documentElement.clientHeight;
    let scrollHeight = document.body.scrollHeight;
    let scrollTop = document.documentElement.scrollTop;
    let proLoadDis = 30;

    if ((scrollTop + clientHeight) >= (scrollHeight - proLoadDis)) {
      console.log(1);
    }
  }

  // 旧版本 componentWillMount
  UNSAFE_componentWillMount () {
    window.addEventListener('scroll', this.onLoadPage.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onLoadPage.bind(this));
  }
```
2. 页面滚动，加载数据
```jsx
  constructor(props) {
    super(props);
    // 页面滚动初始值
    this.state = {
      isend: false,
      loadingText: '加载中'
    };
    // 请求第一屏数据
    this.fetchData(this.page);
    // 记录当前页码
    this.page = 0;
  }

  onLoadPage() {
    // ...省略

    if ((scrollTop + clientHeight) >= (scrollHeight - proLoadDis)) {
      // console.log(1);
      this.page ++;
      // 最多滚动3页
      if(this.page > 3) {
        this.setState({
          isend: true,
          loadingText: '已完成'
        });
      } else {
        this.fetchData(this.page);
      }
    }
  }

  fetchData(page) {
    this.props.dispatch(getListData(page));
  }

  // getListData(page)连接redux
  // contentListAction.js
  export const getListData = (page) => (dispatch) => {
    axios({
        // ...省略
    }).then((resp) => {
      dispatch({
        // ...省略
        currentPage: page
      })
    });
  }
  // contentListReducer.js
  const getListData = (state,action) => {
    if(action.page === 0) {
      return {...state, list: action.obj.data.poilist};
    } else {
      let list = state.list;
      return {...state, list: list.concat(action.obj.data.poilist)};
    }
  }
  // loadingText判断加载完成的文字显示
  render() {
    return (
      <div className="list-content">
        <!-- 省略 -->
        <div className="loading">{this.state.loadingText}</div>
      </div>
    )
  }
```
3. 样式添加

## 提取加载公共组件
1. component文件夹下新建Loading》Loading.jsx、Loading.scss
2. 修改webpack.config.dev.js设置，添加component根目录
3. 页面引入组件，删除多余初始参数
```jsx
import Loading from 'component/Loading/Loading.jsx';
// ...省略
  render() {
    return (
      <div className="list-content">
        <!-- 省略 -->
        <Loading isend={this.state.isend} />
      </div>
    )
  }
```

## 订单页面
#### 提取公共组件ScrollView
1. 新建ScrollView文件夹 》ScrollView.jsx、ScrollView.scss
2. ScrollView.jsx，提取出onLoadPage()方法及添加Loading组件
```jsx
import React from 'react';
import Loading from 'component/Loading/Loading';
/**
 * <ScrollView loadCallback={function} isend={bool}/>
 * @description 滚动加载组件
 */

class ScrollView extends React.Component {
  onLoadPage() {
    let clientHeight = document.documentElement.clientHeight;
    let scrollHeight = document.body.scrollHeight;
    let scrollTop = document.documentElement.scrollTop;
    let proLoadDis = 30;

    if ((scrollTop + clientHeight) >= (scrollHeight - proLoadDis)) {
      if(!this.props.isend) {
        this.props.loadCallback && this.props.loadCallback();
      }
    }
  }

  // 旧版本 componentWillMount
  UNSAFE_componentWillMount() {
    window.addEventListener('scroll', this.onLoadPage.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onLoadPage.bind(this));
  }

  render() {
    return (
      <div className="scrollview">
        {this.props.children}
        <Loading isend={this.props.isend}/>
      </div>
    );
  }
}

export default ScrollView;

// main.js
import headerReducer from './headerReducer';
import {combineReducers} from 'redux';

const reducers = combineReducers({
  headerReducer
});

export default reducers;
```
3. 相关内容列表页面引入及参数添加
```jsx
import ScrollView from 'component/ScrollView/ScrollView';

render() {
  return (
    <div className="list-content">
      <!-- 省略 -->
      <ScrollView loadCallback={this.onLoadPage.bind(this)} isend={this.state.isend}>
        {this.renderItems()}
      </ScrollView>
    </div>
  )
}
```
#### 订单页面制作
#### 订单列表单个组件
> 参照首页商家列表制作

## 我的
> 参照设计稿制作页面

## 路由
1. 安装依赖
`npm i react-router-dom react-router-redux --save`

[react-router参考网站：https://reacttraining.com/react-router/](https://reacttraining.com/react-router/)
[react-router-redux参考网址：https://github.com/ReactTraining/react-router/tree/5345a820818c8d43ac923558670538a479ac2234/packages/react-router-redux](https://github.com/ReactTraining/react-router/tree/5345a820818c8d43ac923558670538a479ac2234/packages/react-router-redux)

2. 引入依赖
```js
// index/index.js
// ...省略
import { ConnectedRouter } from 'react-router-redux';

ReactDom.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Container />
        </ConnectedRouter>
        </Provider>,
    document.getElementById('root')
);
```

3. store.js添加history
```js
// import createHistory from 'history/createHashHistory';
import {createHashHistory} from 'history';
import {routerMiddleware} from 'react-router-redux';
// 创建基于hash的history
const history = createHashHistory();
// 创建初始化tab
history.replace('home');
// 创建history的Middleware
const historyMiddl = routerMiddleware(history);
const store = createStore(mainReducer, applyMiddleware(thunk, historyMiddl));
// ...省略
module.exports = {store,history}
```

4. main.js添加reducer
```js
// index/reducers/main.js
// 省略
import {routerReducer} from 'react-router-redux';

const reducers = combineReducers({
  // ...省略
  router: routerReducer
});

export default reducers;
```

5. 页面添加路由
```jsx
// Main.jsx
import {Route, withRouter} from 'react-router-dom';
// ...省略
  render() {
    return (
      <div>
        <Route exact path="/home" component={Home}/>
        <Route path="/order" component={Order}/>
        <Route path="/my" component={My}/>
        <BottomBar/>
      </div>
    );
  }
// ...省略
export default withRouter(connect()(Main));
```

6. 底部BottomBar调整
```jsx
// BottomBar.jsx
// ...省略
// import {changeTab} from '../actions/tabAction';
// ...省略
  changeTab(item) {
    this.props.history.replace(item.key);
    // this.props.dispatch(changeTab({
    //   activeKey: item.key
    // }));
  }

  return (
    <NavLink className={cls} replace={true} to={"/" + item.key} activeClassName="active" key={index} onClick={()=>this.changeTab(item)}>
      <div className="tab-icon"></div>
      <div className="btn-name">{name}</div>
    </NavLink>
  )
// ...省略
export default withRouter(connect(state => ({
  tabs: state.tabReducer.tabs,
  activeKey: state.tabReducer.activeKey
}))(BottomBar));
```

## history报错
> warnAboutDeprecatedCJSRequire.js:17 Warning: Please use `require("history").createHashHistory` instead of `require("history/createHashHistory")`. Support for the latter will be removed in the next major release.
```js
import {createHistory} from 'history/createHashHistory';
// 创建基于hash的history
const history = createHistory();
// 改成
import {createHashHistory} from 'history';
// 创建基于hash的history
const history = createHashHistory();
```

##react-router-redux使用报错
```
使用react-router4.

npm install react-router-redux 

安装的react-router-redux默认是到@4.0.8,当使用ConnectedRouter组件包裹app时，会报错说引入的不是组件/string(type is invalid).这是因为该版本不能和react-router4协作

见：

https://github.com/ReactTraining/react-router/issues/4769

https://github.com/ReactTraining/react-router/issues/4694

solution:

npm install react-router-redux@next 安装5.0.0-alpha.x
```

## 分类页面
1. 新建文件
> 目录结构
```
+-- page
|   +-- category // 分类
|   |   +-- actions
|   |   +-- Header
|   |   +-- Main
|   |   +-- reducers
|   +-- category.html
|   +-- config.js
|   +-- index.js
|   +-- store.js
```
2. 公共组件NavHeader
3. Main
* Container.jsx
* Main.jsx
* Main.scss
4. Header
* Header.jsx
* Header.scss
5. config.js
```js
// TABKEY
module.exports = {
  TABKEY: {
    cate: 'cate',
    type: 'type',
    filter: 'filter'
  }
}
```
6. reducers
```js
// headerReducer.js
import {TABKEY} from '../config.js';
let tabs = {};
tabs[TABKEY.cate] = {
  key: TABKEY.cate,
  text: '全部分类',
  obj: {}
}
tabs[TABKEY.type] = {
  key: TABKEY.type,
  text: '综合排序',
  obj: {}
}
tabs[TABKEY.filter] = {
  key: TABKEY.filter,
  text: '筛选',
  obj: {}
}
const initState = {
  tabs: tabs,
  activeKey: TABKEY.cate
};

const headerReducer = (state=initState,action) => {
  switch(action.type) {
    default: return state;
  }
}

export default headerReducer;
```
7. actions
```js
// actionTypes.js
export const CHANGE_TAB = 'CHANGE_TAB';
// headerAction.js
import {CHANGE_TAB} from './actionTypes';

export const changeTab = (obj) => (dispatch) => {
  dispatch({
    type: CHANGE_TAB,
    obj: obj
  });
}
```
8. changeTab效果添加
```js
// headerReducer.js
const changeTab = (state, action) => {
  return {...state, activekey: action.obj.activekey};
}

const headerReducer = (state=initState,action) => {
  switch(action.type) {
    case CHANGE_TAB: return changeTab(state, action);
    default: return state;
  }
}
```
```jsx
// Header.jsx
import {changeTab} from '../actions/headerAction';
// ...省略
  changeTab(key) {
    this.props.dispatch(changeTab({
      activeKey: key
    }));
  }
// ...省略
  renderTabs() {
      // ...省略
      array.push(
        <div className={cls} key={item.key} onClick={()=>this.changeTab(item.key)}>
          {item.text}
        </div>
      );
    }
    return array;
  }
```
9. store.js
```js
// 注意：中间件的使用
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import mainReducer from './reducers/main.js';

const store = createStore(mainReducer, applyMiddleware(thunk, logger));

export default store;
```


## 关于Redux
* a. 需要回调通知state (等同于回调参数) -> action
* b. 需要根据回调处理 (等同于父级方法) -> reducer
* c. 需要state (等同于总状态) -> store
> action: 指全局发布的动作指令，主要就是定义所有事件行为的
> reducer: action指令发起会触发reducer对应函数执行

## git上传
```
git remote add origin https://github.com/wp360/React.git

git checkout -b waimai_webapp

git status

git add .

git commit -m "文件上传"

git push

git push --set-upstream origin waimai_webapp
```