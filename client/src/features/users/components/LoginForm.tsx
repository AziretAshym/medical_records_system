import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks.ts';
import { login } from '@/app/thunks/usersThunks.ts';
import { useNavigate } from 'react-router-dom';
import { selectLoginError } from '@/app/slices/usersSlice.ts';
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  CircularProgress
} from '@mui/material';
import {
  Lock as LockIcon,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loginError = useAppSelector(selectLoginError);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await dispatch(login(form)).unwrap();
      navigate('/');
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
      {loginError && (
        <Box
          sx={{
            mb: 3,
            p: 2,
            bgcolor: 'error.light',
            color: 'error.contrastText',
            borderRadius: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          <Typography variant="body2">
            {loginError.error}
          </Typography>
        </Box>
      )}

      <TextField
        margin="normal"
        fullWidth
        id="username"
        label="Имя пользователя"
        name="username"
        value={form.username}
        onChange={handleChange}
        autoComplete="username"
        autoFocus
      />

      <TextField
        margin="normal"
        fullWidth
        name="password"
        label="Пароль"
        type={showPassword ? 'text' : 'password'}
        id="password"
        value={form.password}
        onChange={handleChange}
        autoComplete="current-password"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2, py: 1.5 }}
        disabled={loading}
        startIcon={loading ? <CircularProgress size={20} /> : <LockIcon />}
      >
        {loading ? 'Вход...' : 'Войти'}
      </Button>
    </Box>
  );
};

export default LoginForm;
