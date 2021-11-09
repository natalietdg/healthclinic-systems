
import { isNil, isUndefined, omitBy } from 'lodash';

const CommentsModel = (data: any ) => {
    
    // console.log('data', data);
    return omitBy({
        id: data.pk > -1? data.pk : undefined,
        diagnosis: data.title,
        patient: data.patient,
        comment: data.comment,
        created: data.created || undefined,
        updated: data.updated || undefined,
        user: data.user || undefined,
        image: Array.isArray(data?.image) ? data?.image.filter((img:any, index: any)=> {
            return !isUndefined(img) && img != null
        }) : !Array.isArray(data.image) && data.image!= null? [data.image] : []
    }, (value)=> isNil(value) || undefined)
}

export default CommentsModel;