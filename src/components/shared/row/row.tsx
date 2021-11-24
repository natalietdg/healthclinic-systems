import React from 'react';
import './row.scss';
import classNames from 'classnames';

interface RowProps {
    style?: any;
    className?: any;
}

const Row: React.FC<RowProps> = ({children, style, className}) => {
    return (
        <div className={classNames("row", className)} style={style}>
            {children}
        </div>
    )
}   

export default Row;