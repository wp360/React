import React from 'react';
import {Button, List} from 'antd-mobile';
// import 'antd-mobile/dist/antd-mobile.css';
// import 'antd-mobile/es/button/style/index.css';

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
// function App() {
//   return (
//     <div className="App">
//       <h1>React 面试</h1>
//     </div>
//   );
// }

function Interview(props) {
  return <h2>面试由技术{props.boss}，先开始提问</h2>
}

class NewComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      skills: ['HTML5', 'CSS3', 'JS','小程序', '后端']
    }
    // this.addSkill = this.addSkill.bind(this)
    // this.clickHandler = this.clickHandler.bind(this)
    console.log('组件初始化')
  }

  // 生命周期
  // componentWillMount() {
  //   console.log('组件马上就要加载了')
  // }
  componentDidMount() {
    console.log('组件已加载')
  }

  addSkill() {
    this.setState({
      skills: [...this.state.skills, '新技能' + Math.random()]
    })
  }

  clickHandler = (event) => {
      event.preventDefault() // 阻止默认行为
      event.stopPropagation() // 阻止冒泡
      console.log('target', event.target) // 指向当前元素，即当前元素触发
      console.log('current target', event.currentTarget) // 指向当前元素，假象！！！

      // 注意，event 其实是 React 封装的。可以看 __proto__.constructor 是 SyntheticEvent 组合事件
      console.log('event', event) // 不是原生的 Event ，原生的 MouseEvent
      console.log('event.__proto__.constructor', event.__proto__.constructor)

      // 原生 event 如下。其 __proto__.constructor 是 MouseEvent
      console.log('nativeEvent', event.nativeEvent)
      console.log('nativeEvent target', event.nativeEvent.target) // 指向当前元素，即当前元素触发
      console.log('nativeEvent current target', event.nativeEvent.currentTarget) // 指向 document ！！！

      // 1. event 是 SyntheticEvent ，模拟出来 DOM 事件所有能力
      // 2. event.nativeEvent 是原生事件对象
      // 3. 所有的事件，都被挂载到 document 上
      // 4. 和 DOM 事件不一样，和 Vue 事件也不一样
  }

  render() {
    // const boss = 'CTO'
    // return <h2>面试官，{boss}</h2>
    console.log('组件正在加载...')
    return (
      <div>
        <h2>面试官，{this.props.boss}</h2>
        <Button type="primary" onClick={this.clickHandler}>添加技能</Button>
        <List renderHeader={()=>'技能列表'}>
          { this.state.skills.map(item => {
            return (
              <List.Item key={item}>
                {item}
              </List.Item>
            )
          })}
        </List>
      </div>
    )
  }
}

export default App;

