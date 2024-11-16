import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
export const baseURL = 'https://cng-be.vercel.app';
export const testURL = 'http://127.0.0.1:8000';

export const DEEP_LINK_PREFIX = 'cng-be.vercel://';
export const DEEP_LINK_WEB_VERSION = 'https://cng-be.vercel.app/app-redirect';
let headers = {};
const axiosIns = axios.create({
  baseURL: baseURL,
  headers,
});
axiosIns.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('access');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error.msg);
  },
);

axiosIns.interceptors.response.use(
  response =>
    new Promise((resolve, reject) => {
      resolve(response);
    }),
  error => {
    if (!error.response) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
    if (error.response.status === 401) {
      console.log('401');
    } else {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  },
);

export default axiosIns;
