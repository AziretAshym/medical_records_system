import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { selectUser } from '@/app/slices/usersSlice';
import { useAppSelector } from '@/app/hooks';
import UserMenu from './UserMenu';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { HeartPulse } from 'lucide-react';
import SidebarContent from '@/components/Toolbar/SidebarContent.tsx';

const AppToolbar = () => {
  const user = useAppSelector(selectUser);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setIsDrawerOpen(open);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        background: 'linear-gradient(90deg, rgba(173, 216, 230, 0.9), rgba(135, 206, 250, 0.9))', // обновлённый голубоватый градиент
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(135, 206, 250, 0.5)',
        marginBottom: '150px',
        color: '#023e5e',
      }}
      elevation={0}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>

          <NavLink to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 3 }}>
            <HeartPulse className="h-7 w-7" strokeWidth={2.5} />
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 'bold',
                color: '#023e5e',
                '&:hover': { opacity: 0.8 }
              }}
            >
              MedCare
            </Typography>
          </NavLink>
        </Box>

        <Box>
          {user ? (
            <UserMenu user={user} />
          ) : null
          }
        </Box>
      </Toolbar>

      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: 280,
            backgroundColor: '#e0f7f4',
          }
        }}
      >
        <SidebarContent onLinkClick={() => setIsDrawerOpen(false)} />
      </Drawer>
    </AppBar>

  );
};

export default AppToolbar;