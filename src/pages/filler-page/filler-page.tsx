import React, { useEffect, useState } from 'react';
import { fetchBackground } from 'Services/background.services';
import { useHistory } from 'react-router-dom';

interface FillerPageProps {
    message: string;
    link: string;
}

const FillerPage: React.FC<FillerPageProps> = ({message, link}) => {
    var history = useHistory();
    const [ bg, setBg ] = useState<any>({});

    const getBackground = async() => {
        const response = await fetchBackground();
        setBg(response);
    }

    function popupAlert() {
        
        const response:any = alert(message);

        if(response==true) {
            
        }
        else {

        }
    }

    useEffect(()=> {
      
        getBackground();
        popupAlert();

    },[])

    return (
        <div>

        </div>
    )
}

export default FillerPage;