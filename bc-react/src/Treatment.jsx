import React, { useEffect, useState } from "react";

function Treatment({ patient, onClose }) {
  if (!patient) return null;
  const [treatment, setTreatment] = useState("");

  const treatmentKey = patient.id;

  useEffect(() => {
    if (!patient) return;
    const storedTreatments = JSON.parse(localStorage.getItem("treatments")) || {};
    if (storedTreatments[treatmentKey]) {
      setTreatment(storedTreatments[treatmentKey]);
    }
  }, [treatmentKey]);
  
  function handleSave() {
    const storedTreatments = JSON.parse(localStorage.getItem("treatments")) || {};
    storedTreatments[treatmentKey] = treatment;
    localStorage.setItem("treatments", JSON.stringify(storedTreatments));
    onClose();
  }



  return (
    <div id="treatment-box">
      <h4>Treatment for {patient.name}</h4>
      <textarea
        rows="4"
        placeholder="Enter treatment instructions..."
        value={treatment}
        onChange={(e) => setTreatment(e.target.value)}
      />
      <br />
      <button onClick={handleSave}>Save</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default Treatment;
