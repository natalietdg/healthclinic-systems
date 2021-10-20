
import { isNil, isUndefined, omitBy } from 'lodash';

const CommentsModel = (data: any ) => {
    console.log('data', data);
    return omitBy({
        id: data.id > -1? data.id : undefined,
        diagnosis: data.title,
        patient: data.patient,
        comment: data.comment,
        created: data.created || undefined,
        user: data.user || undefined,
        image: data.image || []
    }, (value)=> isNil(value) || undefined)
}

export default CommentsModel;