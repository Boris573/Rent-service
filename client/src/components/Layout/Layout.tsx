import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';

const Layout: React.FC = () => {
  return (
    <Container maxWidth="xl" sx={{ paddingTop: 2 }}>
      <Outlet />
    </Container>
  );
};

export default Layout;

