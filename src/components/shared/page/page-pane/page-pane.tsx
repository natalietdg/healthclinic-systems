import React from 'react';
import './page-pane.scss';

interface PagePaneProps {
    index: string | number;
}

const PagePane: React.FC<PagePaneProps> = ({children, index}) => {
    return (
        <div className="page-pane">
            {children}
        </div>
    )
}

export default PagePane;