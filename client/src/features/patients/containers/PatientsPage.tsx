import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchPatients } from '@/app/thunks/patientsThunks';
import { clearSelectedPatient } from '@/app/slices/patientsSlice';
import PatientsDataList from '@/features/patients/components/PatientsList';
import PatientForm from '@/features/patients/components/PatientForm';
import SearchIcon from '@mui/icons-material/Search';
import {
  Typography,
  TextField,
  Button,
  Stack,
  Box,
  IconButton,
  CircularProgress, Dialog, DialogContent,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';

const PatientsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { patients, loading, error, count } = useAppSelector((state) => state.patients);

  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [filter, setFilter] = useState({ firstName: '', lastName: '' });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editPatientId, setEditPatientId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchPatients({ page, limit, ...filter }));
  }, [dispatch, page, limit, filter]);

  const onSelectPatient = (id: string) => {
    navigate(`/patients/${id}`);
  };

  const onAddNew = () => {
    setEditPatientId(null);
    dispatch(clearSelectedPatient());
    setIsFormOpen(true);
  };

  const onEditPatient = (id: string) => {
    setEditPatientId(id);
    setIsFormOpen(true);
  };

  const onCloseForm = () => {
    setIsFormOpen(false);
    setEditPatientId(null);
    dispatch(clearSelectedPatient());
    dispatch(fetchPatients({ page, limit, ...filter }));
  };

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Box sx={{display: 'flex', alignItems: 'center', gap: 1 }}>
          <User />
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              color: '#023e5e',
            }}
          >
            Пациенты
          </Typography>
        </Box>
        <Button
          variant="contained"
          onClick={onAddNew}
          sx={{
            background: 'linear-gradient(90deg, rgba(173, 216, 230, 0.9), rgba(135, 206, 250, 0.9))',
            color: '#023e5e',
            border: '1px solid rgba(135, 206, 250, 0.5)',
            fontWeight: 'bold',
            '&:hover': {
              background: 'linear-gradient(90deg, rgba(135, 206, 250, 0.9), rgba(173, 216, 230, 0.9))',
            }
          }}
        >
          + Добавить пациента
        </Button>
      </Stack>

      <Box px={0} py={2}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
          <TextField
            size="small"
            label="Поиск"
            value={filter.firstName}
            onChange={(e) => setFilter((f) => ({ ...f, firstName: e.target.value }))}
            variant="outlined"
          />
          <IconButton
            color="primary"
            onClick={() => dispatch(fetchPatients({ page: 1, limit, ...filter }))}
          >
            <SearchIcon />
          </IconButton>
        </Stack>

        {loading && (
          <Box mt={2} textAlign="center" color="primary.main">
            <CircularProgress />
          </Box>
        )}
        {error && (
          <Box mt={2} p={2} bgcolor="#fdecea" color="error.main" borderRadius={1}>
            {error}
          </Box>
        )}

        <Box mt={3}>
          <PatientsDataList
            patients={patients}
            onSelect={onSelectPatient}
            onEdit={onEditPatient}
            count={count}
            page={page}
            limit={limit}
            onPageChange={setPage}
          />
        </Box>
      </Box>

      <Dialog
        open={isFormOpen}
        onClose={onCloseForm}
        fullWidth
        maxWidth="md"
      >
        <DialogContent sx={{ borderRadius: 2 }}>
          <PatientForm patientId={editPatientId} onClose={onCloseForm} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PatientsPage;
