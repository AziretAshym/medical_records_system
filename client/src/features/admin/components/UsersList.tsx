import React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { User } from '@/types';
import ActionsMenu from '@/components/ActionsMenu/ActionsMenu.tsx';

interface Props {
  users: User[];
}

const UsersList: React.FC<Props> = ({ users }) => {
  return (
    <Paper elevation={2} sx={{ borderRadius: 3, overflow: 'hidden' }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f0f4f8' }}>
              <TableCell><strong>Имя</strong></TableCell>
              <TableCell><strong>Логин</strong></TableCell>
              <TableCell><strong>Роль</strong></TableCell>
              <TableCell><strong>Специализация</strong></TableCell>
              <TableCell><strong>Действия</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length > 0 ? (
              users.map((user) => (
                <TableRow key={user._id} hover>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.specialization || '-'}</TableCell>
                  <TableCell>
                    <ActionsMenu
                      onSelect={() => console.log('View', user._id)}
                      onEdit={() => console.log('Edit', user._id)}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <Typography color="text.secondary" py={2}>
                    Пользователи не найдены
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default UsersList;
