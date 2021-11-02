
import { isNil, isUndefined, omitBy, isEmpty } from 'lodash';

const CommentsResponse = (data: any ) => {
    console.log('data', data);
    return omitBy({
        pk: data.id > -1? data.id : undefined,
        title: data.diagnosis,
        comment: data.comment,
        user: data.user || undefined,
        image:  Array.isArray(data.image) && data.image[0] != null && !isUndefined(data.image[0])? data?.image.filter((img:any, index: any)=> {
            return !isUndefined(img) && img != null
        }) : !Array.isArray(data.image) && data.image!= null && !isUndefined(data.image)? [data.image] : undefined
    }, (value)=> isNil(value) || isUndefined(value) || value==[])
}

export default CommentsResponse;