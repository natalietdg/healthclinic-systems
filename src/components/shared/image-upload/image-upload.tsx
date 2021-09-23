import React, { useEffect, useState} from 'react';
import { base64Url } from 'src/helpers/base64Url';
import './image-upload.scss';

interface ImageUploadProps {
    baseUrl: string;
    name: string;
    onChangeImg: (name: any, value: any) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ baseUrl, name, onChangeImg }) => {
    const [ imgUrl, setImgUrl ] = useState('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAABmJLR0QA/wD/AP+gvaeTAAAEI0lEQVR4nO3cTahVVRjG8f+bFhmYfWgEkWVfWlkURINMEEvtGwrEskFBw3LWJJo0bxSFSDS1SZNACCyKQg1Jgsi83jQxiwZFlFkUhfpvsI9hF+657X3vedfpnPWDyx3oOs9eD/suzj577QNVVVVVVVVVVVVDKkofQD/qdcAGYBWwArgKWNj75xPAN8AksBvYGRFHShzn/5I6X31S/dj29qib1Xml5zHU1PvUQx0KnmpSXV96PkNHvUB9Yw4Knup1dUHp+Q0F9TL10wGUfMY+dUnpeRbVK3lygCWfMTm2ZdssF4M8k6fap55fet7pHMyaPJNtpeedSl1foOQz7i8x5/QLFnU+MAFcn53dMwmsjIhTmaHnZIb1PE65kqG5wtyYHVqi6GcLZE71XHZg6tJh89nF4czMaQhcGxFHswKzz+gNyXnTCSD1Ej276FXJef2szgzLLvrG5Lx+VmSGZRd9ZXJeP0szw7KLXjjzf0lzYWZY9rsOM/NmEhFp8y/xPnos1aKTZBf9V3JeP39mhmUX/WtyXj8nMsOyi/42Oa+fbzLDsoueSM7r52BmWHbRe5Lz+tmdGZZd9E6aT85Kk+ZY0qQW3duytTczcxp7IuLrzMAS76NfK5A51avZgSXuGc4DDgDLs7N7JoBbR/6eYW+CW7Jzz7Ilu+SibPbFZdtaet7p1AU2u4ey7HUcdyoBqEvM2Xt3UF1cer5F9cr+ZIAl73VcNzhOZbOMbBtAyVsd1+WiH/Vemz/z2Tqgri09n6GmzlOfUHerp1uUe1rdpW5Sh+6GxrA/lbWMZqPLapqtClOfyjpGs2lxF81TWamX1VVVVVVVVVVVVSNh6K4M1UXATcBK4GbgBuAS4CJgUe83wPGzfn4GvqS5RfYFMBERqTuRZlK8aPVyYC1wD7AGuGaOXvoI8CHwPvBBRHw/R6/bSZGi1duAzcADNGftwCNpzvR3gDcj4vOEzH9JK1pdCjwKPAXcnpU7jQngLWB7RAzD43izp96t7mj5kWeW0+p76sNq8WW0NfU89Rl1f8kWW/pMfVo9t3R//4nN2XG4bGezckjd6LCe4eqdNndFRsVH6h2le/2HzdenvaSeLNvLQJxSX3EOlpNZ/XmoVwPbgbtmeyBDbh+wOSK+6voCnYtW1wBv01ytjYPjwCMRsavL4E5Fq6uBd4Fx2zPxB7AuIlo/udC6aJutVZPApW3HjogfgeUR8VObQV32P7zI+JYMsBh4oe2gLkU/1GHMqHmw7YAuS8fvwLh/3+dvEdHqmxq6nNE/dBgzalp/5Nql6B0dxoya1h10WTquAPYDF7cdOyJ+AW6JiFaPW7c+oyPiO2ATyQ+tD4njwGNtS4bZXRkuA54H1gHLgPldX2vInQSO0lygvRwRxwofT1VVVVVVVVVVVVVVVXF/A2DwVjdNViZYAAAAAElFTkSuQmCC');
    useEffect(()=> {
        if (baseUrl != '') {
            setImgUrl(baseUrl);
        }
    },[baseUrl])

    const handleChange = async(e: any) => {
        document.getElementById('upload-img').style.background = 'rgb(0, 0, 0, 0)'
        //document.getElementsByTagName('img')[0].style.backgroundColor = 'rgb(0, 0, 0, 0)';
        const file = e.target.files[0];
        // console.log(file instanceof Blob); yes its a blob
        const response = await base64Url(file);
        onChangeImg(name, response);
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