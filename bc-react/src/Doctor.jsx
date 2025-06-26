import React, { useEffect, useState } from "react";
import Patient from "./Patient.jsx";
import {getDoctor, addDoctor, updateDoctor, deleteDoctor} from "./doctorService.js"

function DoctorApp() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState({ id: null, name: "" });
  const [name, setName] = useState("");
  const [specialty, setSpecialty] = useState("");

  useEffect(() => {
    async function getDoctors(){
    const response = await getDoctor();
    if (response) {
      setDoctors(response.data);
    }
  }
  getDoctors();
  }, []);

  async function handleAddDoctor() {
    if (name === "" || specialty === "") {
      alert("Please enter both name and specialty");
      return;
    }

    const response = await addDoctor({ name, specialty, age: 30 });
    setDoctors([...doctors, response.data]);
    setName("");
    setSpecialty("");
  }

  async function handleUpdateDoctor(doctorId) {
    if (name === "" || specialty === "") {
      alert("Please enter both name and specialty");
      return;
    }

    const updatedDoctor = {
      name,
      specialty,
      age: 40 
    };

    await updateDoctor(doctorId, updatedDoctor);

    const updatedDoctors = doctors.map((doctor) =>
      doctor.id === doctorId ? { ...doctor, name, specialty } : doctor
    );

    if (selectedDoctor.id === doctorId) {
      setSelectedDoctor({ doctorId, name });
    }

    setDoctors(updatedDoctors);
    setName("");
    setSpecialty("");
  }

  async function handleDeleteDoctor(doctorId) {
    await deleteDoctor(doctorId);

    const updatedDoctors = doctors.filter((doc) => doc.id !== doctorId);
    setDoctors(updatedDoctors);

    if (selectedDoctor.id === doctorId) {
      setSelectedDoctor({ id: null, name: "" });
    }
  }

  return (
    <div id="doctor-container">
      <h2>Doctor List</h2>

      <input
        placeholder="Doctor name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <input
        placeholder="Specialty"
        value={specialty}
        onChange={(e) => setSpecialty(e.target.value)}
      />
      <br />
      <button onClick={handleAddDoctor}>Add Doctor</button>

      <li id="list-header">
      <span id="col-name">Name</span>
      <span id="col-specialty">Specialty</span>
      <span id="col-actions">Actions</span>
      </li>

      {doctors.map((doctor) => (
        <li key={doctor.id} id={`list-row-${doctor.id}`}>
          <span id="col-name">{doctor.name}</span>
          <span id="col-specialty">{doctor.specialty}</span>
          <span id="col-actions">
          <button onClick={() => setSelectedDoctor({ id: doctor.id, name: doctor.name })}>Select</button>
          <button onClick={() => handleUpdateDoctor(doctor.id)}>Edit</button>
          <button onClick={() => handleDeleteDoctor(doctor.id)}>Delete</button>
          </span>
        </li>
      ))}

      <Patient doctorId={selectedDoctor.id} doctorName={selectedDoctor.name} />
    </div>
  );
}

export default DoctorApp;
