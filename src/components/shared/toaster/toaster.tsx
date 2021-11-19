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
    const { t } = useTranslation();  
    
    useEffect(() => {
        setToasterProps({type: '', message:''});
        setToasterStyle({});
    },[])

    const showToaster = () => {
        const toaster =  (document.getElementById(`${toasterID}`) as HTMLElement);
        if (toaster) {
            toaster.style.display='block';
            setToasterStyle(styles.fadeInRight);
            new Promise(async function (resolve, reject) {
                setTimeout( async function () {                                         
                   setToasterStyle(styles.fadeOutRight);
                   resolve('done');
               }, 10000);
           })
           .then( (success) => {
               setTimeout(function () { 
                    toaster.style.display = 'none'; 
               }, 1500);
           });
        }
    }

    useEffect(()=> {
        setToasterProps(props);  
    },[props]);

    useEffect(()=> {
       
        if(toasterProps.type!='') {
            showToaster();
        }
    },[toasterProps]);
    
    const hideToaster = () => {
        const toaster =  (document.getElementById(`${toasterID}`) as HTMLElement)
        if (toaster) toaster.style.display = 'none'; 
    }
  

    return(
        <Radium.StyleRoot>
            { toasterProps.type != '' && toasterProps.type != undefined &&
                <div id={toasterID} style={{...toasterStyle, zIndex: '997'}} className={toasterProps.type}>
                    <span className="title-row">
                        <span className="title-row--iconTitle">{
                            toasterProps.type=='errors'?
                            <img className="toaster-img" style={{filter: 'brightness(0) invert(1)'}} src="/assets/images/error.gif" />
                            :<img className="toaster-img" style={{filter: 'brightness(0) invert(1)'}} src="/assets/images/success.gif" />}
                            <p>{t(`label.${toasterProps.type}`)}</p>
                        </span>
                    <span className="title-row--button">
                    <button onClick={hideToaster}><img className="toaster-img" src="/assets/images/close.png" /></button></span></span>
                    <span>
                        {toasterProps.message}
                    </span>
                
                </div>
            }
        </Radium.StyleRoot>
    )
}
  
export default Toaster;