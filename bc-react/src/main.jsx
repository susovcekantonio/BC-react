import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import DoctorApp from './DoctorApp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DoctorApp />
  </StrictMode>,
)
