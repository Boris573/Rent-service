import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Layout from '../components/Layout';
import { MainLayout } from '../components/Layout/MainLayout';
import Houses from 'src/components/Houses';
import Items from 'src/components/Item';
import Profile from 'src/components/Profile';

const AppRouter: React.FC = () => (
  <MainLayout>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Houses />} />
      </Route>
      <Route path="/item/" element={<Layout />}>
        <Route path=":itemId" element={<Items />} />
      </Route>
      <Route path="/profile" element={<Layout />}>
        <Route path="" element={<Profile />} />
      </Route>
    </Routes>
  </MainLayout>
);

export default AppRouter;
