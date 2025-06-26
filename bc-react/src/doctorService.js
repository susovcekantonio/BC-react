import api from "./api.js";

export const getDoctor = async () => {
    return api.get("/doctor/get-all")
};

export const addDoctor = async (doctor) => {
  return api.post("/doctor/create", doctor);
};

export const updateDoctor = async (doctorId, doctor) => {
    return api.put(`/doctor/update/${doctorId}`, doctor);
};

export const deleteDoctor = async (doctorId) => {
    return api.delete(`/doctor/delete/${doctorId}`)
};