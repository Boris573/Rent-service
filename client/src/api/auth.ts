import { Admin } from 'src/types/admin';
import axiosInstance from './axiosInstance';

class AuthApi {
  async login(
    email: string,
    password: string
  ): Promise<{
    accessToken: string;
    refreshToken: string;
    user: Admin;
   }> {
    const { data } = await axiosInstance.post('/auth/login', { email, password });
  
    return data;
  };

  async register(
    email: string,
    name: string,
    password: string
  ): Promise<string> {
    const {
      data: { accessToken },
    } = await axiosInstance.post('/auth/register', { email, name, password });
  
    return accessToken;
  };

  async me(): Promise<Admin> {
    const { data: user } = await axiosInstance.get('/auth/me');
  
    return user;
  };
}

export const authApi = new AuthApi();
