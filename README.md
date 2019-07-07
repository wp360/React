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