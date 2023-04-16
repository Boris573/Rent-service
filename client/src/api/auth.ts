import { Admin } from 'src/types/admin';
import axiosInstance from './axiosInstance';

class AuthApi {
  async login(
    username: string,
    password: string
  ): Promise<{
    token: string;
    id: string;
    username: string;
    fullName: string;
   }> {
    const { data } = await axiosInstance.post('/auth/login', { username, password });
    console.log(data)
    return data;
  };

  async register(
    fullName: string,
    username: string,
    password: string
  ): Promise<{
    token: string;
    id: string;
    username: string;
    fullName: string;
   }> {
    const {
      data,
    } = await axiosInstance.post('/auth/register', { fullName, username, password });
  
    return data;
  };
}

export const authApi = new AuthApi();
