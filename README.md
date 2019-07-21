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