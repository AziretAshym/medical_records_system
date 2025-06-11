import LoginForm from '@/features/users/components/LoginForm.tsx';
import {
  Box,
  Typography,
  Paper,
} from '@mui/material';
import { Favorite as FavoriteIcon } from '@mui/icons-material';

const images = [
  '/login/med-1.jpg',
  '/login/med-2.jpg',
  '/login/med-3.jpg',
];

const LoginPage = () => {
  const randomImage = images[Math.floor(Math.random() * images.length)];

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url(${randomImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(to bottom right, rgba(30, 58, 138, 0.4), rgba(8, 145, 178, 0.4))',
        }
      }}
    >
      <Paper
        elevation={10}
        sx={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: 450,
          p: 4,
          mx: 2,
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: 3
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 4
          }}
        >
          <Box
            sx={{
              width: 64,
              height: 64,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #0891b2, #1e40af)',
              color: 'white',
              mb: 2,
              boxShadow: 3
            }}
          >
            <FavoriteIcon fontSize="large" />
          </Box>
          <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold', color: 'white', mb: 1 }}>
            MedCare
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            Система управления пациентами
          </Typography>
        </Box>

        <LoginForm />
      </Paper>
    </Box>
  );
};

export default LoginPage;
