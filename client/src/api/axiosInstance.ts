import axios from 'axios'; 
import { environment } from '../environments/environment';

const axiosInstance = axios.create({
  baseURL: environment.apiUrl,
});

export default axiosInstance;