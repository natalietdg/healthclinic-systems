import { isNil, omitBy } from 'lodash';

const ApiException = (error: any ) => {
    if (isNil(error)) return false;

    var { path, message, type } = error;
    let errorMessage: string = '';
    let refPath: string | null = null;
    var subpath = '';
    const [ first, ...last ] = message.split('');

    if(message.includes('401')) {
        return omitBy({ path, refPath, value: "Incorrect credentials"}, isNil);
    }
}

export default ApiException;