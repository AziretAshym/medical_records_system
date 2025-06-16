import React from 'react';
import {
  Menu,
  MenuItem,
  IconButton,
  Avatar,
  ListItemIcon,
} from '@mui/material';
import { Logout, } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/app/hooks';
import { logout } from '@/app/thunks/usersThunks';
import { unsetUser } from '@/app/slices/usersSlice';
import { toast } from 'react-toastify';
import { User } from '@/types';
import { apiUrl } from '@/globalConstants.ts';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleMenuClose();
    await dispatch(logout());
    dispatch(unsetUser());
    toast.success('Вы вышли из системы');
    navigate('/login');
  };

  const userAvatar = (() => {
    if (typeof user.avatar === "string") {
      const path = user.avatar.startsWith("images/") ? user.avatar : null;
      return path ? `${apiUrl.replace(/\/$/, '')}/${path}` : user.avatar;
    }
    return undefined;
  })();

  return (
    <>
      <IconButton onClick={handleMenuOpen}>
        <Avatar alt={user.displayName} src={userAvatar} />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
        <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
          <ListItemIcon><Logout fontSize="small" sx={{ color: 'error.main' }} /></ListItemIcon>
          Выйти
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
