import React, { useEffect, useState } from 'react';
import {
  TextField,
  MenuItem,
  Select,
  SelectChangeEvent,
  InputLabel,
  FormControl,
  Button,
  Box,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  fetchMedicalRecordById,
  createMedicalRecord,
  updateMedicalRecord,
} from '@/app/thunks/medicalRecordsThunks';
import { fetchPatients } from '@/app/thunks/patientsThunks.ts';
import { fetchDoctors } from '@/app/thunks/usersThunks.ts';
import { selectAllDoctors } from '@/app/slices/usersSlice.ts';
import { selectPatients } from '@/app/slices/patientsSlice.ts';
import { selectSelectedMedicalRecord } from '@/app/slices/medicalRecordsSlice.ts';

interface MedicalRecordFormData {
  patient: string;
  doctor: string;
  diagnosis: string;
  symptoms: string;
  notes: string;
  visitDate: string;
}

interface Props {
  recordId?: string;
  onClose: () => void;
}

const emptyRecord: MedicalRecordFormData = {
  patient: '',
  doctor: '',
  diagnosis: '',
  symptoms: '',
  notes: '',
  visitDate: new Date().toISOString().slice(0, 10),
};

const MedicalRecordForm: React.FC<Props> = ({ recordId, onClose }) => {
  const dispatch = useAppDispatch();

  const allPatients = useAppSelector(selectPatients);
  const allDoctors = useAppSelector(selectAllDoctors);
  const selectedRecord = useAppSelector(selectSelectedMedicalRecord);

  const [formData, setFormData] = useState<MedicalRecordFormData>(emptyRecord);

  useEffect(() => {
    dispatch(fetchPatients());
    dispatch(fetchDoctors());

    if (recordId) {
      dispatch(fetchMedicalRecordById(recordId));
    }
  }, [dispatch, recordId]);

  useEffect(() => {
    if (selectedRecord && recordId) {
      setFormData({
        patient:
          typeof selectedRecord.patient === 'string'
            ? selectedRecord.patient
            : selectedRecord.patient._id,
        doctor:
          typeof selectedRecord.doctor === 'string'
            ? selectedRecord.doctor
            : selectedRecord.doctor._id,
        diagnosis: selectedRecord.diagnosis || '',
        symptoms: Array.isArray(selectedRecord.symptoms)
          ? selectedRecord.symptoms.join(', ')
          : '',
        notes: selectedRecord.notes || '',
        visitDate: selectedRecord.visitDate
          ? selectedRecord.visitDate.slice(0, 10)
          : new Date().toISOString().slice(0, 10),
      });
    } else {
      setFormData(emptyRecord);
    }
  }, [selectedRecord, recordId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
      symptoms: formData.symptoms
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      visitDate: new Date(formData.visitDate).toISOString(),
    };

    try {
      if (recordId) {
        await dispatch(updateMedicalRecord({ id: recordId, data: payload }));
      } else {
        await dispatch(createMedicalRecord(payload));
      }
      onClose();
    } catch (error) {
      console.error('Error saving medical record', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 400 }}>
      <FormControl fullWidth size="small">
        <InputLabel id="patient-label">Пациент</InputLabel>
        <Select
          labelId="patient-label"
          id="patient-select"
          name="patient"
          value={formData.patient}
          label="Пациент"
          onChange={handleSelectChange}
          required
        >
          {allPatients.map((p) => (
            <MenuItem key={p._id} value={p._id}>
              {p.lastName} {p.firstName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth size="small">
        <InputLabel id="doctor-label">Врач</InputLabel>
        <Select
          labelId="doctor-label"
          id="doctor-select"
          name="doctor"
          value={formData.doctor}
          label="Врач"
          onChange={handleSelectChange}
          required
        >
          {allDoctors.map((d) => (
            <MenuItem key={d._id} value={d._id}>
              {d.name} {d.specialization}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Диагноз"
        name="diagnosis"
        value={formData.diagnosis}
        onChange={handleChange}
        size="small"
        fullWidth
        required
      />

      <TextField
        label="Симптомы (через запятую)"
        name="symptoms"
        value={formData.symptoms}
        onChange={handleChange}
        size="small"
        fullWidth
      />

      <TextField
        label="Назначения / лечение"
        name="notes"
        multiline
        rows={3}
        value={formData.notes}
        onChange={handleChange}
        size="small"
        fullWidth
      />

      <TextField
        label="Дата визита"
        name="visitDate"
        type="date"
        value={formData.visitDate}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        size="small"
        fullWidth
        required
      />

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
        <Button variant="outlined" onClick={onClose}>
          Отмена
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Сохранить
        </Button>
      </Box>
    </Box>
  );
};

export default MedicalRecordForm;
