import { isNil, omitBy } from 'lodash';

const ValidationException = (error: any) => {
    if (isNil(error)) return false;

    var { path, message, type, params } = error;
    // console.log('params', params);
    let errorMessage: string = '';
    let refPath: string | null = null;
    var subPath = '';
    var first = '';
    var last:any = '';
   
    if(path==undefined) path = message.split(' ')[0];
    if(message.includes('required') || type=='required') {
        return omitBy({ path, refPath, value: 'error.required'}, isNil);
    }else [first, ...last] = message.split(' ');

    if (path.indexOf('.')!==-1 && path != undefined) {
        subPath = path.split('.')[1];
        path[0].toUpperCase() +path.substring(1);
        errorMessage = subPath != '' ? subPath[0].toUpperCase() + subPath.substring(1):
        errorMessage +=  " " + last.join(' ') + '.';
    } 
    else if (type?.includes('email')) {
        errorMessage = 'error.email';
    }
    else if (type?.includes('matches')){
        errorMessage = 'error.pattern';
    }

    if (type=='min' || type=='max') {
        errorMessage = `error.${type}`;
        return omitBy({ path, refPath, value: errorMessage, message, type: type, [type]: params[type] }, isNil);
    }
    // console.log('path', path);
      
    // if (type?.includes('empty') || type?.includes('required')) {
    //     errorMessage = 'error.required';
    // }
    
    // else if (type?.includes('min')) {
        
    // }
    // else if (type?.includes('max')) {
    //     // errorMessage = 'error.max';
    // }
    // else if (type?.includes('length')) {
    //     errorMessage = 'error.length';
    // }
    // else {
    //     errorMessage = 'error.validationFailed';
    // }
    if (path=='phoneNumber') {
        return omitBy({ path, refPath, value: "Phone number should start with '01' and have 8 digits."}, isNil)
    }
  
    if (path=="password") {
        return omitBy({ path, refPath, value: "Password does not match"}, isNil);
    }

    if (path) {
        return omitBy({ path, refPath, value: errorMessage, message }, isNil);
    }

    return false;
}

export default ValidationException;