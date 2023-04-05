import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import {
  Avatar,
  Box,
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Popover,
  Typography
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
// import { useAuth } from '../../hooks/useAuth';
import { Cog as CogIcon } from '../../assets/icons/cog';
import { UserCircle as UserCircleIcon } from '../../assets/icons/user-circle';
import { SwitchHorizontalOutlined as SwitchHorizontalOutlinedIcon } from '../../assets/icons/switch-horizontal-outlined';

interface AccountPopoverProps {
  anchorEl: null | Element;
  onClose?: () => void;
  open?: boolean;
}

export const AccountPopover: FC<AccountPopoverProps> = (props) => {
  const { anchorEl, onClose, open, ...other } = props;
  // const { logout, user } = useAuth();
  const navigate = useNavigate();

  // if (!user) {
  //   return null;
  // }

  const handleLogout = async (): Promise<void> => {
    try {
      onClose?.();
      // await logout();
      navigate('/');
    } catch (err) {
      console.error(err);
      toast.error('Unable to logout.');
    }
  };

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'center',
        vertical: 'bottom'
      }}
      keepMounted
      onClose={onClose}
      open={!!open}
      PaperProps={{ sx: { width: 300 } }}
      transitionDuration={0}
      {...other}
    >
      <Box
        sx={{
          alignItems: 'center',
          p: 2,
          display: 'flex'
        }}
      >
        <Avatar
          src='/static/mock-images/avatars/avatar-anika_visser.png'
          sx={{
            height: 40,
            width: 40
          }}
        >
          <UserCircleIcon fontSize="small" />
        </Avatar>
        <Box
          sx={{
            ml: 1
          }}
        >
          <Typography variant="body1">
            {/* {user.email} */}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body2"
          >
            {/* {user.name} */}
          </Typography>
        </Box>
      </Box>
      <Divider />
      <Box>
        {/* <MenuItem component="a">
          <ListItemIcon>
            <UserCircleIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary={(
              <Typography variant="body1">
                Profile
              </Typography>
            )}
          />
        </MenuItem> */}
        {/* <MenuItem component="a">
          <ListItemIcon>
            <CogIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary={(
              <Typography variant="body1">
                Settings
              </Typography>
            )}
          />
        </MenuItem>
        <MenuItem component="a">
          <ListItemIcon>
            <SwitchHorizontalOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary={(
              <Typography variant="body1">
                {t('Change organization')}
              </Typography>
            )}
          />
        </MenuItem> */}
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary={(
              <Typography variant="body1">
                Logout
              </Typography>
            )}
          />
        </MenuItem>
      </Box>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool
};
