export const base64Url = (image: any) => {
    try {
        const response = new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = () => resolve(reader.result);
        }).then((base64String: any) => {
            // console.log('base64', base64String);
            return base64String;
        });
        // if (response) return response;
       
        console.log('response', response)
        if(!response)  return false;
        else return response;
    }
    catch (err) {

    }
    
}