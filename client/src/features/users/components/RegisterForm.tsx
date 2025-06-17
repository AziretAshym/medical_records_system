import React, { useState } from 'react';
import {
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  MenuItem,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/app/hooks.ts';
import { register } from '@/app/thunks/usersThunks.ts';
import { useNavigate } from 'react-router-dom';
import { selectRegisterError } from '@/app/slices/usersSlice.ts';
import FileInput from '@/components/FileInput/FileInput.tsx';
import { UserPlus } from 'lucide-react';

const roles = [
  { value: 'admin', label: 'Админ' },
  { value: 'doctor', label: 'Врач' },
  { value: 'nurse', label: 'Медсестра' },
];

const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const registerError = useAppSelector(selectRegisterError);

  const [form, setForm] = useState({
    username: '',
    password: '',
    name: '',
    role: '',
    specialization: '',
    avatar: undefined as File | undefined,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, avatar: e.target.files?.[0] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await dispatch(register(form)).unwrap();
      navigate('/');
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const getFieldError = (field: string) => {
    try {
      return registerError?.errors[field].message;
    } catch {
      return undefined;
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 3, maxWidth: 600, mx: 'auto' }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight="bold" color="primary">
          Регистрация нового пользователя
        </Typography>
      </Box>

      {registerError?.message && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {registerError.message}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Имя пользователя"
            name="username"
            value={form.username}
            onChange={handleChange}
            size="small"
            fullWidth
            error={!!getFieldError('username')}
            helperText={getFieldError('username')}
          />

          <TextField
            label="Пароль"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            size="small"
            fullWidth
            error={!!getFieldError('password')}
            helperText={getFieldError('password')}
          />

          <TextField
            label="Отображаемое имя"
            name="name"
            value={form.name}
            onChange={handleChange}
            size="small"
            fullWidth
            error={!!getFieldError('name')}
            helperText={getFieldError('name')}
          />

          <TextField
            label="Роль"
            name="role"
            select
            value={form.role}
            onChange={handleChange}
            size="small"
            fullWidth
            error={!!getFieldError('role')}
            helperText={getFieldError('role') || 'Выберите роль пользователя'}
          >
            {roles.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          {form.role === 'doctor' && (
            <TextField
              label="Специализация"
              name="specialization"
              value={form.specialization}
              onChange={handleChange}
              size="small"
              fullWidth
              error={!!getFieldError('specialization')}
              helperText={getFieldError('specialization')}
            />
          )}

          <Box>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Аватар
            </Typography>
            <FileInput name="avatar" label="Загрузить" onGetFile={handleFileChange} />
          </Box>
        </Box>

        <Box display="flex" justifyContent="flex-end" gap={2} mt={4}>
          <Button
            type="submit"
            variant="contained"
            startIcon={loading ? <CircularProgress size={16} /> : <UserPlus />}
            disabled={loading}
          >
            {loading ? 'Регистрация...' : 'Зарегистрироваться'}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default RegisterForm;
