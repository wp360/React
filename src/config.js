import axios from 'axios'
import { Toast } from 'antd-mobile'
// 拦截器请求
axios.interceptors.request.use((config) => {
  Toast.loading('加载中...', 0)
  return config
})

// 拦截器响应
axios.interceptors.response.use((config) => {
  setTimeout(() => {
    Toast.hide()
  }, 3000)
  return config
})