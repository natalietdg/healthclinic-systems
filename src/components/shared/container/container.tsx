import React from 'react';
import './container.scss';
interface ContainerProps {
    onClose?:(data?: any) => void;
}

const Container: React.FC<ContainerProps> = ({ onClose, children }) => {
    function closeContainer() {
        if (onClose) {
            onClose();
        }
    }
    return (
        <div className="container">
            <div className="container-close">
                {
                    onClose && <button className="close" onClick={closeContainer}><img style={{width: '30px', }} src="/assets/images/close-window.png"/></button>
                }
                {children}
            </div>
        </div>
    )
}

export default Container;