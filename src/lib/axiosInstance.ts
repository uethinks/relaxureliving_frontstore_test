// src/lib/axiosInstance.ts
import axios from 'axios';
const qs = require('qs');

// 创建 Axios 实例
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL,
  timeout: 30000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    // 从环境变量中获取 token
    const token = process.env.NEXT_PUBLIC_STRAPI_CMS_API_TOKEN;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // console.log('config.paramsSerializer', config.paramsSerializer)
    config.paramsSerializer = config.paramsSerializer
    ? config.paramsSerializer // if you want to still be able to overwrite it on a per-request level
    : qs.stringify;
    return config;
  },
  (error) => {
    // 处理请求错误
    console.error('Request error:', error);
    return Promise.reject(error instanceof Error ? error : new Error(error));
  }
);

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
      console.error('axiosInstance strapicms - Error response:', error.response.status, error.response.data, 'for URL:', error.response.config?.baseURL + error.response.config?.url);
    } else if (error.request) {
      // 请求没有收到响应
      console.error('axiosInstance strapicms - Error request:', error.request);
    } else {
      // 其他错误
      console.error('axiosInstance strapicms - Error message:', error.message);
    }
    return Promise.reject(error instanceof Error ? error : new Error(error));
  }
);

export default axiosInstance;