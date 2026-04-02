// src/lib/axiosInstance.ts
import axios from 'axios';

// 创建 Axios 实例
const axiosInstance = axios.create({
  baseURL: process.env.MEDUSA_BACKEND_URL,
  timeout: 30000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json',
    'x-publishable-api-key': process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
  },
});


// 响应拦截器
axiosInstance.interceptors.response.use(
  (response) => {
    // 处理响应数据
    return response;
  },
  (error) => {
    // 处理响应错误
    if (error.response) {
      // 服务器返回的错误
      console.error('axiosInstance medusa - Error response:', error.response.status, error.response.data);
    } else if (error.request) {
      // 请求没有收到响应
      console.error('axiosInstance medusa Error request:', error.request);
    } else {
      // 其他错误
      console.error('axiosInstance medusa Error message:', error.message);
    }
    return Promise.reject(error instanceof Error ? error : new Error(error));
  }
);

export default axiosInstance;
