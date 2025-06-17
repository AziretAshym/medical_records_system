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
import { ScrollText } from 'lucide-react';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchAllTreatments } from '@/app/thunks/treatmentsThunks';
import TreatmentsList from '@/features/treatments/components/TreatmentsList';
import TreatmentForm from '@/features/treatments/components/TreatmentForm';

const TreatmentsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items: treatments, loading, error } = useAppSelector((state) => state.treatments);

  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [filter, setFilter] = useState({ title: '' });
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchAllTreatments());
  }, [dispatch]);

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ScrollText />
          <Typography variant="h4" fontWeight="bold" color="#023e5e">
            Назначения
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
          + Добавить назначение
        </Button>
      </Stack>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
        <TextField
          size="small"
          label="Поиск по названию"
          value={filter.title}
          onChange={(e) => setFilter((f) => ({ ...f, title: e.target.value }))}
        />
        <IconButton color="primary" onClick={() => dispatch(fetchAllTreatments())}>
          <SearchIcon />
        </IconButton>
      </Stack>

      {loading && <Box mt={2} textAlign="center"><CircularProgress /></Box>}
      {error && <Box mt={2} color="error.main">{error}</Box>}

      <Box mt={3}>
        <TreatmentsList
          treatments={treatments.filter(t =>
            t.name.toLowerCase().includes(filter.title.toLowerCase())
          )}
          page={page}
          limit={limit}
          onPageChange={setPage}
        />
      </Box>

      <Dialog open={isFormOpen} onClose={() => setIsFormOpen(false)} fullWidth maxWidth="md">
        <DialogContent>
          <TreatmentForm
            treatmentId={null}
            onClose={() => setIsFormOpen(false)}
            patientId=""
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TreatmentsPage;
