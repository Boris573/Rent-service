import { useContext } from 'react';
import { AuthContext } from '../contexts/JwtContext';

export const useAuth = () => useContext(AuthContext);
