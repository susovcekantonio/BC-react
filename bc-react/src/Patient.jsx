import React, { useEffect } from "react";

function PatientComponent({ doctorIndex }) {
  function getPatients() {
    const data = localStorage.getItem("patients");
    return data ? JSON.parse(data) : {};
  }

  function savePatients(patients) {
    localStorage.setItem("patients", JSON.stringify(patients));
  }

  function addPatient() {
    const name = document.getElementById("pname").value;
    const condition = document.getElementById("pcondition").value;

    if (name === "" || condition === "") {
      alert("Fill both patient fields");
      return;
    }

    const patients = getPatients();
    const doctorPatients = patients[doctorIndex] || [];
    doctorPatients.push({ name, condition });
    patients[doctorIndex] = doctorPatients;
    savePatients(patients);
    showPatients();
    document.getElementById("pname").value = "";
    document.getElementById("pcondition").value = "";
  }

  function deletePatient(i) {
    const patients = getPatients();
    const doctorPatients = patients[doctorIndex] || [];
    doctorPatients.splice(i, 1);
    patients[doctorIndex] = doctorPatients;
    savePatients(patients);
    showPatients();
  }

  function showPatients() {
    const list = document.getElementById("patientList");
    list.innerHTML = "";
    const patients = getPatients();
    const doctorPatients = patients[doctorIndex] || [];

    doctorPatients.forEach((p, i) => {
      const li = document.createElement("li");
      li.innerText = `${p.name} - ${p.condition} `;

      const delBtn = document.createElement("button");
      delBtn.innerText = "Delete";
      delBtn.onclick = () => deletePatient(i);

      li.appendChild(delBtn);
      list.appendChild(li);
    });
  }

  useEffect(() => {
    showPatients();
  }, [doctorIndex]);

  return (
    <div>
      <h3>Patients for Doctor #{doctorIndex + 1}</h3>
      <input type="text" id="pname" placeholder="Patient name" />
      <input type="text" id="pcondition" placeholder="Condition" />
      <button onClick={addPatient}>Add Patient</button>
      <ul id="patientList"></ul>
    </div>
  );
}

export default PatientComponent;
