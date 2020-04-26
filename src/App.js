import React from 'react';
import {
  Button,
  List
} from 'antd-mobile';
// import 'antd-mobile/dist/antd-mobile.css';
// import 'antd-mobile/es/button/style/index.css';

class App extends React.Component{
  render() {
    const store = this.props.store
    const num = store.getState()
    const add = this.props.add
    const reduce = this.props.reduce
    const addAsync = this.props.addAsync
    return (
      <div className="App">
        <h1>React 面试</h1>
        <NewComponent boss="CTO" />
        <Interview boss="Mr.黄" />
        <p>已经掌握技能{num}种</p>
        <Button type="primary" onClick={()=>store.dispatch(add())}>新增</Button>
        <br/>
        <Button type="primary" onClick={()=>store.dispatch(reduce())}>减少</Button>
        <br/>
        <Button type="primary" onClick={()=>store.dispatch(addAsync())}>等待新增</Button>
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
      skills: ['HTML5', 'CSS3', 'JS','小程序', '后端'],
      name: 'Bob',
      info: '个人信息',
      city: '上海',
      flag: true,
      gender: 'male'
    }
    this.addSkill = this.addSkill.bind(this)
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

  onInputChange = (e) => {
    this.setState({
      name: e.target.value
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

  onTextareaChange = (e) => {
    this.setState({
      info: e.target.value
    })
  }

  onSelectChange = (e) => {
    this.setState({
      city: e.target.value
    })
  }

  onCheckboxChange = () => {
    this.setState({
      flag: !this.state.flag
    })
  }

  onRadioChange = (e) => {
    this.setState({
      gender: e.target.value
    })
  }

  render() {
    // const boss = 'CTO'
    // return <h2>面试官，{boss}</h2>
    // console.log('组件正在加载...')
    return (
      // // select - 使用 value
      // return <div>
      //     <select value={this.state.city} onChange={this.onSelectChange}>
      //         <option value="beijing">北京</option>
      //         <option value="shanghai">上海</option>
      //         <option value="shenzhen">深圳</option>
      //     </select>
      //     <p>{this.state.city}</p>
      // </div>

      // // checkbox
      // return <div>
      //     <input type="checkbox" checked={this.state.flag} onChange={this.onCheckboxChange}/>
      //     <p>{this.state.flag.toString()}</p>
      // </div>

      // // radio
      // return <div>
      //     male <input type="radio" name="gender" value="male" checked={this.state.gender === 'male'} onChange={this.onRadioChange}/>
      //     female <input type="radio" name="gender" value="female" checked={this.state.gender === 'female'} onChange={this.onRadioChange}/>
      //     <p>{this.state.gender}</p>
      // </div>

      // clickHandler
      <div>
        <h2>面试官，{this.props.boss}</h2>
        <Button type="primary" onClick={this.addSkill}>添加技能</Button>
        <List renderHeader={()=>'技能列表'}>
          { this.state.skills.map(item => {
            return (
              <List.Item key={item}>
                {item}
              </List.Item>
            )
          })}
        </List>
        <p>{this.state.name}</p>
        <label htmlFor="inputName">姓名：</label> {/* 用 htmlFor 代替 for */}
        <input id="inputName" value={this.state.name} onChange={this.onInputChange}/>
        <br />
        <textarea value={this.state.info} onChange={this.onTextareaChange}/>
        <p>{this.state.info}</p>
      </div>
    )
  }
}

// redux
// function counter(state = 0, action) {
//   switch (action.type) {
//     case 'add':
//       return state + 1
//     case 'reduce':
//       return state - 1
//     default:
//       return 10
//   }
// }

// 新建store
// const store = createStore(counter)
// const init = store.getState()
// console.log(init)

// 订阅
// function listener() {
//   const current = store.getState()
//   console.log(`现在拥有技能${current}`)
// }
// store.subscribe(listener)

// 派发事件 传递action
// store.dispatch({
//   type: 'add'
// })
// console.log(store.getState())
// store.dispatch({
//   type: 'reduce'
// })
// console.log(store.getState())

export default App;

