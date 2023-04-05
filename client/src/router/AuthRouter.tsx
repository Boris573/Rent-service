import { Navigate, Route, Routes } from 'react-router-dom';
import Login from 'src/components/Login';
import { Register } from 'src/components/Register';

const AuthRouter = () => (
  <Routes>
    <Route index element={<Navigate to="/login" replace />} />
    <Route path={'/login'} element={<Login />} />
    <Route path={'/register'} element={<Register />} />
    <Route path="*" element={<Navigate to="/login" replace />} />
  </Routes>
);

export default AuthRouter;
