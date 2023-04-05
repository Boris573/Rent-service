import React, { useRef, useState, FC } from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  ButtonBase,
  IconButton,
  Toolbar,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import type { AppBarProps } from '@mui/material';
import { Menu as MenuIcon } from '../../assets/icons/menu';
import { UserCircle as UserCircleIcon } from '../../assets/icons/user-circle';
// import { AccountPopover } from './AccountPopover';

interface MainNavbarProps extends AppBarProps {
  onOpenSidebar?: () => void;
  sidebarHidden?: boolean;
}

const MainNavbarRoot = styled(AppBar)(
  ({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    ...(
      theme.palette.mode === 'light'
        ? {
          boxShadow: theme.shadows[3]
        }
        : {
          backgroundColor: theme.palette.background.paper,
          borderBottomColor: theme.palette.divider,
          borderBottomStyle: 'solid',
          borderBottomWidth: 1,
          boxShadow: 'none'
        }
    )
  })
);

const AccountButton = () => {
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const [openPopover, setOpenPopover] = useState<boolean>(false);
  // To get the user from the authContext, you can use
  // `const { user } = useAuth();`
  const user = {
    avatar: '/static/mock-images/avatars/avatar-anika_visser.png',
    name: 'Anika Visser'
  };

  const handleOpenPopover = (): void => {
    setOpenPopover(true);
  };

  const handleClosePopover = (): void => {
    setOpenPopover(false);
  };

  return (
    <>
      <Box
        component={ButtonBase}
        onClick={handleOpenPopover}
        ref={anchorRef}
        sx={{
          alignItems: 'center',
          display: 'flex',
          ml: 2
        }}
      >
        <Avatar
          sx={{
            height: 40,
            width: 40
          }}
          src={user.avatar}
        >
          <UserCircleIcon fontSize="small" />
        </Avatar>
      </Box>
      {/* <AccountPopover
        anchorEl={anchorRef.current}
        onClose={handleClosePopover}
        open={openPopover}
      /> */}
    </>
  );
};

export const MainNavbar: FC<MainNavbarProps> = (props) => {
  const { onOpenSidebar, ...other } = props;

  return (
    <MainNavbarRoot
      sx={{
        left: {
          lg: props.sidebarHidden ? 0 : 280
        },
        width: {
          lg: props.sidebarHidden ? '100%' : 'calc(100% - 280px)'
        }
      }}
      {...other}
    >
      <Toolbar
        disableGutters
        sx={{
          minHeight: 64,
          left: 0,
          px: 2
        }}
      >
        <IconButton
          onClick={onOpenSidebar}
          sx={{
            display: {
              xs: 'inline-flex',
              lg: 'none'
            }
          }}
        >
          <MenuIcon fontSize="small" />
        </IconButton>
        <Typography color="text.primary" variant='h5'>Rent service</Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Button
          variant="contained"
          // onClick={}
        >
          Добавить объявление
        </Button>
        <AccountButton />
      </Toolbar>
    </MainNavbarRoot>
  );
};

MainNavbar.propTypes = {
  onOpenSidebar: PropTypes.func,
  sidebarHidden: PropTypes.bool
};
