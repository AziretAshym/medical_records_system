import React from 'react';
import { Box, Typography, Divider, Chip } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import { MedicalRecord, Patient, User, UserDoctor } from '@/types';

interface Props {
  medicalRecord: MedicalRecord;
}

const MedicalRecordDetail: React.FC<Props> = ({ medicalRecord }) => {
  const InfoRow = ({ label, value }: { label: string; value: string | React.ReactNode }) => (
    <Box sx={{
      display: 'flex',
      alignItems: 'start',
      py: 1,
      borderBottom: '1px solid',
      borderColor: 'divider',
      '&:last-child': { borderBottom: 'none' }
    }}>
      <Typography
        variant="body2"
        sx={{
          minWidth: '180px',
          fontWeight: 500,
          color: 'text.secondary'
        }}
      >
        {label}:
      </Typography>
      <Box>{value || '-'}</Box>
    </Box>
  );

  const renderName = (
    person: string | User | UserDoctor | Patient | null
  ): string => {
    if (typeof person === 'string') return person;
    if (!person) return '';

    if ('name' in person) {
      return person.name;
    }

    if ('displayName' in person) {
      return person.displayName;
    }

    return '';
  };

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
        <DescriptionIcon sx={{ fontSize: 40, mr: 2 }} />
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 0.5 }}>
            Медицинская карта №{medicalRecord.recordNumber}
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9 }}>
            Дата визита: {new Date(medicalRecord.visitDate).toLocaleDateString('ru-RU')}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ bgcolor: 'background.paper', borderRadius: 2, p: 3, boxShadow: 1 }}>
        <Typography variant="h6" color="primary" gutterBottom>
          Основная информация
        </Typography>

        <InfoRow label="Пациент" value={renderName(medicalRecord.patient)} />
        <InfoRow label="Врач" value={renderName(medicalRecord.doctor)} />
        <InfoRow label="Диагноз" value={medicalRecord.diagnosis} />
        <InfoRow label="Примечания" value={medicalRecord.notes || '-'} />

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" color="primary" gutterBottom>
          Дополнительно
        </Typography>

        <InfoRow
          label="Симптомы"
          value={
            medicalRecord.symptoms.length > 0 ? (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {medicalRecord.symptoms.map((symptom, i) => (
                  <Chip key={i} label={symptom} color="default" variant="outlined" size="small" />
                ))}
              </Box>
            ) : (
              '-'
            )
          }
        />
        <InfoRow label="Создано" value={renderName(medicalRecord.createdBy)} />
        <InfoRow label="Обновлено" value={renderName(medicalRecord.updatedBy)} />
      </Box>
    </Box>
  );
};

export default MedicalRecordDetail;
