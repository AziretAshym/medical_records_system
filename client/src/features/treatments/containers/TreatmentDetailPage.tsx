import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchTreatmentById } from '@/app/thunks/treatmentsThunks';
import {
  clearSelectedTreatment,
  selectSelectedTreatment,
  selectTreatmentsLoading,
  selectTreatmentsError,
} from '@/app/slices/treatmentsSlice';
import TreatmentDetail from '@/features/treatments/components/TreatmentDetail';

const TreatmentDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const selectedTreatment = useAppSelector(selectSelectedTreatment);
  const loading = useAppSelector(selectTreatmentsLoading);
  const error = useAppSelector(selectTreatmentsError);

  useEffect(() => {
    if (id) {
      dispatch(fetchTreatmentById(id));
    }
    return () => {
      dispatch(clearSelectedTreatment());
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
        Детальная информация о назначении
      </Typography>

      {loading && <CircularProgress />}
      {error && (
        <Box mt={2} p={2} bgcolor="#fdecea" color="error.main" borderRadius={1}>
          {error}
        </Box>
      )}

      {selectedTreatment && !loading && (
        <TreatmentDetail treatment={selectedTreatment} />
      )}
    </Box>
  );
};

export default TreatmentDetailPage;
