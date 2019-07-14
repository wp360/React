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