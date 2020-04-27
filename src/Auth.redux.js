import axios from 'axios'

const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const USER_DATA = 'USER_DATA'

// 初始数据
const initState = {
  isAuth: false,
  user: 'admin',
  pwd: 'admin',
  type: 'boss'
}

export function auth(state = initState, action) {
  // console.log(state)
  console.log(state, action)
  switch(action.type) {
    case LOGIN:
      return {state, isAuth: true}
    case LOGOUT:
      return {state, isAuth: false}
    case USER_DATA:
      return {state, ...action.playload}
    default:
      return state
  }
}

// action
// 获取数据
export function getUserData() {
  // dispatch用来通知数据修改
  return dispatch => {
    axios.get('/data').then((res) => {
      console.log(res.data)
      if(res.status === 200) {
        if (res.data.length > 1) {
          dispatch(userData(res.data[0]))
        } else{
          dispatch(userData(res.data))
        }
      }
    })
  }
}

export function userData(data) {
  return {type: USER_DATA, playload: data}
}

export function login() {
  return {type: LOGIN}
}

export function logout() {
  return {type: LOGOUT}
}