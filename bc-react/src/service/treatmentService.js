import api from "./api.js"



export const addTreatment = async (patientId, treatment) => {
    return api.post(`/patient/${patientId}/record/create`, treatment)
};