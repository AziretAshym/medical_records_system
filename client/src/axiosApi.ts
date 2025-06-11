import axios from "axios";
import { apiUrl } from './globalConstants.ts';

const axiosApi = axios.create({
  baseURL: apiUrl,
});

axiosApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosApi;
