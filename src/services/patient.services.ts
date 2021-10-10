import axios from 'axios';
import normalizer from 'Utils/normalizer';

export const newPatient = () => {

}

export const savePatientInformation = (data: any) => {
    console.log('data', data);
    console.log('saved');
}

export const updatePatientInformation = () => {

}

export const fetchComments = async(patientID: any) => {
    const url = process.env.PUBLIC_PATH;
    const port = process.env.PORT;

    try {
        const response = await axios({
            method:'GET',
            url: `http://${url}:${port}/patients/${patientID}`,
            responseType: 'json'
        });

        return response.data;
    }
    catch(err) {

    }
}

export const fetchPatientInformation = async(patientID: any) => {
    const url = process.env.PUBLIC_PATH;
    const port = process.env.PORT;
    console.log('patientID', patientID);
    try{
        const response = await axios({
            method: 'GET',
            url: `http://${url}:${port}/patients/${patientID}/`,
            responseType: 'json',
           
        })
        console.log('response.data', response.data);
        const patientData = normalizer.model.patient(response.data);
        // const patientsData = response.data.map(async (patient: any)=> {
        //     patient.image = await fetchPatientProfilePic(patient.image[0])
        // })
        return patientData;
    }
    catch(err) {
        const { error } = err?.response?.data || {};
        console.log('err', err);
        return { error: { message: err?.message } };
    }
    
}

export const fetchPatientProfilePic = async(url: string) => {
    try {
        const response = await axios({
            method: 'GET',
            url: url,
            responseType: 'json',
            headers: {
                'Authorization': 'Bearer realm="api"'
            }
        })
        console.log('response.data', response.data);
        return response.data;
    }
    catch(err) {
        return { error: { message: err?.message } };
    }
}

export const fetchPatientList = async() => {
    const url = process.env.PUBLIC_PATH;
    const port = process.env.PORT;
    console.log('url', url);
    console.log('port', port);

    try{
        const response = await axios({
            method: 'GET',
            url: `http://${url}:${port}/patients/`,
            responseType: 'json',
           
        })
        console.log('response.data', response.data);
        const patientsData = response.data.map((patient: any)=> {
            return normalizer.model.patient(patient);
        })
        // const patientsData = response.data.map(async (patient: any)=> {
        //     patient.image = await fetchPatientProfilePic(patient.image[0])
        // })
        return patientsData;
    }
    catch(err) {
        const { error } = err?.response?.data || {};
        console.log('err', err);
        return { error: { message: err?.message } };
    }
    

}

export const generateReport = () => {
    
}