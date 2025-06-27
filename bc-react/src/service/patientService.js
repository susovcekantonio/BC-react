import api from "./api.js";

export const getPatient = async (doctorId) => {
    return api.get(`doctor/${doctorId}/patient/get-patients`)
};

export const addPatient = async (doctorId, patient) => {
    return api.post(`doctor/${doctorId}/patient/create`, patient)
};

export const updatePatient = async (doctorId, patientId, patient) => {
    return api.put(`doctor/${doctorId}/patient/update/${patientId}`, patient)
};

export const deletePatient = async (doctorId, patientId) => {
    return api.delete(`doctor/${doctorId}/patient/delete/${patientId}`)
};