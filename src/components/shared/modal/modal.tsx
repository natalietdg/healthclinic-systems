import React, { useEffect, useState } from 'react';
import './modal.scss';

interface ModalProps {
    onClose: (data: any) => void;
    visible: boolean;
}

const Modal: React.FC<ModalProps> = ({ onClose, visible, children }) => {
    
    function closeModal() {
        onClose(false);
    }
    
    return (
        <div>
            { 
                visible && 
                <div className="modal">
                    <div className="modal-content" style={{flexDirection:'column', alignItems:'center'}}>
                        <button aria-label="close modal button" className="close" onClick={closeModal}><img alt="close window" style={{width: '30px', }} src="/assets/images/close-window.png"/></button>
                        <div style={{padding: '30px', width:'88%'}}> {children} </div>
                    </div>  
                </div>
            }
        </div>
    )
}

export default Modal;