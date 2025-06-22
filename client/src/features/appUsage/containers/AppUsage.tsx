import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Tabs,
  Tab,
  Box,
  Typography,
  Paper,
} from '@mui/material';
import { BadgeHelp } from 'lucide-react';
import GeneralOverview from '@/features/appUsage/components/GeneralOverview.tsx';

// import GeneralOverview from '@/features/appUsage/components/GeneralOverview';
// import PatientsOverview from '@/features/appUsage/components/PatientsOverview';
// import RecordsOverview from '@/features/appUsage/components/RecordsOverview';
// import TreatmentsOverview from '@/features/appUsage/components/TreatmentsOverview';
// import UsersOverview from '@/features/appUsage/components/UsersOverview';
// import ArchiveOverview from '@/features/appUsage/components/ArchiveOverview';
// import AdminPanelOverview from '@/features/appUsage/components/AdminPanelOverview';


const AppUsage = () => {
  const [tab, setTab] = useState('general');
  const location = useLocation();
  const navigate = useNavigate();

  const tabNames = useMemo(() => [
    'general',
    'patients',
    'medical-records',
    'treatments',
    'archive',
    'admin-panel',
  ], []);

  const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
    navigate({
      pathname: '/app-usage',
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
        <BadgeHelp style={{marginRight: 5}}/>
        <Typography variant="h5">Справка по пользованию</Typography>
      </Box>

      <Box display="flex" justifyContent="center">
        <Tabs
          value={tab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ mb: 3 }}
        >
          <Tab label="Общее" value="general" />
          <Tab label="Пациенты" value="patients" />
          <Tab label="Приемы" value="medical-records" />
          <Tab label="Назначения" value="treatments" />
          <Tab label="Архив" value="archive" />
          <Tab label="Админ панель" value="admin-panel" />
        </Tabs>
      </Box>

      <Box>
        {tab === 'general' && <GeneralOverview />}
      {/*  {tab === 'patients' && <PatientsOverview />}*/}
      {/*  {tab === 'medical-records' && <RecordsOverview />}*/}
      {/*  {tab === 'treatments' && <TreatmentsOverview />}*/}
      {/*  {tab === 'users' && <UsersOverview />}*/}
      {/*  {tab === 'archive' && <ArchiveOverview />}*/}
      {/*  {tab === 'admin-panel' && user?.role === 'admin' && <AdminPanelOverview />}*/}
      </Box>
    </Paper>
  );
};

export default AppUsage;
