import { isNil, isUndefined, omitBy } from 'lodash';

const PatientModel = (data:any) => {
    // console.log('data', data);
    console.log('data', data);
    const id = data.id? data.id:(data.url.split('s')[1]).split('/')[1];
    // console.log('data.ic', data.ic);
    // console.log('data, array', typeof(data.comments));
    // console.log('data, comments', data.comments);
   
    return omitBy({
        dateOfBirth: data.dob,
        race: data.race,
        reportID: data.report_id,
        patientID: id,
        profilePicBlob: data?.image,
        email: data.email,
        ic: data.ic,
        phoneNumber: data.phone,
        // height: data.height? data.height: '',
        // weight: data.weight? data.weight: '',
        fullName: data.name,
        gender: data.gender,
        comments: data.comments? data.comments.map((comment: any)=> {
            return omitBy({
                id: comment.pk > -1? comment.pk : undefined,
                diagnosis: comment.title,
                patient: comment.patient,
                comment: comment.comment,
                created: comment.created || undefined,
                updated: comment.updated || undefined,
                user: comment.user || undefined,
                image: Array.isArray(comment?.image) ? comment?.image.filter((img:any, index: any)=> {
                    return !isUndefined(img) && img != null
                }) : !Array.isArray(comment.image) && comment.image!= null? [comment.image] : []
            }, (value)=> isNil(value) || undefined)
        }): [],
        obesityPredictionReports: data.mlrequests? (data.mlrequests.filter((mlrequest: any)=> {
            return mlrequest.response!='error';
        })).map((mlrequest: any) => {
            console.log('mlrequest', mlrequest);
            return omitBy({
                id: mlrequest.id,
                patientID: mlrequest.patient,
                fullResponse: JSON.parse(mlrequest.full_response.replace(/'/g, "\"")),
                response: mlrequest.response,
                feedback: mlrequest.feedback,
                created: mlrequest.created_at
        
            }, (value) => isNil(value) || isUndefined(value));
        }): [],
        // healthHistory: data?.healthHistory || {},
        // familyHistory: data?.familyHistory || {},
        lifestyleInformation: data?.lifestyleInformation || {},
        diagnosisPicBlobArray: data?.comments?.image || [],
        reasonForConsultation: data?.reasonForConsultation || '',
    }, (value) => isNil(value) || isUndefined(value));
}

export default PatientModel;
