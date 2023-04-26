import axios, { AxiosRequestConfig } from "axios"
import { Button, message } from 'antd'

const request = axios.create({
  baseURL: "/api",
  timeout: 3000
})
request.interceptors.request.use((config) => {
  try {
    const Token = localStorage.getItem("token")
    if (Token) {
      config.headers.Authorization = `Bearer ${Token}`
    }
    return config
  } catch (error) {
    return Promise.reject(new Error("faile"))
  }
}, err => {
  return Promise.reject(new Error(err))
})
request.interceptors.response.use((res) => {
  if (res.status === 201 || res.status === 200) {
    return res
  } else {
    return Promise.reject(res)
  }
}, err => {
  if (err.response.status === 404) {
    message.error(err.response.data.message)
    return Promise.reject(err)
  }
  return Promise.reject(err)
}
)
export default request


