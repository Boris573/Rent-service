import React, { useState } from 'react';
import type { FC, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { styled, SxProps } from '@mui/material/styles';
import { MainNavbar } from './MainNavbar';
// import { MainSidebar } from './MainSidebar';
import { Box } from '@mui/material';
import { Theme } from '@mui/system';

interface MainLayoutProps {
  children?: ReactNode;
  sidebarHidden?: boolean;
}

export const MainLayout: FC<MainLayoutProps> = (props) => {
  const { children } = props;
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  return (
    <>
      <MainLayoutRoot sx={isSidebarOpen ? { paddingLeft: '0 !important' } : null}>
        <Box
          sx={styles.wrapper}
        >
          {children}
        </Box>
      </MainLayoutRoot>
      <MainNavbar onOpenSidebar={(): void => setIsSidebarOpen(true)} sidebarHidden={true} />
      {/* {!props.sidebarHidden && (
        <MainSidebar
          onClose={(): void => setIsSidebarOpen(false)}
          open={isSidebarOpen}
        />
      )} */}
    </>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node
};

interface Styles {
  [key: string]: SxProps<Theme>
}

const styles: Styles = {
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'column',
    width: '100%'
  },
}

const MainLayoutRoot = styled('div')(
  ({ theme }) => ({
    display: 'flex',
    flex: '1 1 auto',
    maxWidth: '100%',
    paddingTop: 64,
  })
);