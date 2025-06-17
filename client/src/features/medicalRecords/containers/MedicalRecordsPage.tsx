import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchMedicalRecords } from '@/app/thunks/medicalRecordsThunks';
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
import { FileText } from 'lucide-react';
import MedicalRecordForm from '@/features/medicalRecords/components/MedicalRecordForm.tsx';
import MedicalRecordsList from '@/features/medicalRecords/components/MedicalRecordsList.tsx';

const MedicalRecordsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { records, count, loading, error } = useAppSelector((state) => state.medicalRecords);

  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [filter, setFilter] = useState({ diagnosis: '' });
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchMedicalRecords({ page, limit }));
  }, [dispatch, page, limit]);

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FileText />
          <Typography variant="h4" fontWeight="bold" color="#023e5e">
            Приемы
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
          + Добавить запись
        </Button>
      </Stack>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
        <TextField
          size="small"
          label="Поиск"
          value={filter.diagnosis}
          onChange={(e) => setFilter((f) => ({ ...f, diagnosis: e.target.value }))}
        />
        <IconButton
          color="primary"
          onClick={() => dispatch(fetchMedicalRecords({ page: 1, limit }))}
        >
          <SearchIcon />
        </IconButton>
      </Stack>

      {loading && <Box mt={2} textAlign="center"><CircularProgress /></Box>}
      {error && <Box mt={2} color="error.main">{error}</Box>}

      <Box mt={3}>
        <MedicalRecordsList
          records={records}
          count={count}
          page={page}
          limit={limit}
          onPageChange={setPage}
        />
      </Box>

      <Dialog open={isFormOpen} onClose={() => setIsFormOpen(false)} fullWidth maxWidth="md">
        <DialogContent>
          <MedicalRecordForm
            recordId={null}
            onClose={() => setIsFormOpen(false)}
            patientId=""
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MedicalRecordsPage;
