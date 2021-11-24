import React, { useState, useEffect } from 'react';

interface ButtonProps {
    style?: any;
    classNames?: string;
    id?: string;
    keyName: any;
    onClick: (data?: any)=> void;
}

const Button: React.FC<ButtonProps> = ({style={}, id, classNames='',  keyName, onClick, children}) => {
    return(
        <button style={style} onClick={()=>onClick(keyName)} id={id} className={`${classNames}`} >{children}</button>
    )
}

export default Button;