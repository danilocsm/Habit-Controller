import axios, { AxiosRequestConfig } from 'axios';
import { getItem } from '../services/localStorageService';

const requestHandler = (config: AxiosRequestConfig<any>) => {
  const token = getItem('user-token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });
api.interceptors.request.use(requestHandler);

export { api };
