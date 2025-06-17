import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import HealingIcon from '@mui/icons-material/Healing';
import { Treatment, User, Patient } from '@/types';
import { useNavigate } from 'react-router-dom';

interface Props {
  treatment: Treatment;
}

const TreatmentDetail: React.FC<Props> = ({ treatment }) => {
  const navigate = useNavigate();
  const InfoRow = ({ label, value }: { label: string; value: string | React.ReactNode }) => (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'start',
        py: 1,
        borderBottom: '1px solid',
        borderColor: 'divider',
        '&:last-child': { borderBottom: 'none' },
      }}
    >
      <Typography
        variant="body2"
        sx={{
          minWidth: '180px',
          fontWeight: 500,
          color: 'text.secondary',
        }}
      >
        {label}:
      </Typography>
      <Box>{value || '-'}</Box>
    </Box>
  );

  const renderName = (
    person: string | User | Patient | { _id: string; name?: string; firstName?: string; lastName?: string } | null
  ): string => {
    if (typeof person === 'string') return person;
    if (!person) return '';
    if ('name' in person) return person.name || '';
    if ('firstName' in person && 'lastName' in person) {
      return `${person.firstName} ${person.lastName}`;
    }
    return '';
  };

  return (
    <Box sx={{ mt: 3, px: { xs: 2, md: 4 }, mb: 4, maxWidth: '900px', mx: 'auto' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 3,
          p: 2.5,
          bgcolor: 'primary.main',
          color: 'white',
          borderRadius: 2,
        }}
      >
        <HealingIcon sx={{ fontSize: 40, mr: 2 }} />
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 0.5 }}>
            Назначение №{treatment.treatmentNumber}
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9 }}>
            Назначено: {new Date(treatment.startDate).toLocaleDateString('ru-RU')}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ bgcolor: 'background.paper', borderRadius: 2, p: 3, boxShadow: 1 }}>
        <Typography variant="h6" color="primary" gutterBottom>
          Основная информация
        </Typography>

        <InfoRow label="Пациент" value={renderName(treatment.patient)} />
        <InfoRow label="Описание" value={treatment.description} />
        <InfoRow label="Тип" value={treatment.type} />
        <InfoRow label="Дозировка" value={treatment.dosage || '-'} />
        <InfoRow label="Частота" value={treatment.frequency || '-'} />
        <InfoRow label="Продолжительность" value={treatment.duration || '-'} />
        <InfoRow label="Дата начала" value={new Date(treatment.startDate).toLocaleDateString('ru-RU')} />
        <InfoRow label="Дата окончания" value={treatment.endDate ? new Date(treatment.endDate).toLocaleDateString('ru-RU') : '-'} />
        <InfoRow label="Статус" value={treatment.status} />

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" color="primary" gutterBottom>
          Системная информация
        </Typography>

        <Box
          sx={{ cursor: 'pointer', textDecoration: 'underline', color: 'primary.main' }}
          onClick={() => {
            if (typeof treatment.patient === 'object' && treatment.patient && '_id' in treatment.patient) {
              navigate(`/patients/${treatment.patient._id}`);
            }
          }}
        >
          <InfoRow label="Медицинская карта" value={renderName(treatment.patient)} />
        </Box>
        <InfoRow label="Создано" value={new Date(treatment.createdAt).toLocaleString('ru-RU')} />
        <InfoRow label="Обновлено" value={new Date(treatment.updatedAt).toLocaleString('ru-RU')} />
      </Box>
    </Box>
  );
};

export default TreatmentDetail;