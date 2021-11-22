import _, {omit, omitBy, isEmpty, isUndefined} from 'lodash';
import axios from 'axios';
import normalizer from 'Utils/normalizer';
import { isEmptyBindingElement } from 'typescript';

export const uploadImage = async(data: any)=> {
    const url = process.env.PUBLIC_PATH;

    const formData = new FormData();
    formData.append('image', data);
    formData.append('name', data.name);
    try {
        const response = await axios({
            method:'POST',
            url: `${url}/images/`,
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data; boundary=--------------------------907931495521859766893792"
            },
            responseType: 'json'
        });
        return response.data;

    }
    catch(err:any) {

    }
}

export const savePatientInformation = async(data:any) => {
    const url = process.env.PUBLIC_PATH;
    
    const accessToken = localStorage.getItem('accessToken');

    var normalizedData = normalizer.response.patient(data);
    
    var dataWithoutProfilePic: any = null;
    
    if(normalizedData.image instanceof Blob) {
        let tempData = normalizedData;
        normalizedData = _.omit(normalizedData, ['image']);
        dataWithoutProfilePic =  new FormData();
        dataWithoutProfilePic.append('image', tempData.image);
    }
    else {
        normalizedData = _.omit(normalizedData, ['image']);
    }

    try {
        var response = await axios({
            method: 'PUT',
            url: `${url}/patients/${data.patientID}/`,
            responseType: 'json',
            data: normalizedData,
            headers: {
                'Authorization': `Bearer ${accessToken}`        
            },
        });

        if (dataWithoutProfilePic) {
            response = await axios({
                method: 'PUT',
                url: `${url}/patients/${data.patientID}/`,
                data: dataWithoutProfilePic,
                headers: {
                    'Authorization': `Bearer ${accessToken}`        
                },
            });
        }

        return normalizer.model.patient(response.data);
    }
    catch(err:any) {
        return { error: { message: err?.message } };
    }
}

export const createPatient = async(data:any) => {
    const url = process.env.PUBLIC_PATH;
    
    const accessToken = localStorage.getItem('accessToken');
    
    var normalizedData = normalizer.response.patient(data);
    
    var dataWithoutProfilePic: any = null;

    if(normalizedData.image instanceof Blob) {
        let tempData = normalizedData;
        normalizedData = _.omit(normalizedData, ['image']);
        dataWithoutProfilePic =  new FormData();
        dataWithoutProfilePic.append('image', tempData.image);
    }
    else {
        normalizedData = _.omit(normalizedData, ['image']);
    }

    try {
        var response = await axios({
            method: 'POST',
            url: `${url}/patients/`,
            responseType: 'json',
            data: normalizedData,
            headers: {
                'Authorization': `Bearer ${accessToken}`        
            },
        });
        var responseData = normalizer.model.patient(response.data);

        if (dataWithoutProfilePic) {
            response = await axios({
                method: 'PUT',
                url: `${url}/patients/${responseData.patientID}/`,
                data: dataWithoutProfilePic,
                headers: {
                    'Authorization': `Bearer ${accessToken}`        
                },
            });
        }

        return normalizer.model.patient(response.data);
    }
    catch(err:any) {
        return { error: { message: err?.message } };
    }
}

export const updatePatientInformation = async(data: any) => {
    const url = process.env.PUBLIC_PATH;
    

    try {
        const response = await axios({
            method: 'PUT',
            url: `${url}/patients/${data}`

        });

        return response.data;
    }
    catch(err:any) {
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

        return response.data;
    }
    catch(err:any) {
        return { error: { message: err?.message } };
    }
}

export const fetchComments = async(patientID: any) => {
    const url = process.env.PUBLIC_PATH;
    
    const accessToken = localStorage.getItem('accessToken');
    try {
        const response = await axios({
            method:'GET',
            url: `${url}/patients/${parseInt(patientID)}/comments/`,
            responseType: 'json',
            headers: {
                'Authorization': `Bearer ${accessToken}`        
            },
        });

        const patientComments = response.data.map((comment: any)=> {
            return normalizer.model.comment(comment);
        });
       
        return patientComments;
    }
    catch(err:any) {
        return { error: { message: err?.message } };
    }
}

export const createComments = async(data: any) => {
    const url = process.env.PUBLIC_PATH;
    
    const patientID = data.patientID;
    const accessToken = localStorage.getItem('accessToken');

    data = normalizer.response.comment(data);
    var formData = new FormData();
    formData.append('title', data.title);
    formData.append('comment', data.comment);
    formData.append('user', data.user);
   
    if(data.image) {
      data.image.map((image: any, index:any)=> {
            formData.append('image', image, image.name);
        });
    }
    

    try {
        const response = await axios({
            method:'POST',
            url: `${url}/patients/${patientID}/comments/`,
            headers: {
                "Content-Type": "multipart/form-data; boundary=--------------------------907931495521859766893792",
                'Authorization': `Bearer ${accessToken}`        
            },
            responseType: 'json',
            data: formData
        });
        return response.data;
    }
    catch(err:any) {
        const { error } = err?.response?.data || {};
        return { error: { message: err?.message } };
    }
}

export const editComments = async(data: any) => {
    const url = process.env.PUBLIC_PATH;
    
    const accessToken = localStorage.getItem('accessToken');
  
    data = normalizer.response.comment(data);
    let commentID = data.pk;
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
            url: `${url}/comments/${commentID}/`,
            responseType: 'json',
            data: formData,
            headers: {
                'Authorization': `Bearer ${accessToken}`        
            },
        });
        return response.data;
    }
    catch(err:any) {
        return { error: { message: err?.message } };
    }
}


