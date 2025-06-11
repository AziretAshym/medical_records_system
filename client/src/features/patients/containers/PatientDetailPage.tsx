import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchPatientById } from '@/app/thunks/patientsThunks';
import PatientDetail from '@/features/patients/components/PatientDetail';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import { clearSelectedPatient } from '@/app/slices/patientsSlice.ts';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const PatientDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { selectedPatient, loading, error } = useAppSelector(state => state.patients);

  useEffect(() => {
    if (id) {
      dispatch(fetchPatientById(id));
    }
    return () => {
      dispatch(clearSelectedPatient());
    };
  }, [dispatch, id]);

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', p: 3 }}>
      <Button
        onClick={() => navigate(-1)}
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 3 }}
      >
        Назад
      </Button>

      <Typography variant="h4" color="primary" gutterBottom>
        Карта пациента
      </Typography>

      {loading && <CircularProgress />}
      {error && (
        <Box mt={2} p={2} bgcolor="#fdecea" color="error.main" borderRadius={1}>
          {error}
        </Box>
      )}

      {selectedPatient && !loading && <PatientDetail patient={selectedPatient} />}
    </Box>
  );
};

export default PatientDetailPage;
