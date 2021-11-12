import _, {omit, omitBy, isEmpty, isUndefined} from 'lodash';
import axios from 'axios';
import normalizer from 'Utils/normalizer';
import { isEmptyBindingElement } from 'typescript';

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
        return response.data;

    }
    catch(err:any) {

    }
}

export const savePatientInformation = async(data:any) => {
    console.log('data', data);
    const url = process.env.PUBLIC_PATH;
    const port = process.env.PORT;
    const accessToken = localStorage.getItem('accessToken');

    var normalizedData = normalizer.response.patient(data);
    
    var dataWithoutProfilePic = new FormData();

    
    if(normalizedData.image instanceof Blob) {
        let tempData = normalizedData;
        normalizedData = _.omit(normalizedData, ['image']);
        console.log('dataWithoutProfilePic', dataWithoutProfilePic);
        console.log('normalizedData', normalizedData);

        dataWithoutProfilePic.append('image', tempData.image);
    }
    else {
        normalizedData = _.omit(normalizedData, ['image']);
    }
 
    // if(normalizedData.image instanceof Blob) {
    //     var tempImage = new FormData();
    //     tempImage.append('image', normalizedData.image);
    //     normalizedData.image = tempImage;
    // }

    try {
        var response = await axios({
            method: 'PUT',
            url: `http://${url}:${port}/patients/${data.patientID}/`,
            responseType: 'json',
            data: normalizedData,
            headers: {
                'Authorization': `Bearer ${accessToken}`        
            },
        })
        console.log('response', response);
        if (dataWithoutProfilePic) {
            response = await axios({
                method: 'PUT',
                url: `http://${url}:${port}/patients/${data.patientID}/`,
                data: dataWithoutProfilePic,
                headers: {
                    'Authorization': `Bearer ${accessToken}`        
                },
            });
            
            console.log('response', response);
        }

        return normalizer.model.patient(response.data);
    }
    catch(err:any) {
        const { error }:any = err?.response?.data || {};
        return { error: { message: err?.message } };
    }
}

export const createPatient = async(data:any) => {
    const url = process.env.PUBLIC_PATH;
    const port = process.env.PORT;
    const accessToken = localStorage.getItem('accessToken');

    try {
        const response = await axios({
            method: 'POST',
            url: `http://${url}:${port}/patients/`,
            responseType: 'json',
            data: normalizer.response.patient(data),
            headers: {
                'Authorization': `Bearer ${accessToken}`        
            },
        });

        return normalizer.model.patient(response.data);
    }
    catch(err:any) {
        const { error }:any = err?.response?.data || {};
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
        return { error: { message: err?.message } };
    }
}

export const fetchComments = async(patientID: any) => {
    const url = process.env.PUBLIC_PATH;
    const port = process.env.PORT;
    const accessToken = localStorage.getItem('accessToken');
    // console.log('patientID', patientID);
    try {
        const response = await axios({
            method:'GET',
            url: `http://${url}:${port}/patients/${parseInt(patientID)}/comments/`,
            responseType: 'json',
            headers: {
                'Authorization': `Bearer ${accessToken}`        
            },
        });
        // console.log('response', response);

        const patientComments = response.data.map((comment: any)=> {
            return normalizer.model.comment(comment);
        })
        // console.log('patientsCommenst', patientComments);
       
        return patientComments;
    }
    catch(err:any) {
        const { error } = err?.response?.data || {};
        return { error: { message: err?.message } };
    }
}

export const createComments = async(data: any) => {
    const url = process.env.PUBLIC_PATH;
    const port = process.env.PORT;
    const patientID = data.patientID;
    const accessToken = localStorage.getItem('accessToken');
    // const uploadImageResponse = await Promise.all(data.image.map(async (image: any)=> {
    //     const response:any = await uploadImage(image);
    //     console.log('response', response);
    //     return response;
    // }));

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
   
    // data.image = images;
    

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
        return response.data;
    }
    catch(err:any) {
        const { error } = err?.response?.data || {};
        return { error: { message: err?.message } };
    }
}

export const editComments = async(data: any) => {
    const url = process.env.PUBLIC_PATH;
    const port = process.env.PORT;
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
            url: `http://${url}:${port}/comments/${commentID}/`,
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
    const port = process.env.PORT;
    const accessToken = localStorage.getItem('accessToken');
    try{
        const response = await axios({
            method: 'GET',
            url: `http://${url}:${port}/patients/${parseInt(patientID)}/`,
            responseType: 'json',
            headers: {
                'Authorization': `Bearer ${accessToken}`        
            },
           
        });

        // let tempImage = response.data.image;
        // let patientProfilePic = tempImage != null ? await fetchImage(tempImage): null;
        var patientData = normalizer.model.patient(response.data);
        // var comments = await fetchComments(patientID);
        // console.log('comments', comments);
        // if(comments) patientData.comments = comments;
        // if(patientProfilePic) patientData.profilePicBlob = patientProfilePic;
        // const patientsData = response.data.map(async (patient: any)=> {
        //     patient.image = await fetchPatientProfilePic(patient.image[0])
        // })
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
            // headers: {
            //     'Authorization': 'Bearer realm="api"'
            // }
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
        return { error: { message: err?.message } };
    }
}

