import { Routes, Route } from 'react-router-dom';
import LoginPage from '@/features/users/containers/LoginPage.tsx';
import Layout from '@/layout/Layout.tsx';
import PatientsPage from '@/features/patients/containers/PatientsPage.tsx';
import { TooltipProvider } from '@/components/ui/tooltip.tsx';
import PatientDetailPage from '@/features/patients/containers/PatientDetailPage.tsx';
import MedicalRecordsPage from '@/features/medicalRecords/containers/MedicalRecordsPage.tsx';
import MedicalRecordDetailPage from '@/features/medicalRecords/containers/MedicalRecordDetailPage.tsx';

const App = () => {
  return (
    <>
      <TooltipProvider>
        <Routes>
          <Route path="/login" element={<LoginPage/>}/>
          <Route element={<Layout/>}>
            <Route path="/" element={<PatientsPage/>}/>
            <Route path="/patients" element={<PatientsPage/>}/>
            <Route path="/patients/:id" element={<PatientDetailPage />} />
            <Route path="/medical-records" element={<MedicalRecordsPage />} />
            <Route path="/medical-records/:id" element={<MedicalRecordDetailPage />} />
            <Route path="/*" element={<h1>Not found</h1>}/>
          </Route>
        </Routes>
      </TooltipProvider>
    </>
  );
};

export default App;