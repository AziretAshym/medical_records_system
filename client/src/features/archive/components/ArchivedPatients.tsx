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
import GenderChip from '@/components/GenderChip/GenderChip.tsx';
import ArchivedActionsMenu from '@/components/ArchivedActionsMenu/ArchivedActionsMenu.tsx';

const archivedPatients = [
  {
    _id: '1',
    firstName: 'Айбек',
    lastName: 'Сатыбалдиев',
    dateOfBirth: '1990-05-10',
    gender: 'male',
    phone: '+996701234567',
  },
  {
    _id: '2',
    firstName: 'Алина',
    lastName: 'Токтосунова',
    dateOfBirth: '1985-09-20',
    gender: 'female',
    phone: '+996709876543',
  },
  {
    _id: '3',
    firstName: 'Руслан',
    lastName: 'Ибраев',
    dateOfBirth: '1992-11-03',
    gender: 'male',
    phone: '+996700123456',
  },
  {
    _id: '4',
    firstName: 'Назгуль',
    lastName: 'Сариева',
    dateOfBirth: '1988-07-15',
    gender: 'female',
    phone: '+996553654321',
  },
  {
    _id: '5',
    firstName: 'Эрмек',
    lastName: 'Калиев',
    dateOfBirth: '1979-03-22',
    gender: 'male',
    phone: '+996557765432',
  },
  {
    _id: '6',
    firstName: 'Гуля',
    lastName: 'Асаналиева',
    dateOfBirth: '1995-12-30',
    gender: 'female',
    phone: '+996770001122',
  },
  {
    _id: '7',
    firstName: 'Данияр',
    lastName: 'Тургунбаев',
    dateOfBirth: '1983-06-18',
    gender: 'male',
    phone: '+996772998877',
  },
];

const ArchivedPatients = () => {
  const handleRestore = (id: string) => {
    console.log(`Разархивировать пациента: ${id}`);
  };

  const handleDelete = (id: string) => {
    console.log(`Удалить пациента: ${id}`);
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('ru-RU', {
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
              <TableCell><strong>Фамилия</strong></TableCell>
              <TableCell><strong>Имя</strong></TableCell>
              <TableCell><strong>Дата рождения</strong></TableCell>
              <TableCell><strong>Пол</strong></TableCell>
              <TableCell><strong>Телефон</strong></TableCell>
              <TableCell><strong>Действия</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {archivedPatients.length > 0 ? (
              archivedPatients.map((patient) => (
                <TableRow key={patient._id} hover>
                  <TableCell size='small'>{patient.lastName}</TableCell>
                  <TableCell size='small'>{patient.firstName}</TableCell>
                  <TableCell size='small'>{formatDate(patient.dateOfBirth)}</TableCell>
                  <TableCell size='small'>
                    <GenderChip gender={patient.gender} />
                  </TableCell>
                  <TableCell size='small' sx={{ fontFamily: 'monospace' }}>{patient.phone}</TableCell>
                  <TableCell size='small'>
                    <ArchivedActionsMenu
                      onRestore={() => handleRestore(patient._id)}
                      onDelete={() => handleDelete(patient._id)}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography color="text.secondary" py={2}>
                    Архивированных пациентов не найдено
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

export default ArchivedPatients;
