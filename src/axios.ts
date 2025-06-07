import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '/api',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  },
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = localStorage.getItem('token');
  return config;
});

export default instance;