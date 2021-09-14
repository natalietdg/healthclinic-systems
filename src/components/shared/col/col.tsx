import React from 'react';
import './col.scss';

interface RowProps {

}

const Col: React.FC<RowProps> = ({children}) => {
    return (
        <div className="col">
            {children}
        </div>
    )
}   

export default Col;