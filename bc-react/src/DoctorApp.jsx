import React, { useEffect } from "react";

function DoctorApp() {

  function getDoctors() {
    const data = localStorage.getItem("doctors");
    return data ? JSON.parse(data) : [];
  }

  function saveDoctors(doctors) {
    localStorage.setItem("doctors", JSON.stringify(doctors));
  }

  function addDoctor() {
    const name = document.getElementById("name").value;
    const specialty = document.getElementById("specialty").value;

    if (name === "" || specialty === "") {
      alert("Input both lines for doctor");
      return;
    }

    const doctors = getDoctors();
    doctors.push({ name, specialty });
    saveDoctors(doctors);
    showDoctors();
    document.getElementById("name").value = "";
    document.getElementById("specialty").value = "";
  }

  function editDoctor(i){
    const name = document.getElementById("name").value;
    const specialty = document.getElementById("specialty").value;
    const doctors = getDoctors();
    doctors[i] = { name, specialty };
    saveDoctors(doctors);
    showDoctors();
  }

  function deleteDoctor(i) {
    const doctors = getDoctors();
    doctors.splice(i, 1);
    saveDoctors(doctors);
    showDoctors();
  }

  function showDoctors() {
    const list = document.getElementById("doctorList");
    const doctors = getDoctors();

    doctors.forEach((doctor, i) => {
      const li = document.createElement("li");
      li.innerText = `${doctor.name} - ${doctor.specialty} `;

      const selectBtn = document.createElement("button");
      selectBtn.innerText = "Select";

      const editBtn = document.createElement("button");
      editBtn.innerText = "Edit";
      editBtn.onclick = () => editDoctor(i);

      const delBtn = document.createElement("button");
      delBtn.innerText = "Delete";
      delBtn.onclick = () => deleteDoctor(i);

      li.appendChild(selectBtn);
      li.appendChild(editBtn);
      li.appendChild(delBtn);
      list.appendChild(li);
    });
  }

  useEffect(() => {
    showDoctors();
  }, []);

  return (
    <div>
      <h2>Doctor List</h2>
      <input id="name" placeholder="Doctor name" />
      <input id="specialty" placeholder="Specialty" />
      <button onClick={addDoctor}>Add Doctor</button>

      <ul>
      {getDoctors().map((doctor, i) => (
          <li key={i}>
            {doctor.name} - {doctor.specialty}
            <button onClick={() => deleteDoctor(i)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DoctorApp;