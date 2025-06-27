import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DoctorPage from "../pages/DoctorPage";
import PatientPage from "../pages/PatientPage";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/doctor" element={<DoctorPage />} />
        <Route path="/doctor/:doctorId/patient" element={<PatientPage />} />
      </Routes>
    </Router>
  );
}