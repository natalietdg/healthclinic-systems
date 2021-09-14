import React from 'react';
import './row.scss';

interface RowProps {

}

const Row: React.FC<RowProps> = ({children}) => {
    return (
        <div className="row">
            {children}
        </div>
    )
}   

export default Row;