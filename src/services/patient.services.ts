import axios from 'axios';
import normalizer from 'Utils/normalizer';

export const uploadImage = async(data: any)=> {
    const url = process.env.PUBLIC_PATH;
    const port = process.env.PORT;

    const formData = new FormData();
    formData.append('image', data);
    formData.append('name', data.name);
    try {
        const response = await axios({
            method:'POST',
            url: `http://${url}:${port}/images/`,
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data; boundary=--------------------------907931495521859766893792"
            },
            responseType: 'json'
        });

        console.log('response', response);
        return response.data;

    }
    catch(err) {

    }
}

export const savePatientInformation = async(data: any) => {
    const url = process.env.PUBLIC_PATH;
    const port = process.env.PORT;
    console.log('data', data);
    console.log('saved');
    const patientID = data.patientID;

    try {
        const response = await axios({
            method: 'POST',
            url: `http://${url}:${port}/patients/${patientID}`,
            responseType: 'json',
            data: normalizer.response.patient(data)
        })

        console.log('create patient', response);
        return response.data;
    }
    catch(err) {
        const { error } = err?.response?.data || {};
        console.log('err', err);
        return { error: { message: err?.message } };
    }
}

export const createPatient = async(data:any) => {
    const url = process.env.PUBLIC_PATH;
    const port = process.env.PORT;
    
    console.log('data', data);
    console.log(normalizer.response.patient(data));
    try {
        const response = await axios({
            method: 'POST',
            url: `http://${url}:${port}/patients/`,
            responseType: 'json',
            data: normalizer.response.patient(data)
        })

        console.log('create patient', response);
        return response.data;
    }
    catch(err) {
        const { error } = err?.response?.data || {};
        console.log('err', err);
        return { error: { message: err?.message } };
    }
}

export const updatePatientInformation = async(data: any) => {
    const url = process.env.PUBLIC_PATH;
    const port = process.env.PORT;

    try {
        const response = await axios({
            method: 'PUT',
            url: `http://${url}:${port}/patients/${data}`

        })
    }
    catch (err) {
        const { error } = err?.response?.data || {};
        console.log('err', err);
        return { error: { message: err?.message } };
    }
}

export const fetchImage = async(url: any) => {
    try {
        const response = await axios({
            method: 'GET',
            url: url,
            responseType: 'json'
        });

        console.log(response);

        return response.data;
    }
    catch(err) {
        console.log('err', err);
        return { error: { message: err?.message } };
    }
}

export const fetchComments = async(patientID: any) => {
    const url = process.env.PUBLIC_PATH;
    const port = process.env.PORT;
    console.log('patientID', patientID);
    try {
        const response = await axios({
            method:'GET',
            url: `http://${url}:${port}/patients/${patientID}/comments/`,
            responseType: 'json'
        });
        console.log('response', response);

        const patientComments = response.data.map((comment: any)=> {
            return normalizer.model.comment(comment);
        })
        console.log('patientsCommenst', patientComments);
       
        return patientComments;
    }
    catch(err) {
        const { error } = err?.response?.data || {};
        console.log('err', err);
        return { error: { message: err?.message } };
    }
}

export const createComments = async(data: any) => {
    const url = process.env.PUBLIC_PATH;
    const port = process.env.PORT;
    // const accessToken = localStorage.getItem('accessToken');
    // const uploadImageResponse = await Promise.all(data.image.map(async (image: any)=> {
    //     const response:any = await uploadImage(image);
    //     console.log('response', response);
    //     return response;
    // }));
    data = normalizer.response.comment(data);
    console.log('data', data);
    var formData = new FormData();
    formData.append('patient', data.patient);
    formData.append('title', data.title);
    formData.append('comment', data.comment);
    formData.append('user', data.user);

    if(data.image) {
        const images = data.image.map((image: any)=> {
            let tempFormData = new FormData();
            tempFormData.append('image', image);
            tempFormData.append('name', image.name);
            return tempFormData;
        });
        
        formData.append('image', images);
    }
   
    // data.image = images;
    console.log('data', data);
    console.log(normalizer.model.comment(data));

    try {
        const response = await axios({
            method:'POST',
            url: `http://${url}:${port}/comments/`,
            // headers: {
            //     // "Content-Type": "multipart/form-data; boundary=--------------------------907931495521859766893792",
            //     // 'Authorization': `Bearer ${accessToken}`
            // },
            responseType: 'json',
            data: formData
        });
        console.log('response', response);
        return response.data;
    }
    catch(err) {
        const { error } = err?.response?.data || {};
        console.log('err', err);
        return { error: { message: err?.message } };
    }
}

export const editComments = async(data: any) => {
    const url = process.env.PUBLIC_PATH;
    const port = process.env.PORT;
    console.log('data', data);
    try {
        const response = await axios({
            method:'PUT',
            url: `http://${url}:${port}/comments/${data.id}/`,
            responseType: 'json',
            data: normalizer.response.comment(data)
        });
        console.log('response', response);
        return response.data;
    }
    catch(err) {
        console.log('err', err);
        return { error: { message: err?.message } };
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
        let tempImage = response.data.image;
        let patientProfilePic = tempImage != null ? await fetchImage(tempImage): null;
        console.log('ptientprofilepic', patientProfilePic);
        var patientData = normalizer.model.patient(response.data);
       var comments = await fetchComments(patientID);
        patientData.comments = comments;
        patientData.profilePicBlob = patientProfilePic;
        // const patientsData = response.data.map(async (patient: any)=> {
        //     patient.image = await fetchPatientProfilePic(patient.image[0])
        // })
        console.log('patientData', patientData);
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
            // headers: {
            //     'Authorization': 'Bearer realm="api"'
            // }
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