import React, { useState, useEffect } from 'react';
import { styles } from '../animation';
import Radium from 'radium';
import { toasterAtom, ToasterAtomType } from 'Recoil/toaster.atom';
import { useTranslation } from 'react-i18next';
import './toaster.scss';

type Type = 'errors' | 'success' | ''

interface ToasterProps {
    style: any;
    toasterID: any;
    props: {
        type: Type;
        message: string;
    }
    
}
        
const Toaster: React.FC<ToasterProps> = ({props, style, toasterID}) => {
    const [ toasterStyle, setToasterStyle ] = useState<any>(styles.fadeInRight);
    const [toasterProps, setToasterProps ] = useState<any>({type: '', message:''});
    const [ fadeOut, setFadeOut ] = useState<any>(false);

    const { t } = useTranslation();  

    useEffect(()=> {
        setToasterProps(props);
    },[props]);

    useEffect(()=> {
        setToasterStyle(style);
    },[style]);


    useEffect(()=> {
        if(fadeOut == true) {
            setTimeout(function () {                                         
                hideToaster();
            }, 1500);
        }
    },[fadeOut]);

    (async()=> {
        new Promise(async function (resolve, reject) {
             setTimeout( async function () {                                         
                setToasterStyle(styles.fadeOutRight);
                setFadeOut(true);
                resolve('done');
            }, 10000);
        })
        // .then( (success) => {
        //     setTimeout(function () {                                         
        //         (document.getElementById(`${toasterID}`) as HTMLElement).style.display = 'none'; 
        //     }, 3000);
        // });
    })();
    
    const hideToaster = () => {
        (document.getElementById(`${toasterID}`) as HTMLElement).style.display = 'none'; 
    }
  

    return(
        <Radium.StyleRoot>
            { toasterProps.type != '' && toasterProps.type != undefined &&
                <div id={toasterID} style={{...toasterStyle, zIndex: '997'}} className={toasterProps.type}>
                    <span className="title-row">
                        <span className="title-row--iconTitle">{
                            toasterProps.type=='errors'?
                            <img style={{filter: 'brightness(0) invert(1)'}} src="/assets/images/error.gif" />
                            :<img style={{filter: 'brightness(0) invert(1)'}} src="/assets/images/success.gif" />}
                            <p>{t(`label.${toasterProps.type}`)}</p>
                        </span>
                    <span className="title-row--button">
                    <button onClick={hideToaster}><img src="/assets/images/close.png" /></button></span></span>
                    <span>
                        {toasterProps.message}
                    </span>
                
                </div>
            }
        </Radium.StyleRoot>
    )
}
  
export default Toaster;