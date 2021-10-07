import fetchReport from 'Components/report/fetch-report';
import React, { useEffect, useState} from 'react';
import isEmpty from 'lodash';
import { base64Url } from 'src/helpers/base64Url';
import './image-upload.scss';

interface ImageUploadProps {
    blob: any;
    name: string;
    onChangeImg: (name: any, blob: any) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ blob, name, onChangeImg }) => {
    const [ imgUrl, setImgUrl ] = useState('data:image/png;base64,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');
    
    useEffect(()=> {
        async function imageChange() {
            if (blob) {
                const response = await base64Url(blob);
                setImgUrl(response);
            }
        }
        imageChange();
        
    },[blob])

    const handleChange = async(e: any) => {
       
        //document.getElementsByTagName('img')[0].style.backgroundColor = 'rgb(0, 0, 0, 0)';
        const file = e.target.files[0];
        console.log(file);
        // console.log(file instanceof Blob); yes its a blob
        //base64string
        // const response = await base64Url(file);
        // const base64 = await fetch(response);
        // const blob = await base64.blob();
        // console.log('blobblob', blob);
        // setImgUrl(response);
        onChangeImg(name, file);
    }
    return(
        <div className="image-upload">
            <img id="upload-img" src={imgUrl} />
            <label className="image-upload--input" >
                <input hidden type="file" accept="image/png, image/jpeg" onChange={(e) => handleChange(e)}/>
                Choose File
            </label>
        </div>
    ) 
}

export default ImageUpload;