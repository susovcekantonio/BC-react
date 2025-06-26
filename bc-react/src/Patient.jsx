import React, { useEffect, useState } from "react";
import Treatment from "./Treatment";
import { addPatient, getPatient, updatePatient, deletePatient } from "./patientService";

function Patient({ doctorId, doctorName }) {
  const [patients, setPatients] = useState([]);
  const [name, setName] = useState("");
  const [condition, setCondition] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    async function getPatients(doctorId){
      const response = await getPatient();
      if (response) {
        setPatients(response.data);
      }
    }
    getPatients(doctorId);
  }, []);

  async function handleAddPatient() {
    if (name === "" || condition === "" || !doctorId) {
      alert("Please fill all fields and select a doctor");
      return;
    }

    const newPatient = {
      name,
      condition,
      age: 35
    };

    const response = await addPatient(doctorId, newPatient);

    setPatients([...patients, response.data]);
    setName("");
    setCondition("");
  }

  async function handleUpdatePatient(patientId) {
    if (name === "" || condition === "" ) {
      alert("Please enter both name and specialty");
      return;
    }

    const updatedPatient = {
      name,
      condition,
      age: 45
    };

    await updatePatient(doctorId, patientId, updatedPatient);

    const updatedPatients = patients.map((patient) =>
      patient.id === patientId ? { ...patient, name, condition } : patient
    );

    setPatients(updatedPatients);
    setName("");
    setCondition("");
  }

  async function handleDeletePatient(patientId) {
    await deletePatient(doctorId, patientId);

    const updatedPatients = patients.filter((p) => p.id !== patientId);
    setPatients(updatedPatients);
  }

  const visiblePatients = patients.filter((p) => p.doctorId === doctorId);

  return (
    <div>
      <h3>
        Patients {`of Dr. ${doctorName}`}
      </h3>

      {!doctorId ? (
        <p><i>Please select a doctor to view/add patients.</i></p>
      ) : (
        <>
          <input
            placeholder="Patient name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <input
            placeholder="Condition"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
          />
          <br />
          <button onClick={handleAddPatient}>Add Patient</button>

          <li id="list-header">
      <span id="col-name">Name</span>
      <span id="col-specialty">Condition</span>
      <span id="col-actions">Actions</span>
      </li>

      {visiblePatients.map((patient) => (
        <li key={patient.id} id={`list-row-${patient.id}`}>
          <span id="col-name">{patient.name}</span>
          <span id="col-specialty">{patient.condition}</span>
          <span id="col-actions">
          <button onClick={() => setSelectedPatient(patient)}>Treatment</button>
          <button onClick={() => handleUpdatePatient(patient.id)}>Edit</button>
          <button onClick={() => handleDeletePatient(patient.id)}>Delete</button>
          </span>
        </li>
      ))}
        </>
      )}
      <Treatment patient={selectedPatient} onClose={() => setSelectedPatient(null)} />
    </div>
  );
}

export default Patient;
