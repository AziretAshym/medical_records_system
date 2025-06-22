import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchMedicalRecordById } from '@/app/thunks/medicalRecordsThunks';
import MedicalRecordDetail from '@/features/medicalRecords/components/MedicalRecordDetail';
import { Box, Button, CircularProgress } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  clearSelectedRecord,
  selectMedicalRecordsError,
  selectMedicalRecordsLoading,
  selectSelectedMedicalRecord
} from '@/app/slices/medicalRecordsSlice.ts';

const MedicalRecordDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const selectedMedicalRecord = useAppSelector(selectSelectedMedicalRecord)
  const loading = useAppSelector(selectMedicalRecordsLoading);
  const error = useAppSelector(selectMedicalRecordsError)


  useEffect(() => {
    if (id) {
      dispatch(fetchMedicalRecordById(id));
    }
    return () => {
      dispatch(clearSelectedRecord());
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

      {loading && <CircularProgress />}
      {error && (
        <Box mt={2} p={2} bgcolor="#fdecea" color="error.main" borderRadius={1}>
          {error}
        </Box>
      )}

      {selectedMedicalRecord && !loading && (
        <MedicalRecordDetail medicalRecord={selectedMedicalRecord} />
      )}
    </Box>
  );
};

export default MedicalRecordDetailPage;
