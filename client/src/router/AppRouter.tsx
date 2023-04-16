import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Layout from '../components/Layout';
import { MainLayout } from '../components/Layout/MainLayout';
import Houses from 'src/components/Houses';
import Items from 'src/components/Item';

const AppRouter: React.FC = () => (
  <MainLayout>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Houses />} />
      </Route>
      {/* <Route index element={<Navigate to="/home" replace />} /> */}
      <Route path="/item/" element={<Layout />}>
        <Route path=":itemId" element={<Items />} />
      </Route>
      {/* <Route path="/orders" element={<Layout />}>
        <Route index element={<Navigate to="/orders/all" replace />} />
        <Route path="all" element={<Orders />} />
      </Route>
      <Route path="/products" element={<Layout />}>
        <Route index element={<Navigate to="/products/all" replace />} />
        <Route path="all" element={<Products />} />
      </Route>
      <Route path="/locations" element={<Layout />}>
        <Route index element={<Navigate to="/locations/all" replace />} />
        <Route path="all" element={<Locations />} />
      </Route>
      <Route path="/tables" element={<Layout />}>
        <Route index element={<Navigate to="/tables/all" replace />} />
        <Route path="all" element={<Tables />} />
      </Route>
      <Route path="/menus" element={<Layout />}>
        <Route index element={<Navigate to="/menus/all" replace />} />
        <Route path="all" element={<Menus />} />
      </Route>
      <Route path="/landing" element={<Layout />}>
        <Route index element={<Navigate to="/landing/settings" replace />} />
        <Route path="settings" element={<Landing />} /> */}
      {/* </Route> */}
      {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
    </Routes>
  </MainLayout>
);

export default AppRouter;
