import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Houses from 'src/components/Houses';

import { MainLayout } from '../components/Layout/MainLayout';
// import { Onboarding } from '../components/Onboarding';

const OnboardingRouter: React.FC = () => (
  <MainLayout sidebarHidden>
    <Routes>
      <Route path="/" element={<Houses />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </MainLayout>
);

export default OnboardingRouter;
