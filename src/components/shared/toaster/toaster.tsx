import React, { useState, useEffect } from 'react';
import { styles } from '../animation';
import Radium from 'radium';
import { toasterAtom, ToasterAtomType } from 'Recoil/toaster.atom';
import { useTranslation } from 'react-i18next';
import './toaster.scss';
import { ProgressPlugin } from 'webpack';

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
            // (document.getElementById(toasterID) as HTMLElement).style.display = 'none'; 
            // hideToaster();
            setTimeout(function () {                                         
                hideToaster();
            }, 2000);
        }
    },[fadeOut]);

    (async()=> {
        new Promise(async function (resolve, reject) {
            // (document.getElementById('toasterArea') as HTMLElement).appendChild(document.getElementById(toasterID) as HTMLElement);
            // (document.getElementById(`${toasterID}`) as HTMLElement).style.display = 'flex'; 
             setTimeout( async function () {                                         
                console.log('styles.fadeOutRight', styles.fadeOutRight);
                console.log('(document.getElementById(toasterID) as HTMLElement)', (document.getElementById(`${toasterID}`) as HTMLElement));
                // (document.getElementById(toasterID) as HTMLElement).style.animation = styles.fadeOutRight.animation;
                // (document.getElementById(toasterID) as HTMLElement).style.animationName = styles.fadeOutRight.animationName;
                console.log(document.getElementById(`${toasterID}`) as HTMLElement);
                setToasterStyle(styles.fadeOutRight);
                setFadeOut(true);
                resolve('done');
            }, 8000);
           
            // resolve("done");
        })
        .then( (success) => {
            console.log('success', success);
            console.log('done');
            setTimeout(function () {                                         
                (document.getElementById(`${toasterID}`) as HTMLElement).style.display = 'none'; 
            }, 3000);
            
            console.log('done2');
        });
    })();
    
    const hideToaster = () => {
        (document.getElementById(`${toasterID}`) as HTMLElement).style.display = 'none'; 
    }
  

    return(
        <Radium.StyleRoot>
            { toasterProps.type != '' &&
                <div id={toasterID} style={{...toasterStyle}} className={toasterProps.type}>
                    <span><img src="" /><h4>{t(`label.${toasterProps.type}`)}</h4><button onClick={hideToaster}>x</button></span>
                    <span>
                        {toasterProps.message}
                    </span>
                
                </div>
            }
        </Radium.StyleRoot>
    )
}
  
export default Toaster;

// : React.FC<ToasterProps>
// useEffect(()=> {
//     if(props.type != '' && props.message != '') {
//         if()
//         setToastList([...toastList, props]);
//     }
    
// },[props])



// const ToasterComponent: React.FC<ToasterProps> = ({props, style}) => {
//     const { t } = useTranslation();     
//     const [ toasterProps, setToasterProps ] = useState<any>({
//         type: '',
//         message: ''
//     });
    
// }
    // useEffect(()=> {
    //     showToaster();
    // }, [toastList]);

    

    // const hideToaster = () => {
    //     console.log('end');
    //     (document.getElementById('toaster') as HTMLElement).style.animation = styles.fadeOutRight.animation;
    //     (document.getElementById('toaster') as HTMLElement).style.animationName = styles.fadeOutRight.animationName;
    //     // setTimeout(function () {

    //     //     (document.getElementById('toaster') as HTMLElement).style.display="none";   
    //     // }, 6000)
    // }

   
