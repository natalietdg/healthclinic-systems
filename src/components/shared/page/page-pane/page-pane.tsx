import React from 'react';
import './page-pane.scss';

interface PagePaneProps {
    index: string | number;
}

const PagePane: React.FC<PagePaneProps> = ({children, index}) => {
    return (
        <div className="page-pane">
            <div className="page-pane--child">
                {children}
            </div>
        </div>
    )
}

export default PagePane;