import React from 'react';
interface TabsProps {
    visible: boolean;
}

const Tabs:React.FC<TabsProps> = ({visible, children}) => {
    return (
        <div className="tabs">
            { 
                visible && 
                <div className="content">
                    {children}
                </div> 
            }
        </div>
    )
}

export default Tabs;