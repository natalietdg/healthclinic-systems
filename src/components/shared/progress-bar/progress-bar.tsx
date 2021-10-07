import React, { useEffect, useState } from 'react';
import './progress-bar.scss';

interface ProgressBar {
    currentPage: number;
    maxSize: number;
    pages: any[];
}

const ProgressBar: React.FC<ProgressBar> = ({currentPage, maxSize, pages}) => {
    const [ currPage, setCurrPage] = useState<any>(currentPage);
    useEffect(()=> {
        setCurrPage(currentPage);
    },[currentPage])

    
    
 return(
     <div className="progress-bar">        
        { 
            pages.map((page, index)=> {
                return(
                    (page.index == currPage && page.index != maxSize - 1)? <><span className="circle--current"><img src="/assets/images/pin.png"/></span><span className="line--current"></span></>:
                    (page.index == currPage)? <><span className="circle--current"><img src="/assets/images/pin.png"/></span></>: 
                    (page.index < currPage ) ? <><span className="circle--current"><img src="/assets/images/done.png"/></span><span className="line--current"></span></>:
                    (page.index == maxSize -1)? <span className="circle"></span>:
                    (page.index < maxSize)? <><span className="circle"></span><span className="line"></span></>:''
                    
                );
            },[])
        }
     </div>
 )
}

export default ProgressBar;