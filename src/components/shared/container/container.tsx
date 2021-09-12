import React, { useEffect } from 'react';
import './container.scss';
interface ContainerProps {
    onClose?:(data?: any) => void;
    flexDirection: string;
}

const Container: React.FC<ContainerProps> = ({ onClose, flexDirection, children }) => {

    useEffect(()=> {
        document.querySelector<HTMLElement>('.container')?.style.setProperty('--flexDirection', flexDirection);
 
    },[]);

    function closeContainer() {
        if (onClose) {
            onClose();
        }
    }
    return (
        
        <div className="container">
            {
                onClose && <button className="close" onClick={closeContainer}><img style={{width: '30px', }} src="/assets/images/close-window.png"/></button>
            }
            {children}
        </div>
       
    )
}

export default Container;