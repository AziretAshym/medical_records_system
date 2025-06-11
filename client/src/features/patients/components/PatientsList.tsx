import {
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TableContainer,
} from '@mui/material';
import { Patient } from '@/types';
import PaginationControls from '@/components/PaginationControls/PaginationControls.tsx';
import ActionsMenu from '@/components/ActionsMenu/ActionsMenu.tsx';
import GenderChip from '@/components/GenderChip/GenderChip.tsx';

interface PatientsDataListProps {
  patients: Patient[];
  onSelect: (id: string) => void;
  onEdit: (id: string) => void;
  count: number;
  page: number;
  limit: number;
  onPageChange: (page: number) => void;
}

const PatientsDataList = ({
  patients,
  onSelect,
  onEdit,
  count,
  page,
  limit,
  onPageChange,
}: PatientsDataListProps) => {
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

  return (
    <Paper elevation={2} sx={{ borderRadius: 3, overflow: 'hidden', }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f0f4f8' }}>
              <TableCell><strong>Фамилия</strong></TableCell>
              <TableCell><strong>Имя</strong></TableCell>
              <TableCell><strong>Дата рождения</strong></TableCell>
              <TableCell><strong>Пол</strong></TableCell>
              <TableCell><strong>Телефон</strong></TableCell>
              <TableCell><strong>Действия</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.length > 0 ? (
              patients.map((patient) => (
                <TableRow key={patient._id} hover>
                  <TableCell size='small'>{patient.lastName}</TableCell>
                  <TableCell size='small'>{patient.firstName}</TableCell>
                  <TableCell size='small'>{formatDate(patient.dateOfBirth)}</TableCell>
                  <TableCell size='small'>
                    <GenderChip gender={patient.gender} />
                  </TableCell>
                  <TableCell size='small' sx={{ fontFamily: 'monospace' }}>{patient.phone}</TableCell>
                  <TableCell size='small'>
                    <ActionsMenu
                      onSelect={() => onSelect(patient._id)}
                      onEdit={() => onEdit(patient._id)}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography color="text.secondary" py={2}>
                    Пациенты не найдены
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {Math.ceil(count / limit) > 1 && (
        <PaginationControls
          count={count}
          page={page}
          limit={limit}
          onPageChange={onPageChange}
        />
      )}
    </Paper>
  );
};

export default PatientsDataList;
