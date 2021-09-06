import axios from 'axios';

export const fetchBackground = async() => {
    const file = '/assets/background.json';
    
    try {
        const response = await axios.get(file);
        return response.data.background;
    }
    catch(err) {
        console.log(err.message);
        return { error: { message: err.message }};
    }
}