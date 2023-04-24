import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';

const Layout: React.FC = () => {
  return (
    <Container maxWidth="xl">
      <Outlet />
    </Container>
  );
};

export default Layout;

