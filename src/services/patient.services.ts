import _, {omit} from 'lodash';
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
    catch(err:any) {

    }
}

export const savePatientInformation = async(data: any) => {
    const url = process.env.PUBLIC_PATH;
    const port = process.env.PORT;
    const accessToken =  localStorage.getItem('accessToken');
    console.log('data', data);
    console.log('saved');
    const patientID = data.patientID;

    try {
        const response = await axios({
            method: 'POST',
            url: `http://${url}:${port}/patients/${patientID}`,
            responseType: 'json',
            data: normalizer.response.patient(data),
            headers: {
                'Authorization': `Bearer ${accessToken}`        
            },
        })

        console.log('create patient', response);
        return response.data;
    }
    catch(err:any) {
        const { error } = err?.response?.data || {};
        console.log('err', err);
        return { error: { message: err?.message } };
    }
}

export const createPatient = async(data:any) => {
    const url = process.env.PUBLIC_PATH;
    const port = process.env.PORT;
    const accessToken = localStorage.getItem('accessToken');
    
    console.log('data', data);
    console.log(normalizer.response.patient(data));
    try {
        const response = await axios({
            method: 'POST',
            url: `http://${url}:${port}/patients/`,
            responseType: 'json',
            data: normalizer.response.patient(data),
            headers: {
                'Authorization': `Bearer ${accessToken}`        
            },
        })

        console.log('create patient', response);
        return normalizer.model.patient(response.data);
    }
    catch(err:any) {
        const { error }:any = err?.response?.data || {};
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
    catch(err:any) {
        const { error } = err?.response?.data || {};
        console.log('err', err);
        return { error: { message: err?.message } };
    }
}

export const fetchImage = async(url: any) => {
    const accessToken = localStorage.getItem('accessToken');
    try {
        const response = await axios({
            method: 'GET',
            url: url,
            responseType: 'json',
            headers: {
                'Authorization': `Bearer ${accessToken}`        
            },
        });

        console.log(response);

        return response.data;
    }
    catch(err:any) {
        console.log('err', err);
        return { error: { message: err?.message } };
    }
}

export const fetchComments = async(patientID: any) => {
    const url = process.env.PUBLIC_PATH;
    const port = process.env.PORT;
    const accessToken = localStorage.getItem('accessToken');
    console.log('patientID', patientID);
    try {
        const response = await axios({
            method:'GET',
            url: `http://${url}:${port}/patients/${patientID}/comments/`,
            responseType: 'json',
            headers: {
                'Authorization': `Bearer ${accessToken}`        
            },
        });
        console.log('response', response);

        const patientComments = response.data.map((comment: any)=> {
            return normalizer.model.comment(comment);
        })
        console.log('patientsCommenst', patientComments);
       
        return patientComments;
    }
    catch(err:any) {
        const { error } = err?.response?.data || {};
        console.log('err', err);
        return { error: { message: err?.message } };
    }
}

export const createComments = async(data: any) => {
    const url = process.env.PUBLIC_PATH;
    const port = process.env.PORT;
    const patientID = data.patientID;
    console.log('data', data);
    const accessToken = localStorage.getItem('accessToken');
    // const uploadImageResponse = await Promise.all(data.image.map(async (image: any)=> {
    //     const response:any = await uploadImage(image);
    //     console.log('response', response);
    //     return response;
    // }));

    data = normalizer.response.comment(data);
    console.log('data', data);
    var formData = new FormData();
    formData.append('title', data.title);
    formData.append('comment', data.comment);
    formData.append('user', data.user);
   
    if(data.image) {
      data.image.map((image: any, index:any)=> {
            formData.append('image', image, image.name);
        });
    }
   
    // data.image = images;
    console.log('formData', formData.getAll('image]'));
    

    try {
        const response = await axios({
            method:'POST',
            url: `http://${url}:${port}/patients/${patientID}/comments/`,
            headers: {
                "Content-Type": "multipart/form-data; boundary=--------------------------907931495521859766893792",
                'Authorization': `Bearer ${accessToken}`        
            },
            responseType: 'json',
            data: formData
        });
        console.log('response', response);
        return response.data;
    }
    catch(err:any) {
        const { error } = err?.response?.data || {};
        console.log('err', err);
        return { error: { message: err?.message } };
    }
}

export const editComments = async(data: any) => {
    const url = process.env.PUBLIC_PATH;
    const port = process.env.PORT;
    const accessToken = localStorage.getItem('accessToken');
    console.log('data', data);

  
    data = normalizer.response.comment(data);
    console.log('data', data);
    let commentID = data.pk;
    console.log('commentID', commentID);
    var formData = new FormData();
    formData.append('pk', data.pk);
    formData.append('title', data.title);
    formData.append('comment', data.comment);
    formData.append('user', data.user);
   
    if(data.image && data.image) {
      data.image.map((image: any, index:any)=> {
            formData.append('image', image, image.name);
        });
    }

    try {
        const response = await axios({
            method:'PUT',
            url: `http://${url}:${port}/comments/${commentID}/`,
            responseType: 'json',
            data: formData,
            headers: {
                'Authorization': `Bearer ${accessToken}`        
            },
        });
        console.log('response', response);
        return response.data;
    }
    catch(err:any) {
        console.log('err', err);
        return { error: { message: err?.message } };
    }
}


export const fetchPatientInformation = async(patientID: any) => {
    const url = process.env.PUBLIC_PATH;
    const port = process.env.PORT;
    const accessToken = localStorage.getItem('accessToken');
    console.log('accessToken', accessToken);
    console.log('patientID', patientID);
    try{
        const response = await axios({
            method: 'GET',
            url: `http://${url}:${port}/patients/${patientID}/`,
            responseType: 'json',
            headers: {
                'Authorization': `Bearer ${accessToken}`        
            },
           
        });

        console.log('response.data', response.data);
        let tempImage = response.data.image;
        let patientProfilePic = tempImage != null ? await fetchImage(tempImage): null;
        console.log('ptientprofilepic', patientProfilePic);
        var patientData = normalizer.model.patient(response.data);
        // var comments = await fetchComments(patientID);
        // console.log('comments', comments);
        // if(comments) patientData.comments = comments;
        if(patientProfilePic) patientData.profilePicBlob = patientProfilePic;
        // const patientsData = response.data.map(async (patient: any)=> {
        //     patient.image = await fetchPatientProfilePic(patient.image[0])
        // })
        console.log('patientData', patientData);
        return patientData;
    }
    catch(err:any) {
        const { error } = err?.response?.data || {};
        console.log('err', err);
        return { error: { message: err?.message } };
    }
    
}

export const fetchPatientProfilePic = async(url: string) => {
    const accessToken = localStorage.getItem('accessToken');
    try {
        const response = await axios({
            method: 'GET',
            url: url,
            responseType: 'json',
            // headers: {
            //     'Authorization': 'Bearer realm="api"'
            // }
            headers: {
                'Authorization': `Bearer ${accessToken}`        
            },
        })
        console.log('response.data', response.data);
        return response.data;
    }
    catch(err:any) {
        return { error: { message: err?.message } };
    }
}

export const fetchPatientList = async() => {
    const url = process.env.PUBLIC_PATH;
    const port = process.env.PORT;
    const accessToken = localStorage.getItem('accessToken');

    try{
        const response = await axios({
            method: 'GET',
            url: `http://${url}:${port}/patients/`,
            responseType: 'json',
            headers: {
                'Authorization': `Bearer ${accessToken}`        
            },
           
        })
        const patientsData = await Promise.all(response.data.map(async(patient: any)=> {
            let tempPatient = patient;
            let tempPatientID = (patient.url.split('s')[1]).split('/')[1];
            let comments = await fetchComments(tempPatientID);
        
            tempPatient.comments = comments;
            return normalizer.model.patient(tempPatient);
        }));
        // const patientsData = response.data.map(async (patient: any)=> {
        //     patient.image = await fetchPatientProfilePic(patient.image[0])
        // })
        return patientsData;
    }
    catch(err:any) {
        const { error } = err?.response?.data || {};
        console.log('err', err);
        return { error: { message: err?.message } };
    }
}

export const fetchReport = async(reportID: string) => {
    const url = process.env.PUBLIC_PATH;
    const port = process.env.PORT;
    const accessToken = localStorage.getItem('accessToken');
    //url: http://127.0.0.1:8000/patients/?expand=report_id/34uLYKmnJ94B9UAx89NLtE/
    try{
        const response = await axios({
            method: 'GET',
            url: `http://${url}:${port}/patienthealthrecords/?search=${reportID}`,
            responseType: 'json',
            headers: {
                'Authorization': `Bearer ${accessToken}`        
            },
        });

        console.log('response', response);

        return response.data;
        // .then((response) => { return response.data.filter((patient: any, index: any)=> {
        //     if(patient.report_id==reportID){
        //         console.log('true', patient.name);
        //     }
        //     return patient.report_id == reportID
        //     })
        // }).then( async(patient)=> {
        //     console.log('patient', patient);
        //     let tempPatient = normalizer.model.patient(patient[0]);
        //     const response = await axios({
        //         method: 'GET',
        //         url: `${patient[0].url}comments/`,
        //         responseType: 'json'
        //     })
        //     tempPatient.comments = response.data.map((comment: any)=> {
        //         return normalizer.model.comment(comment);
        //     })
        //     return tempPatient;
        // })
       
        console.log('response.data', response);
        // const patientsData = response.data.map(async (patient: any)=> {
        //     patient.image = await fetchPatientProfilePic(patient.image[0])
        // })
        return response;
    }
    catch(err:any) {
        const { error } = err?.response?.data || {};
        console.log('err', err);
        return { error: { message: err?.message } };
    }
}

export const generateObesityPrediction = async(data: any) => {
    try {
        const url = process.env.PUBLIC_PATH;
        const port = process.env.PORT;
        const accessToken = localStorage.getItem('accessToken');
        console.log(normalizer.response.obesityPrediction(data));

        const normalizedData = normalizer.response.obesityPrediction(data);
        console.log('normalizedData', normalizedData);

        const response:any = await axios({
            method: 'POST',
            responseType: 'json',
            url: `http://${url}:${port}/obesity/v1/comorbidities_classifier/predict`,
            data: { 
                "occupation":6,
                "gender":"Female",
                "race":"Indian",
                "bmi":21,
                "family-history": "High Cholesterol",
                "smoke-freq":"1-9 cigarette sticks per day",
                "active-scale":3,
                "alcohol-freq":"1-2 drinks per day",
                "meat-freq":"Daily",
                "dairy":"1-2 times per week",
                "fried-food":"2-4 times per week",
                "egg":"12 or more eggs per week",
                "meat-over-fried":"No",
                "vegetarian":"Yes",
                "milk-tea-coffee-lowfat":"4-6 times per week",
                "desserts":"4-6 times per week",
                "snacks":"0-1 time per week",
                "soda-candy":"4-6 times per week",
                "vegetable":"3-4 servings per day",
                "grain-bean":"5 or more servings per day",
                "fruits":"1-2 servings per day",
                "processed-food":"1-2 per day",
                "5-fruit":"No",
                "4-citrus":"No",
                "less-5-orange-yellow-fruit-vege":"Yes",
                "cruciferous-vege":"No",
                "smoked-meat-fish":"Yes",
                "nitrate-salt-meat":"Yes",
                "bbq":"No",
                "more-3-coffee":"No",
                "less-2-dairy-day":"Yes",
                "less-3-mamak-nasilemak-percik-week":"No",
                "ergo-workspace":"No","computer-hours":
                "Less than 6 hours",
                "seated-hours":"Less than 4 hours",
                "sleep":"Less than 6 hours",
                "stress":"No",
                "exercise-programme":"Yes",
                "personal-trainer":"Yes",
                "dietary-plan":"No",
            },
            headers: {
                'Authorization': `Bearer ${accessToken}`        
            },
        });
        console.log('response', response);
        console.log('response', response.data);

        // return response?.data;
    }
    catch(err:any) {
        const { error } = err?.response?.data || {};
        console.log('err', err);
        return { error: { message: err?.message } };
    }
}