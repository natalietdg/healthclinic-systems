import React, { useState, useEffect } from 'react';
import { styles } from '../animation';
import Radium from 'radium';
import './toaster.scss';

interface ToasterProps {
    style?: any;
    props: {
        type: 'success' | 'errors' | '';
        message: string | React.ReactNode;
    }
    
}

// : React.FC<ToasterProps>

const Toaster: React.FC<ToasterProps> = ({ props, style } ) => {                    
    const [ toasterProps, setToasterProps ] = useState<any>({
        type: '',
        message: ''
    });

    useEffect(()=> {
        setToasterProps(props);
    },[props])

    useEffect(()=> {
        showToaster();
    }, [toasterProps]);

    const showToaster = () => {        
        document.querySelector('body')?.appendChild(document.getElementById('toaster') as HTMLElement);

        // (document.getElementById('toaster')

        console.log('style', style);
        (document.getElementById('toaster') as HTMLElement).style.display="flex";   
        (document.getElementById('toaster') as HTMLElement).style.animation = styles.animation;
        (document.getElementById('toaster') as HTMLElement).style.animationName = styles.animationName;
        (document.getElementById('toaster') as HTMLElement).style.animationDelay = styles.animationDelay;

        setTimeout(function () {                                         
            (document.getElementById('toaster') as HTMLElement).style.animation = styles.fadeOutRight.animation;
            (document.getElementById('toaster') as HTMLElement).style.animationName = styles.fadeOutRight.animationName;
            (document.getElementById('toaster') as HTMLElement).style.display="none";     
        }, 5000);

        

        // (document.getElementById('toaster')

    }

    return(
        <Radium.StyleRoot>
            <div onLoadedData={showToaster} id="toaster" className={toasterProps.type}>
                {toasterProps.message}
            </div>
        </Radium.StyleRoot>
        
    )
}

export default Toaster;