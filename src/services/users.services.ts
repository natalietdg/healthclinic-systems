import axios from 'axios';

export const fetchUsers = async(data: any) => {
    const url = process.env.PUBLIC_PATH;
    const port = process.env.PORT;

    try {
        const response = await axios({
            method: 'GET',
            url: `http://${url}:${port}/users`
        })
    }
    catch(err) {

    }
}