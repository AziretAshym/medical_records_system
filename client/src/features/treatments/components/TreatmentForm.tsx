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
import { Save, Close, Healing } from '@mui/icons-material';
import { createTreatment, updateTreatment, fetchTreatmentById } from '@/app/thunks/treatmentsThunks';
import { TreatmentFormData } from '@/types';
import {
  selectSelectedTreatment,
  selectTreatmentsError,
  selectTreatmentsLoading
} from '@/app/slices/treatmentsSlice.ts';

interface TreatmentFormProps {
  treatmentId: string | null;
  onClose: () => void;
  patientId: string;
}

const emptyForm: TreatmentFormData = {
  name: '',
  description: '',
  type: 'медикамент',
  dosage: '',
  frequency: '',
  duration: '',
  startDate: new Date().toISOString().slice(0, 10),
  endDate: '',
  status: 'запланировано',
  patient: '',
  assignedBy: '',
  updatedBy: '',
  medicalRecord: '',
};

const TreatmentForm: React.FC<TreatmentFormProps> = ({ treatmentId, onClose, patientId }) => {
  const dispatch = useAppDispatch();
  const selectedTreatment = useAppSelector(selectSelectedTreatment);
  const loading = useAppSelector(selectTreatmentsLoading);
  const error = useAppSelector(selectTreatmentsError);


  const [formData, setFormData] = useState<TreatmentFormData>({
    ...emptyForm,
    patient: patientId,
  });

  useEffect(() => {
    if (treatmentId) dispatch(fetchTreatmentById(treatmentId));
  }, [dispatch, treatmentId]);

  useEffect(() => {
    if (treatmentId && selectedTreatment) {
      setFormData({
        name: selectedTreatment.name,
        description: selectedTreatment.description || '',
        type: selectedTreatment.type,
        dosage: selectedTreatment.dosage || '',
        frequency: selectedTreatment.frequency || '',
        duration: selectedTreatment.duration || '',
        startDate: selectedTreatment.startDate.slice(0, 10),
        endDate: selectedTreatment.endDate?.slice(0, 10) || '',
        status: selectedTreatment.status,
        patient: typeof selectedTreatment.patient === 'string' ? selectedTreatment.patient : selectedTreatment.patient._id,
        assignedBy: typeof selectedTreatment.assignedBy === 'string' ? selectedTreatment.assignedBy : selectedTreatment.assignedBy._id,
        updatedBy: typeof selectedTreatment.updatedBy === 'string' ? selectedTreatment.updatedBy : selectedTreatment.updatedBy._id,
        medicalRecord: typeof selectedTreatment.medicalRecord === 'string' ? selectedTreatment.medicalRecord : selectedTreatment.medicalRecord._id,
      });
    }
  }, [selectedTreatment, treatmentId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (treatmentId) {
      await dispatch(updateTreatment({ id: treatmentId, data: formData }));
    } else {
      await dispatch(createTreatment(formData));
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
        <Healing sx={{ mr: 2 }} />
        <Typography variant="h5" fontWeight="bold">
          {treatmentId ? 'Редактировать назначение' : 'Новое назначение'}
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
            label="Название"
            name="name"
            value={formData.name}
            onChange={handleChange}
            size="small"
            fullWidth
            required
          />

          <TextField
            label="Описание"
            name="description"
            value={formData.description}
            onChange={handleChange}
            size="small"
            fullWidth
            multiline
            rows={2}
          />

          <TextField
            select
            label="Тип"
            name="type"
            value={formData.type}
            onChange={handleChange}
            size="small"
            fullWidth
          >
            <MenuItem value="medication">Медикамент</MenuItem>
            <MenuItem value="procedure">Процедура</MenuItem>
            <MenuItem value="surgery">Операция</MenuItem>
            <MenuItem value="recommendation">Рекомендация</MenuItem>
          </TextField>

          <TextField
            label="Дозировка"
            name="dosage"
            value={formData.dosage}
            onChange={handleChange}
            size="small"
            fullWidth
          />

          <TextField
            label="Частота"
            name="frequency"
            value={formData.frequency}
            onChange={handleChange}
            size="small"
            fullWidth
          />

          <TextField
            label="Длительность"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            size="small"
            fullWidth
          />

          <TextField
            label="Дата начала"
            name="startDate"
            type="date"
            value={formData.startDate}
            onChange={handleChange}
            size="small"
            fullWidth
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Дата окончания"
            name="endDate"
            type="date"
            value={formData.endDate}
            onChange={handleChange}
            size="small"
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            select
            label="Статус"
            name="status"
            value={formData.status}
            onChange={handleChange}
            size="small"
            fullWidth
          >
            <MenuItem value="scheduled">Запланировано</MenuItem>
            <MenuItem value="in-progress">В процессе</MenuItem>
            <MenuItem value="completed">Завершено</MenuItem>
            <MenuItem value="canceled">Отменено</MenuItem>
          </TextField>
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

export default TreatmentForm;