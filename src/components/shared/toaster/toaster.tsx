import React from 'react';
import './toaster.scss';
export const toaster = (
    type: 'success' | 'errors',
    message: string | React.ReactNode
) => {
    const showToaster = () => {
        document.querySelector('body')?.appendChild(document.getElementById('toaster') as HTMLElement);
        
        setTimeout(function () {
            (document.getElementById('toaster') as HTMLElement).style.display="flex"
        }, 5000)
    }

    return(
        <div onLoadedData={showToaster} id="toaster" className={type}>
            {message}
        </div>
    )
}