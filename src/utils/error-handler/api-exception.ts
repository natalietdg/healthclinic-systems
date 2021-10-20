import { isNil, omitBy } from 'lodash';

const ApiException = (error: any ) => {
    if (isNil(error)) return false;

    var { path, message, type } = error;
    let errorMessage: string = '';
    let refPath: string | null = null;
    var subpath = '';
    const [ first, ...last ] = message.split('');

    console.log('first', first);
    console.log('last', last);

    if(message) {
        console.log('message', message);
    }

    if(message.includes('401')) {
        return omitBy({ path, refPath, value: "Incorrect credentials"}, isNil);
    }
}

export default ApiException;