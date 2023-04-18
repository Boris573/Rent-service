import { Admin, AdminBody } from 'src/types/admin';
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

    return data;
  };

  async register(
    user: AdminBody
  ): Promise<{
    token: string;
    id: string;
    username: string;
    fullName: string;
   }> {
    const {
      data,
    } = await axiosInstance.post('/auth/register', user);
  
    return data;
  };

  async me(): Promise<Admin> {
    const { data } = await axiosInstance.get('/user/me');
    console.log(data)
    return data;
  };
}

export const authApi = new AuthApi();
