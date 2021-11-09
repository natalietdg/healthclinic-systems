import React, { useEffect } from 'react';
import './container.scss';

interface ContainerProps {
    onClose?:(data?: any) => void;
    flexDirection: string;
    style?: any;
    alignItems?: string;
}

const Container: React.FC<ContainerProps> = ({ onClose, flexDirection, children, alignItems='center', style }) => {

    useEffect(()=> {
        var containerArray:any =  containerArray = [...document.querySelectorAll('.container')];
       
        console.log(containerArray);

       
        if (containerArray.length > 0) {
            containerArray.map((container: any)=> {
                (container as HTMLElement)?.style.setProperty('--flexDirection', flexDirection);
                (container as HTMLElement)?.style.setProperty('--alignItems', alignItems);
            });
        }
        

    },[]);

    function closeContainer() {
        if (onClose) {
            onClose();
        }
    }
    return (
        
        <div className="container" style={style}>
            {/* {
                onClose && <button className="close" onClick={closeContainer}><img style={{width: '30px', }} src="/assets/images/close-window.png"/></button>
            } */}
            {children}
        </div>
       
    )
}

export default Container;