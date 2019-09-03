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
  componentWillMount() {
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
