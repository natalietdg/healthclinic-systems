
import { isNil, isUndefined, omitBy } from 'lodash';

const CommentsResponse = (data: any ) => {
    console.log('data', data);
    return omitBy({
        id: data.id > -1? data.id : undefined,
        title: data.diagnosis,
        comment: data.comment,
        patient: data.patient || undefined,
        user: data.user || undefined,
        image: data.image || undefined,
    }, (value)=> isNil(value) || undefined)
}

export default CommentsResponse;