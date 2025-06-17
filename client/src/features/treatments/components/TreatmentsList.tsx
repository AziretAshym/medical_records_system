import React from 'react';
import {
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Typography,
  Box,
  Link
} from '@mui/material';

import { Treatment } from '@/types';
import ActionsMenu from '@/components/ActionsMenu/ActionsMenu';
import PaginationControls from '@/components/PaginationControls/PaginationControls';
import { Link as RouterLink } from 'react-router-dom';

interface Props {
  treatments: Treatment[];
  page: number;
  limit: number;
  onPageChange: (page: number) => void;
}

const TreatmentsList: React.FC<Props> = ({ treatments, page, limit, onPageChange }) => {
  const paginated = treatments.slice((page - 1) * limit, page * limit);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

  return (
    <Paper elevation={2} sx={{ borderRadius: 3, overflow: 'hidden' }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f0f4f8' }}>
              <TableCell><strong>№ Назначения</strong></TableCell>
              <TableCell><strong>Название</strong></TableCell>
              <TableCell><strong>Пациент</strong></TableCell>
              <TableCell><strong>Дата начала</strong></TableCell>
              <TableCell><strong>Тип</strong></TableCell>
              <TableCell><strong>Статус</strong></TableCell>
              <TableCell><strong>Действия</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginated.length > 0 ? (
              paginated.map((t) => (
                <TableRow key={t._id} hover>
                  <TableCell>
                    <Link
                      component={RouterLink}
                      to={`/treatments/${t._id}`}
                      underline="none"
                    >
                      <Box
                        sx={{
                          display: 'inline-block',
                          fontSize: '0.875rem',
                          fontWeight: 'bold',
                          color: 'primary.main',
                          backgroundColor: 'primary.50',
                          border: '1px solid',
                          borderColor: 'primary.200',
                          px: 1.5,
                          py: 0.5,
                          borderRadius: 2,
                          boxShadow: 1,
                          transition: 'all 0.2s',
                          '&:hover': {
                            backgroundColor: 'primary.100',
                            color: 'primary.dark',
                          },
                        }}
                      >
                        {t.treatmentNumber}
                      </Box>
                    </Link>
                  </TableCell>
                  <TableCell>{t.name}</TableCell>
                  <TableCell>
                    {typeof t.patient === 'string'
                      ? t.patient
                      : `${t.patient.lastName} ${t.patient.firstName}`}
                  </TableCell>
                  <TableCell>{formatDate(t.startDate)}</TableCell>
                  <TableCell>{t.type}</TableCell>
                  <TableCell>{t.status}</TableCell>
                  <TableCell>
                    <ActionsMenu
                      onSelect={() => console.log('View', t._id)}
                      onEdit={() => console.log('Edit', t._id)}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  <Typography color="text.secondary" py={2}>
                    Назначения не найдены
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {Math.ceil(treatments.length / limit) > 1 && (
        <PaginationControls
          count={treatments.length}
          page={page}
          limit={limit}
          onPageChange={onPageChange}
        />
      )}
    </Paper>
  );
};

export default TreatmentsList;
