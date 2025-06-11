import React, { useEffect, useState } from 'react';
import { createPatient, updatePatient, fetchPatientById } from '@/app/thunks/patientsThunks';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import type { PatientFormData } from '@/types';
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Alert,
  CircularProgress,
  Chip,
  Paper,
  Divider,
  IconButton
} from '@mui/material';
import {
  Person as PersonIcon,
  Save as SaveIcon,
  Close as CloseIcon,
  Add as AddIcon,
} from '@mui/icons-material';

interface PatientFormProps {
  patientId: string | null;
  onClose: () => void;
}

const emptyPatient: PatientFormData = {
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  gender: 'male',
  address: '',
  phone: '',
  email: '',
  bloodType: '',
  allergies: [],
  chronicDiseases: [],
};

const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const PatientForm: React.FC<PatientFormProps> = ({ patientId, onClose }) => {
  const dispatch = useAppDispatch();
  const { selectedPatient, loading, error } = useAppSelector(
    (state) => state.patients
  );

  const [formData, setFormData] = useState<PatientFormData>({ ...emptyPatient });
  const [newAllergy, setNewAllergy] = useState('');
  const [newDisease, setNewDisease] = useState('');

  useEffect(() => {
    if (patientId) {
      dispatch(fetchPatientById(patientId));
    }
  }, [dispatch, patientId]);

  useEffect(() => {
    if (selectedPatient && patientId) {
      setFormData({
        firstName: selectedPatient.firstName,
        lastName: selectedPatient.lastName,
        dateOfBirth: selectedPatient.dateOfBirth.slice(0, 10),
        gender: selectedPatient.gender,
        address: selectedPatient.address,
        phone: selectedPatient.phone,
        email: selectedPatient.email || '',
        bloodType: selectedPatient.bloodType || '',
        allergies: selectedPatient.allergies,
        chronicDiseases: selectedPatient.chronicDiseases,
      });
    } else {
      setFormData({ ...emptyPatient });
    }
  }, [selectedPatient, patientId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleSelectChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const addAllergy = () => {
    if (newAllergy.trim() && !formData.allergies.includes(newAllergy.trim())) {
      setFormData(f => ({
        ...f,
        allergies: [...f.allergies, newAllergy.trim()]
      }));
      setNewAllergy('');
    }
  };

  const removeAllergy = (allergyToRemove: string) => {
    setFormData(f => ({
      ...f,
      allergies: f.allergies.filter(allergy => allergy !== allergyToRemove)
    }));
  };

  const addDisease = () => {
    if (newDisease.trim() && !formData.chronicDiseases.includes(newDisease.trim())) {
      setFormData(f => ({
        ...f,
        chronicDiseases: [...f.chronicDiseases, newDisease.trim()]
      }));
      setNewDisease('');
    }
  };

  const removeDisease = (diseaseToRemove: string) => {
    setFormData(f => ({
      ...f,
      chronicDiseases: f.chronicDiseases.filter(disease => disease !== diseaseToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (patientId) {
      await dispatch(
        updatePatient({ id: patientId, patientData: formData })
      );
    } else {
      await dispatch(createPatient(formData));
    }

    onClose();
  };

  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 3, maxWidth: '900px', mx: 'auto' }}>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        mb: 3,
        p: 2,
        bgcolor: 'primary.main',
        color: 'white',
        borderRadius: 2,
        position: 'relative'
      }}>
        <PersonIcon sx={{ mr: 2, fontSize: 30 }} />
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          {patientId ? 'Редактирование пациента' : 'Новый пациент'}
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            color: 'white'
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Box sx={{ width: '70%', mx: 'auto' }}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            mb: 3
          }}>
            <Box>
              <Typography variant="h6" color="primary" sx={{ fontWeight: 'medium', mb: 2 }}>
                Основная информация
              </Typography>
              <Divider sx={{ mb: 2 }} />
            </Box>

            <Box>
              <TextField
                fullWidth
                label="Фамилия"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                size="small"
              />
            </Box>

            <Box>
              <TextField
                fullWidth
                label="Имя"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                size="small"
              />
            </Box>

            <Box>
              <TextField
                fullWidth
                label="Дата рождения"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
                size="small"
              />
            </Box>

            <Box>
              <FormControl fullWidth size="small">
                <InputLabel>Пол</InputLabel>
                <Select
                  name="gender"
                  value={formData.gender}
                  onChange={handleSelectChange}
                  label="Пол"
                >
                  <MenuItem value="male">Мужской</MenuItem>
                  <MenuItem value="female">Женский</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>

          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            mb: 3
          }}>
            <Box>
              <Typography variant="h6" color="primary" sx={{ fontWeight: 'medium', mb: 2 }}>
                Контактная информация
              </Typography>
              <Divider sx={{ mb: 2 }} />
            </Box>

            <Box>
              <TextField
                fullWidth
                label="Адрес"
                name="address"
                value={formData.address}
                onChange={handleChange}
                size="small"
              />
            </Box>

            <Box>
              <TextField
                fullWidth
                label="Телефон"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                size="small"
              />
            </Box>

            <Box>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                size="small"
              />
            </Box>
          </Box>

          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            mb: 3
          }}>
            <Box>
              <Typography variant="h6" color="primary" sx={{ fontWeight: 'medium', mb: 2 }}>
                Медицинская информация
              </Typography>
              <Divider sx={{ mb: 2 }} />
            </Box>

            <Box>
              <FormControl fullWidth size="small">
                <InputLabel>Группа крови</InputLabel>
                <Select
                  name="bloodType"
                  value={formData.bloodType}
                  onChange={handleSelectChange}
                  label="Группа крови"
                >
                  <MenuItem value="">Не указана</MenuItem>
                  {bloodTypes.map(type => (
                    <MenuItem key={type} value={type}>{type}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 'medium', mb: 1 }}>
                Аллергии
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <TextField
                  size="small"
                  placeholder="Добавить аллергию"
                  value={newAllergy}
                  onChange={(e) => setNewAllergy(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAllergy())}
                  sx={{ flexGrow: 1 }}
                />
                <Button
                  variant="outlined"
                  onClick={addAllergy}
                  startIcon={<AddIcon />}
                  size="small"
                >
                  Добавить
                </Button>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {formData.allergies.map((allergy, index) => (
                  <Chip
                    key={index}
                    label={allergy}
                    onDelete={() => removeAllergy(allergy)}
                    color="error"
                    variant="outlined"
                    size="small"
                  />
                ))}
              </Box>
            </Box>

            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 'medium', mb: 1 }}>
                Хронические заболевания
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <TextField
                  size="small"
                  placeholder="Добавить заболевание"
                  value={newDisease}
                  onChange={(e) => setNewDisease(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addDisease())}
                  sx={{ flexGrow: 1 }}
                />
                <Button
                  variant="outlined"
                  onClick={addDisease}
                  startIcon={<AddIcon />}
                  size="small"
                >
                  Добавить
                </Button>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {formData.chronicDiseases.map((disease, index) => (
                  <Chip
                    key={index}
                    label={disease}
                    onDelete={() => removeDisease(disease)}
                    color="warning"
                    variant="outlined"
                    size="small"
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </Box>

        <Box sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 2,
          mt: 4,
          pt: 3,
          borderTop: '1px solid',
          borderColor: 'divider'
        }}>
          <Button
            variant="outlined"
            onClick={onClose}
            disabled={loading}
          >
            Отмена
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={16} /> : <SaveIcon />}
          >
            {loading ? 'Сохранение...' : 'Сохранить'}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default PatientForm;