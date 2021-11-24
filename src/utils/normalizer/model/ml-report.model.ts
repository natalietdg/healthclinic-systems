import { isNil, isUndefined, omitBy } from 'lodash';

const MLReportModel = (data: any ) => {
    return omitBy({
        id: data.id,
        patientID: data.patient,
        inputData: data.input_data,
        fullResponse: data.full_response,
        response: data.response,
        feedback: data.feedback,
        created: data.created_at

    }, (value) => isNil(value) || isUndefined(value))
}

export default MLReportModel;