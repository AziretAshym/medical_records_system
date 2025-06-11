import React from 'react';
import { Patient } from '@/types';
import { Box, Typography, Divider, Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

interface PatientDetailProps {
  patient: Patient;
}

const PatientDetail: React.FC<PatientDetailProps> = ({ patient }) => {

  const InfoRow = ({ label, value }: { label: string; value: string | React.ReactNode }) => (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      py: 0.8,
      borderBottom: '1px solid',
      borderColor: 'divider',
      '&:last-child': { borderBottom: 'none' }
    }}>
      <Typography
        variant="body2"
        sx={{
          minWidth: '160px',
          fontWeight: 'medium',
          color: 'text.secondary',
          fontSize: '0.875rem'
        }}
      >
        {label}:
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 'regular', fontSize: '0.875rem' }}>
        {value || '-'}
      </Typography>
    </Box>
  );

  const SectionHeader = ({ title, icon }: { title: string; icon?: React.ReactNode }) => (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      mb: 2,
      mt: 3,
      '&:first-of-type': { mt: 0 }
    }}>
      {icon && (
        <Box sx={{ mr: 1, color: 'primary.main' }}>
          {icon}
        </Box>
      )}
      <Typography
        variant="h6"
        color="primary"
        sx={{
          fontWeight: 'semibold',
          borderBottom: '2px solid',
          borderColor: 'primary.main',
          pb: 0.3,
          fontSize: '1.1rem'
        }}
      >
        {title}
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ mt: 3, px: { xs: 2, md: 4 }, mb: 4, maxWidth: '900px', mx: 'auto' }}>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        mb: 3,
        p: 2.5,
        bgcolor: 'primary.main',
        color: 'white',
        borderRadius: 2
      }}>
        <Avatar
          sx={{
            width: 60,
            height: 60,
            mr: 2.5,
            bgcolor: 'white',
            color: 'primary.main'
          }}
        >
          <PersonIcon sx={{ fontSize: 30 }} />
        </Avatar>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 0.5 }}>
            {patient.lastName} {patient.firstName}
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9 }}>
            Карта пациента
          </Typography>
        </Box>
      </Box>

      <Box sx={{ bgcolor: 'background.paper', borderRadius: 2, p: 3, boxShadow: 1 }}>
        <SectionHeader title="Основная информация" />
        <Box sx={{ mb: 3 }}>
          <InfoRow label="Фамилия" value={patient.lastName} />
          <InfoRow label="Имя" value={patient.firstName} />
          <InfoRow
            label="Дата рождения"
            value={new Date(patient.dateOfBirth).toLocaleDateString('ru-RU')}
          />
          <InfoRow
            label="Пол"
            value={patient.gender === 'male' ? 'Мужской' : 'Женский'}
          />
        </Box>

        <Divider sx={{ my: 3 }} />

        <SectionHeader title="Контактные данные" />
        <Box sx={{ mb: 3 }}>
          <InfoRow label="Адрес" value={patient.address} />
          <InfoRow label="Телефон" value={patient.phone} />
          <InfoRow label="Email" value={patient.email} />
        </Box>

        <Divider sx={{ my: 3 }} />

        <SectionHeader title="Медицинская информация" />
        <Box sx={{ mb: 3 }}>
          <InfoRow label="Группа крови" value={patient.bloodType} />
          <InfoRow
            label="Аллергии"
            value={
              patient.allergies.length > 0 ? (
                <Box component="span">
                  {patient.allergies.map((allergy, index) => (
                    <Box
                      key={index}
                      component="span"
                      sx={{
                        display: 'inline-block',
                        bgcolor: 'error.light',
                        color: 'error.contrastText',
                        px: 0.8,
                        py: 0.3,
                        borderRadius: 0.8,
                        fontSize: '0.75rem',
                        mr: 0.8,
                        mb: 0.3
                      }}
                    >
                      {allergy}
                    </Box>
                  ))}
                </Box>
              ) : '-'
            }
          />
        </Box>

        <Divider sx={{ my: 3 }} />

        <SectionHeader title="Хронические заболевания" />
        <Box>
          <InfoRow
            label="Хронические заболевания"
            value={
              patient.chronicDiseases.length > 0 ? (
                <Box component="span">
                  {patient.chronicDiseases.map((disease, index) => (
                    <Box
                      key={index}
                      component="span"
                      sx={{
                        display: 'inline-block',
                        bgcolor: 'warning.light',
                        color: 'warning.contrastText',
                        px: 0.8,
                        py: 0.3,
                        borderRadius: 0.8,
                        fontSize: '0.75rem',
                        mr: 0.8,
                        mb: 0.3
                      }}
                    >
                      {disease}
                    </Box>
                  ))}
                </Box>
              ) : '-'
            }
          />
        </Box>

        <Divider sx={{ my: 3 }} />


        <SectionHeader title="История заболеваний" />
        <Box>
          <InfoRow
            label="История заболеваний"
            value={
              patient.chronicDiseases.length > 0 ? (
                <Box component="span">
                  {patient.chronicDiseases.map((disease, index) => (
                    <Box
                      key={index}
                      component="span"
                      sx={{
                        display: 'inline-block',
                        bgcolor: 'warning.light',
                        color: 'warning.contrastText',
                        px: 0.8,
                        py: 0.3,
                        borderRadius: 0.8,
                        fontSize: '0.75rem',
                        mr: 0.8,
                        mb: 0.3
                      }}
                    >
                      {disease}
                    </Box>
                  ))}
                </Box>
              ) : '-'
            }
          />
        </Box>
      </Box>
    </Box>
  );
};

export default PatientDetail;