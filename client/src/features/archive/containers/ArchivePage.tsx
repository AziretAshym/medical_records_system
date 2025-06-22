import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Tabs,
  Tab,
  Box,
  Typography,
  Paper,
} from '@mui/material';
import { Archive } from 'lucide-react';
import ArchivedPatients from '@/features/archive/components/ArchivedPatients.tsx';

const ArchivePage = () => {
  const [tab, setTab] = useState('general');
  const location = useLocation();
  const navigate = useNavigate();

  const tabNames = useMemo(() => [
    'patients',
    'medical-records',
    'treatments',
    'users',
  ], []);

  const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
    navigate({
      pathname: '/archive',
      search: `?tab=${newValue}`,
    });
    setTab(newValue);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const queryTab = queryParams.get('tab');
    if (queryTab && tabNames.includes(queryTab)) {
      setTab(queryTab);
    }
  }, [location, tabNames]);

  return (
    <Paper sx={{ p: 4, maxWidth: 1000, mx: 'auto', mt: 4 }}>
      <Box display="flex" justifyContent="center" alignItems="center" mb={3}>
        <Archive style={{marginRight: 5}}/>
        <Typography variant="h5">Архив</Typography>
      </Box>

      <Box display="flex" justifyContent="center">
        <Tabs
          value={tab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ mb: 3 }}
        >
          <Tab label="Пациенты" value="patients" />
          <Tab label="Приемы" value="medical-records" />
          <Tab label="Назначения" value="treatments" />
          <Tab label="Пользователи" value="users" />
        </Tabs>
      </Box>

      <Box>
          {tab === 'patients' && <ArchivedPatients />}
      </Box>
    </Paper>
  );
};

export default ArchivePage;
