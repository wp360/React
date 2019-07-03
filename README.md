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
.
+-- src
|   +-- component  // 公共组件
|   +-- page // 页面
|   |   +-- index     // 首页
|   |   +-- category  // 分类
|   |   +-- detail    // 详情
|   +-- static // 静态文件
|   +-- json // Mock数据
4. webpack配置文件
* webpack.config.dev.js
* webpack.config.build.js

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