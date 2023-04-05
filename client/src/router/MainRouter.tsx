import { useAuth } from 'src/hooks/useAuth';
import { SplashScreen } from '../components/Layout/SplashScreen';

import AppRouter from './AppRouter';
import AuthRouter from './AuthRouter';
import OnboardingRouter from './OnboardingRouter';

const MainRouter = () => {
  const { isAuthenticated, isInitialized } = useAuth();

  if (!isInitialized) {
    return <SplashScreen />;
  }

  // if (!isAuthenticated) {
  //   return <AuthRouter />;
  // }

  return <AppRouter />;
};

export default MainRouter;
