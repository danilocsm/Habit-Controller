import axios, { AxiosRequestConfig } from 'axios';
import { getItem } from '../services/localStorageService';

const requestHandler = (config: AxiosRequestConfig<any>) => {
  const token = getItem('user-token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

const api = axios.create({ baseURL: 'http://localhost:3333' });

api.interceptors.request.use(requestHandler);

export { api };
