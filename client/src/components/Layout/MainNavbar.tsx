import React, { useRef, useState, FC } from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  ButtonBase,
  IconButton,
  Link,
  Toolbar,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import type { AppBarProps } from '@mui/material';
import { Menu as MenuIcon } from '../../assets/icons/menu';
import { UserCircle as UserCircleIcon } from '../../assets/icons/user-circle';
import OfferDialog from '../HouseDialog';
import { getItems } from 'src/slices/item';
import { useAuth } from 'src/hooks/useAuth';
import { AccountPopover } from './AccountPopover';
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
  const { user } = useAuth();

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
          src={user.avatar || '/static/mock-images/avatars/avatar-anika_visser.png'}
        >
          <UserCircleIcon fontSize="small" />
        </Avatar>
      </Box>
      <AccountPopover
        anchorEl={anchorRef.current}
        onClose={handleClosePopover}
        open={openPopover}
      />
    </>
  );
};

export const MainNavbar: FC<MainNavbarProps> = (props) => {
  const { onOpenSidebar, ...other } = props;

  const { isAuthenticated } = useAuth();

  const [isOfferDialogOpen, setOfferDialogOpen] = useState(false);

  const handleRowClick = (): void => {
    setOfferDialogOpen(true);
  };

  const handleLocationDialogClose = (success?: boolean): void => {
    setOfferDialogOpen(false);
    if (success) {
      getItems();
    }
  };

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
        <Link href="/" underline="none">
          <Typography color="text.primary" variant='h5'>Rent service</Typography>
        </Link>
        <Box sx={{ flexGrow: 1 }} />
        {isAuthenticated &&
          (
            <Button
            variant="contained"
            onClick={() => handleRowClick()}
          >
            Добавить объявление
          </Button>
          )
        }
        <AccountButton />
      </Toolbar>
      <OfferDialog
        onAddComplete={() => handleLocationDialogClose(true)}
        onClose={() => handleLocationDialogClose()}
        onDeleteComplete={() => handleLocationDialogClose(true)}
        onEditComplete={() => handleLocationDialogClose(true)}
        open={isOfferDialogOpen}
      />
    </MainNavbarRoot>
  );
};

MainNavbar.propTypes = {
  onOpenSidebar: PropTypes.func,
  sidebarHidden: PropTypes.bool
};
