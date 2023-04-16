import axios from 'axios'; 
import { environment } from '../environments/environment';

const axiosInstance = axios.create({
  baseURL: environment.apiUrl,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userData');
      window.location.href = '/login';
    }
    return Promise.reject(new Error(error?.response?.data?.message));
  }
);

export default axiosInstance;