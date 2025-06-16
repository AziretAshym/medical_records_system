import React from 'react';
import {
  Paper, Table, TableHead, TableBody, TableRow, TableCell,
  TableContainer, Typography,
} from '@mui/material';
import { MedicalRecord } from '@/types';
import ActionsMenu from '@/components/ActionsMenu/ActionsMenu';
import PaginationControls from '@/components/PaginationControls/PaginationControls';

interface Props {
  records: MedicalRecord[];
  page: number;
  count: number;
  limit: number;
  onPageChange: (page: number) => void;
}

const MedicalRecordsDataList: React.FC<Props> = ({ records, page, count, limit, onPageChange }) => {
  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });

  return (
    <Paper elevation={2} sx={{ borderRadius: 3, overflow: 'hidden' }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f0f4f8' }}>
              <TableCell><strong>Номер</strong></TableCell>
              <TableCell><strong>Пациент</strong></TableCell>
              <TableCell><strong>Врач</strong></TableCell>
              <TableCell><strong>Дата визита</strong></TableCell>
              <TableCell><strong>Диагноз</strong></TableCell>
              <TableCell><strong>Действия</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.length > 0 ? (
              records.map((r) => (
                <TableRow key={r._id} hover>
                  <TableCell>{r.recordNumber}</TableCell>
                  <TableCell>{typeof r.patient === 'string' ? r.patient : `${r.patient.lastName} ${r.patient.firstName}`}</TableCell>
                  <TableCell>{typeof r.doctor === 'string' ? r.doctor : r.doctor.displayName}</TableCell>
                  <TableCell>{formatDate(r.visitDate)}</TableCell>
                  <TableCell>{r.diagnosis}</TableCell>
                  <TableCell>
                    <ActionsMenu
                      onSelect={() => console.log('View', r._id)}
                      onEdit={() => console.log('Edit', r._id)}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography color="text.secondary" py={2}>
                    Записи не найдены
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {Math.ceil(count / limit) > 1 && (
        <PaginationControls count={count} page={page} limit={limit} onPageChange={onPageChange} />
      )}
    </Paper>
  );
};

export default MedicalRecordsDataList;
