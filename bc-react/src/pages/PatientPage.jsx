import { useParams } from 'react-router-dom';
import Patient from '../components/Patient.jsx'

export default function PatientPage() {
  const { doctorId } = useParams();  
  return (
    <div>
      <Patient doctorId={doctorId} />
    </div>
  );
}
