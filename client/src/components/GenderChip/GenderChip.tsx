import { Chip } from '@mui/material';

const GenderChip = ({ gender }: { gender: string }) => (
  <Chip
    label={gender === 'male' ? 'Мужской' : 'Женский'}
    color={gender === 'male' ? 'primary' : 'secondary'}
    size='small'
    variant="outlined"
    sx={{
      borderRadius: '8px',
      fontWeight: 500,
      backgroundColor: gender === 'male' ? '#e3f2fd' : '#fce4ec',
      color: gender === 'male' ? '#1976d2' : '#d81b60',
    }}
  />
);

export default GenderChip;