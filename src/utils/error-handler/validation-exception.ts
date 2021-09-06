import { isNil, omitBy } from 'lodash';

const ValidationException = (error: any) => {
    if (isNil(error)) return false;

    const { path, message, type } = error;
    let errorMessage: string = '';
    let refPath: string | null = null;

    if (type?.includes('empty') || type?.includes('required')) {
        errorMessage = 'error.required';
    }
    else if (type?.includes('matches') || type?.includes('email')) {
        errorMessage = 'error.pattern';
    }
    else if (type?.includes('min')) {
        errorMessage = 'error.min';
    }
    else if (type?.includes('max')) {
        errorMessage = 'error.max';
    }
    else if (type?.includes('length')) {
        errorMessage = 'error.length';
    }
    else {
        errorMessage = 'error.validationFailed';
    }

    if (path) {
        return omitBy({ path, refPath, value: errorMessage, message }, isNil);
    }

    return false;
}

export default ValidationException;