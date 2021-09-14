import React from 'react';
import './col.scss';

interface ColProps {
    style?: any;
}

const Col: React.FC<ColProps> = ({children, style}) => {
    return (
        <div className="col" style={style}>
            {children}
        </div>
    )
}   

export default Col;