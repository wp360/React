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
