import React from 'react';
import './row.scss';

interface RowProps {
    style?: any
}

const Row: React.FC<RowProps> = ({children, style}) => {
    return (
        <div className="row" style={style}>
            {children}
        </div>
    )
}   

export default Row;