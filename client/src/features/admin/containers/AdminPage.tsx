import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Users } from 'lucide-react';


import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchUsers } from '@/app/thunks/usersThunks';
import UsersList from '@/features/admin/components/UsersList.tsx';
import RegisterForm from '@/features/users/components/RegisterForm.tsx';
import { selectAllUsers } from '@/app/slices/usersSlice.ts';

const AdminPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectAllUsers);
  const loading = useAppSelector((state) => state.users.loading);
  const error = useAppSelector((state) => state.users.error);

  const [filter, setFilter] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredUsers = users.filter((user) => {
    const displayName = user.name || '';
    const username = user.username || '';
    return (
      displayName.toLowerCase().includes(filter.toLowerCase()) ||
      username.toLowerCase().includes(filter.toLowerCase())
    );
  });


  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Users />
          <Typography variant="h4" fontWeight="bold" color="#023e5e">
            Пользователи
          </Typography>
        </Box>
        <Button
          variant="contained"
          onClick={() => setIsFormOpen(true)}
          sx={{
            background: 'linear-gradient(90deg, rgba(173, 216, 230, 0.9), rgba(135, 206, 250, 0.9))',
            color: '#023e5e',
            fontWeight: 'bold',
          }}
        >
          + Добавить пользователя
        </Button>
      </Stack>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
        <TextField
          size="small"
          label="Поиск"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <IconButton color="primary" onClick={() => dispatch(fetchUsers())}>
          <SearchIcon />
        </IconButton>
      </Stack>

      {loading && <Box mt={2} textAlign="center"><CircularProgress /></Box>}
      {error && <Box mt={2} color="error.main">{error}</Box>}

      <Box mt={3}>
        <UsersList users={filteredUsers} />
      </Box>

      <Dialog open={isFormOpen} onClose={() => setIsFormOpen(false)} fullWidth maxWidth="sm">
        <DialogContent>
          <RegisterForm />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdminPage;
