import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Paper,
  Divider,
  IconButton,
  Button,
  Alert,
  CircularProgress,
  MenuItem,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  createMedicalRecord,
  updateMedicalRecord,
  fetchMedicalRecordById,
} from '@/app/thunks/medicalRecordsThunks';
import { MedicalRecordFormData } from '@/types';
import { Assignment, Save, Close } from '@mui/icons-material';
import { fetchDoctors } from '@/app/thunks/usersThunks';
import { selectAllDoctors } from '@/app/slices/usersSlice.ts';
import { selectPatients } from '@/app/slices/patientsSlice.ts';

interface MedicalRecordFormProps {
  recordId: string | null;
  onClose: () => void;
  patientId: string;
}

const emptyForm: MedicalRecordFormData = {
  patient: '',
  doctor: '',
  visitDate: new Date().toISOString().slice(0, 10),
  symptoms: '',
  diagnosis: '',
  notes: '',
};

const MedicalRecordForm: React.FC<MedicalRecordFormProps> = ({
  recordId,
  onClose,
  patientId,
}) => {
  const dispatch = useAppDispatch();
  const { selectedRecord, loading, error } = useAppSelector((state) => state.medicalRecords);
  const doctors = useAppSelector(selectAllDoctors);
  const patients = useAppSelector(selectPatients);

  const [formData, setFormData] = useState<MedicalRecordFormData>({
    ...emptyForm,
    patient: patientId,
  });

  useEffect(() => {
    dispatch(fetchDoctors());
    if (recordId) dispatch(fetchMedicalRecordById(recordId));
  }, [dispatch, recordId]);

  useEffect(() => {
    if (recordId && selectedRecord) {
      setFormData({
        patient: typeof selectedRecord.patient === 'string'
          ? selectedRecord.patient
          : selectedRecord.patient._id,
        doctor: typeof selectedRecord.doctor === 'string'
          ? selectedRecord.doctor
          : selectedRecord.doctor._id,
        visitDate: selectedRecord.visitDate.slice(0, 10),
        symptoms: selectedRecord.symptoms.join(', '),
        diagnosis: selectedRecord.diagnosis,
        notes: selectedRecord.notes || '',
      });
    }
  }, [selectedRecord, recordId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
      symptoms: formData.symptoms.split(',').map((s) => s.trim()),
    };

    if (recordId) {
      await dispatch(updateMedicalRecord({ id: recordId, data: payload }));
    } else {
      await dispatch(createMedicalRecord(payload));
    }

    onClose();
  };

  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 3, maxWidth: 700, mx: 'auto' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 3,
          p: 2,
          bgcolor: 'primary.main',
          color: 'white',
          borderRadius: 2,
          position: 'relative',
        }}
      >
        <Assignment sx={{ mr: 2 }} />
        <Typography variant="h5" fontWeight="bold">
          {recordId ? 'Редактировать запись' : 'Новая медицинская запись'}
        </Typography>
        <IconButton onClick={onClose} sx={{ position: 'absolute', right: 8, color: 'white' }}>
          <Close />
        </IconButton>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            select
            label="Врач"
            name="doctor"
            value={formData.doctor}
            onChange={handleChange}
            size="small"
            fullWidth
          >
            {doctors.map((doc) => (
              <MenuItem key={doc._id} value={doc._id}>
                {doc.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Пациент"
            name="patient"
            value={formData.patient}
            onChange={handleChange}
            size="small"
            fullWidth
          >
            {patients.map((pat) => (
              <MenuItem key={pat._id} value={pat._id}>
                {pat.firstName} {pat.lastName}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Дата визита"
            name="visitDate"
            type="date"
            value={formData.visitDate}
            onChange={handleChange}
            size="small"
            fullWidth
            InputLabelProps={{ shrink: true }}
            required
          />

          <TextField
            label="Симптомы (через запятую)"
            name="symptoms"
            value={formData.symptoms}
            onChange={handleChange}
            size="small"
            fullWidth
            multiline
            rows={2}
          />

          <TextField
            label="Диагноз"
            name="diagnosis"
            value={formData.diagnosis}
            onChange={handleChange}
            size="small"
            fullWidth
          />

          <TextField
            label="Заметки"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            size="small"
            fullWidth
            multiline
            rows={2}
          />
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="outlined" onClick={onClose} disabled={loading}>
            Отмена
          </Button>
          <Button
            type="submit"
            variant="contained"
            startIcon={loading ? <CircularProgress size={16} /> : <Save />}
            disabled={loading}
          >
            {loading ? 'Сохранение...' : 'Сохранить'}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default MedicalRecordForm;
