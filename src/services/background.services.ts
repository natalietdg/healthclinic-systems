import axios from 'axios';

export const fetchBackground = async() => {
    const file = '/assets/background.json';
    
    try {
        const response = await axios.get(file);
        return response.data.background;
    }
    catch(err: any) {
        return { error: { message: err?.message }};
    }
}