export const fetchReport = async(reportID: string) => {
    const url = process.env.PUBLIC_PATH;
    const port = process.env.PORT;
    const accessToken = localStorage.getItem('accessToken');
    const accessTokenExpiry = localStorage.getItem('accessTokenExpiry');
    //url: http://127.0.0.1:8000/patients/?expand=report_id/34uLYKmnJ94B9UAx89NLtE/
    try{
        const response = await axios({
            method: 'GET',
            url: `http://${url}:${port}/patienthealthrecords/?search=${reportID}`,
            responseType: 'json',
            // headers: {
            //     'Authorization': `Bearer ${accessToken}`        
            // },
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
                    // console.log('prob', prob);
                    // console.log('curr', curr);
                    curr = curr.replace(/                /, "");
                    let name = curr.split(' is ')[0];
                    let prediction = parseInt((curr.split(' is ')[1]).split('%')[0]);
                    prob[name] = prediction;
                    //  console.log('prob', prob);
                    return prob;
                }, {});
                // console.log('probability', probability);
                // console.log('inputData', inputData);
                // console.log('report', report);
                // console.log('report.id', report.id);
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
       
        // console.log('patientReport', patientReport);
        return patientReport;
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
       
        // console.log('response.data', response);
        // const patientsData = response.data.map(async (patient: any)=> {
        //     patient.image = await fetchPatientProfilePic(patient.image[0])
        // })
        // return response;
    }
    catch(err:any) {
        const { error } = err?.response?.data || {};
        return { error: { message: err?.message } };
    }
}

export const generateObesityPrediction = async(data: any) => {
    try {
        const url = process.env.PUBLIC_PATH;
        const port = process.env.PORT;
        const accessToken = localStorage.getItem('accessToken');

        const normalizedData = normalizer.response.obesityPrediction(data);

        const response:any = await axios({
            method: 'POST',
            responseType: 'json',
            url: `http://${url}:${port}/obesity/v1/comorbidities_classifier/predict`,
            data: normalizedData,
            // data: { 
            //     '4-citrus' : 'No',
            //     '5-fruit' : 'Yes',
            //     'active-scale' : 9,//8,//7,//6,//5,//4, //2,//1, //3,
            //     'alcohol-freq' : '3 or more drinks per day', 
            //     'bbq' : 'No',
            //     'bmi' : 400,//300,//200, //101//100, 
            //     'computer-hours' : "More than 6 hours", 
            //     'cruciferous-vege' : "No", 
            //     'dairy' : "Never or once per month", 
            //     'desserts' : "4-6 times per week",
            //     'dietary-plan' : "Yes", 
            //     'egg' : "2-4 eggs per week",
            //     'ergo-workspace' : "Yes", 
            //     'exercise-programme' : "Yes", 
            //     'family-history' : 'NO CONDITIONS', //'Congenital Heart Disease', 
            //     'fried-food' : "5-6 times per week",
            //     'fruits' : "3-4 servings per day",
            //     'gender' : 'Female', 
            //     'grain-bean' : "3-4 servings per day",
            //     'less-2-dairy-day' : 'No', 
            //     'less-3-mamak-nasilemak-percik-week' : 'No', 
            //     'less-5-orange-yellow-fruit-vege' : 'No', 
            //     'meat-freq' : "Less than two times per month",
            //     'meat-over-fried' : 'No', 
            //     'milk-tea-coffee-lowfat' : "0-1 time per week",
            //     'more-3-coffee' : 'Yes', 
            //     'nitrate-salt-meat' : 'No', 
            //     'personal-trainer' : 'Yes', 
            //     'processed-food' : "Once per week or less", 
            //     'race' : 'Chinese', 
            //     'seated-hours' : "Less than 4 hours", 
            //     'sleep' : "More than 10 hours", 
            //     "smoked-meat-fish" : "No",
            //     'smoke-freq' : 'NON SMOKER',  
            //     'snacks' : "2-3 more times per week",
            //     'soda-candy' : "0-1 times per week",
            //     'stress' : 'Yes', 
            //     'vegetable' : "5 or more servings per day",
            //     'vegetarian' : "Yes", 
            //     'occupation' : 8//7//6,//5//4//3, //1, 2
            // },
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'     
            },
        });
        // console.log('response', response.data);

        return response?.data;
    }
    catch(err:any) {
        const { error } = err?.response?.data || {};
        return { error: { message: err?.message } };
    }
}

export const setPatientandFeedbackMLRequest = async(data: any) => {
    const url = process.env.PUBLIC_PATH;
    const port = process.env.PORT;
    const accessToken = localStorage.getItem('accessToken');
    let tempData = omitBy({
        patient: data.patientID? data.patientID: undefined,
        feedback: data.feedback? data.feedback : undefined
    }, (value) => isUndefined(value));
    try {
        const response = await axios({
            method: 'PUT',
            url: `http://${url}:${port}/obesity/v1/mlrequests/${data.reportID}`,
            data: tempData,
            responseType: 'json',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        return response;
    }
    catch(err: any) {
        const { error }:any = err?.response?.data || {};
        return { error: { message: err?.message } };
    }
}

export const fetchAllObesityPredictionReport = async(patientID: any) => {
    const url = process.env.PUBLIC_PATH;
    const port = process.env.PORT;
    const accessToken = localStorage.getItem('accessToken');
    const self = this;
    var patient = patientID;
    try {
        const response = await axios({
            method: 'GET',
            url: `http://${url}:${port}/obesity/v1/mlrequests`,
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
        const { error } = err?.response?.data || {};
        return { error: { message: err?.message } };
    }
}

export const fetchObesityPredictionReport = async(reportID: any) => {
    const url = process.env.PUBLIC_PATH;
    const port = process.env.PORT;
    const accessToken = localStorage.getItem('accessToken');

    try {
        const response = await axios({
            method: 'GET',
            url: `http://${url}:${port}/obesity/v1/mlrequests/${reportID}`,
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