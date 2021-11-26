import { isNil, isUndefined, omitBy } from 'lodash';

const PatientModel = (data:any) => {
    const lastIndex = data.url? data.url.split('/'): -1;
    const id = data.id? data.id:lastIndex[lastIndex.length-2];
   
    return omitBy({
        dateOfBirth: data.dob,
        race: data.race,
        reportID: data.report_id,
        patientID: id,
        profilePicBlob: data?.image,
        email: data.email,
        ic: data.ic,
        phoneNumber: data.phone,
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
            return omitBy({
                id: mlrequest.id,
                patientID: mlrequest.patient,
                fullResponse: JSON.parse(mlrequest.full_response.replace(/'/g, "\"")),
                response: mlrequest.response,
                feedback: mlrequest.feedback,
                created: mlrequest.created_at
        
            }, (value) => isNil(value) || isUndefined(value));
        }): [],
        lifestyleInformation: data?.lifestyleInformation || {},
        diagnosisPicBlobArray: data?.comments?.image || [],
        reasonForConsultation: data?.reasonForConsultation || '',
    }, (value) => isNil(value) || isUndefined(value));
}

export default PatientModel;
