import type { FC, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { styled, SxProps } from '@mui/material/styles';
import { MainNavbar } from './MainNavbar';
import { Box } from '@mui/material';
import { Theme } from '@mui/system';

interface MainLayoutProps {
  children?: ReactNode;
}

export const MainLayout: FC<MainLayoutProps> = (props) => {
  const { children } = props;

  return (
    <>
      <MainLayoutRoot>
        <Box
          sx={styles.wrapper}
        >
          {children}
        </Box>
      </MainLayoutRoot>
      <MainNavbar />
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