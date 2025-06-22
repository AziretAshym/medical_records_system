import { Routes, Route } from 'react-router-dom';
import LoginPage from '@/features/users/containers/LoginPage.tsx';
import Layout from '@/layout/Layout.tsx';
import PatientsPage from '@/features/patients/containers/PatientsPage.tsx';
import { TooltipProvider } from '@/components/ui/tooltip.tsx';
import PatientDetailPage from '@/features/patients/containers/PatientDetailPage.tsx';
import MedicalRecordsPage from '@/features/medicalRecords/containers/MedicalRecordsPage.tsx';
import MedicalRecordDetailPage from '@/features/medicalRecords/containers/MedicalRecordDetailPage.tsx';
import TreatmentsPage from '@/features/treatments/containers/TreatmentsPage.tsx';
import TreatmentDetailPage from '@/features/treatments/containers/TreatmentDetailPage.tsx';
import AdminPage from '@/features/admin/containers/AdminPage.tsx';
import AppUsage from '@/features/appUsage/containers/AppUsage.tsx';
import ArchivePage from '@/features/archive/containers/ArchivePage.tsx';

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
            <Route path="/treatments" element={<TreatmentsPage />} />
            <Route path="/treatments/:id" element={<TreatmentDetailPage />} />
            <Route path="/admin-panel" element={<AdminPage />} />
            <Route path="/archive" element={<ArchivePage />} />
            <Route path="/app-usage" element={<AppUsage />} />
            <Route path="/*" element={<h1>Not found</h1>}/>
          </Route>
        </Routes>
      </TooltipProvider>
    </>
  );
};

export default App;