export const fetchPatientInformation = async(patientID: any) => {
    const url = process.env.PUBLIC_PATH;
    
    const accessToken = localStorage.getItem('accessToken');
    try{
        const response = await axios({
            method: 'GET',
            url: `${url}/patients/${parseInt(patientID)}/`,
            responseType: 'json',
            headers: {
                'Authorization': `Bearer ${accessToken}`        
            },
           
        });

        var patientData = normalizer.model.patient(response.data);
        return patientData;
    }
    catch(err:any) {
        const { error } = err?.response?.data || {};
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
            headers: {
                'Authorization': `Bearer ${accessToken}`        
            },
        })
        return response.data;
    }
    catch(err:any) {
        return { error: { message: err?.message } };
    }
}

export const fetchPatientList = async() => {
    const url = process.env.PUBLIC_PATH;
    
    const accessToken = localStorage.getItem('accessToken');

    try{
        const response = await axios({
            method: 'GET',
            url: `${url}/patients/`,
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
        return patientsData;
    }
    catch(err:any) {
        return { error: { message: err?.message } };
    }
}

export const fetchReport = async(reportID: string) => {
    const url = process.env.PUBLIC_PATH;
    
    const accessToken = localStorage.getItem('accessToken');
    const accessTokenExpiry = localStorage.getItem('accessTokenExpiry');
    //url: http://127.0.0.1:8000/patients/?expand=report_id/34uLYKmnJ94B9UAx89NLtE/
    try{
        const response = await axios({
            method: 'GET',
            url: `${url}/patienthealthrecords/?search=${reportID}`,
            responseType: 'json',
        });

        var patientReport = normalizer.model.patient(response.data[0]);

            patientReport.obesityPredictionReports = await Promise.all(patientReport.obesityPredictionReports.map(async(report: any)=> {
                var response:any = '';
                var inputData: any = {}; 
                if (accessToken && accessTokenExpiry && parseInt(accessTokenExpiry) > Math.trunc(new Date().getTime() /1000)) {
                    response = await fetchObesityPredictionReport(report.id);
                    inputData = normalizer.model.obesityPrediction(JSON.parse(response.data.input_data));
                }
                let probability = (report.fullResponse.probability.split(/\n/g)).slice(1, 5);
                
                probability = probability.reduce(function(prob: any, curr: any) {
                    curr = curr.replace(/                /, "");
                    let name = curr.split(' is ')[0];
                    let prediction = parseInt((curr.split(' is ')[1]).split('%')[0]);
                    prob[name] = prediction;
                    return prob;
                }, {});
                let tempReport:any = omitBy({
                    ...report,
                    inputData: inputData,
                    fullResponse: {
                        ...report.fullResponse,
                        probability: probability
                    },
                }, (value) => isEmpty(value));
                tempReport.feedback =report.feedback;
                tempReport.id = report.id;
                return tempReport;
            }));
       
        return patientReport;

    }
    catch(err:any) {
        const { error } = err?.response?.data || {};
        return { error: { message: err?.message } };
    }
}

export const generateObesityPrediction = async(data: any) => {
    try {
        const url = process.env.PUBLIC_PATH;
        
        const accessToken = localStorage.getItem('accessToken');

        const normalizedData = normalizer.response.obesityPrediction(data);

        const response:any = await axios({
            method: 'POST',
            responseType: 'json',
            url: `${url}/obesity/v1/comorbidities_classifier/predict`,
            data: normalizedData,
           
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'     
            },
        });

        return response?.data;
    }
    catch(err:any) {
        return { error: { message: err?.message } };
    }
}

export const setPatientandFeedbackMLRequest = async(data: any) => {
    const url = process.env.PUBLIC_PATH;
    
    const accessToken = localStorage.getItem('accessToken');
    let tempData = omitBy({
        patient: data.patientID? data.patientID: undefined,
        feedback: data.feedback? data.feedback : undefined
    }, (value) => isUndefined(value));
    try {
        const response = await axios({
            method: 'PUT',
            url: `${url}/obesity/v1/mlrequests/${data.reportID}`,
            data: tempData,
            responseType: 'json',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        return response;
    }
    catch(err: any) {
        return { error: { message: err?.message } };
    }
}

export const fetchAllObesityPredictionReport = async(patientID: any) => {
    const url = process.env.PUBLIC_PATH;
    
    const accessToken = localStorage.getItem('accessToken');

    try {
        const response = await axios({
            method: 'GET',
            url: `${url}/obesity/v1/mlrequests`,
            responseType: 'json',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
        .then((response) => { 
            return response.data.filter((MLReport: any, index: any)=> {
        
                return MLReport.patient==patientID && MLReport.response != 'error'
                })
            }).then( (MLReports)=> {
                const parsedReports = MLReports.map((report: any) => {
                    let input_data = JSON.parse(report.input_data);
                    let full_response = JSON.parse(report.full_response.replace(/'/g, "\""));
                    let probability = (full_response.probability.split(/\n/g)).slice(1, 4);
                    probability = probability.map((prob: any) => {
                        return prob.replace(/                /, "");
                    })
                    full_response.probability = probability;
                    const tempParsedReport = normalizer.model.mlReport({
                        ...report,
                        input_data: input_data,
                        full_response: full_response
                    });

                    return tempParsedReport;
                });
                return parsedReports;
            });

        return response;
    }
    catch (err: any) {
        return { error: { message: err?.message } };
    }
}

export const fetchObesityPredictionReport = async(reportID: any) => {
    const url = process.env.PUBLIC_PATH;
    
    const accessToken = localStorage.getItem('accessToken');

    try {
        const response = await axios({
            method: 'GET',
            url: `${url}/obesity/v1/mlrequests/${reportID}`,
            responseType: 'json',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        return response;
    }
    catch (err: any) {
        const { error } = err?.response?.data || {};
        return { error: { message: err?.message } };
    }
}