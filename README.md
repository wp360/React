## ES6 配置
1. 安装babel
`npm install --save-dev babel-core babel-loader babel-preset-env`
2. webpack.config设置
```js
  module: {
    // 加载器配置
    loaders: [
      { test: /\.js$/, loader: 'babel-loader' },
      // ...省略
    ]
  }
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

