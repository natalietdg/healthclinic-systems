import React, { useEffect, useState } from 'react';
import './progress-bar.scss';
import {useTranslation} from 'react-i18next';

interface ProgressBar {
    currentPage: number;
    maxSize: number;
    pages: any[];
    onClick: (page: any) => void;
}

const ProgressBar: React.FC<ProgressBar> = ({currentPage, maxSize, pages, onClick}) => {
    const { t } = useTranslation();
    const [ currPage, setCurrPage] = useState<any>(currentPage);
    useEffect(()=> {
        setCurrPage(currentPage);
    },[currentPage])

    
    
 return(
     <div className="progress-bar">        
        { 
            pages.map((page, index)=> {
                return(//
                    (page.index == currPage && page.index != maxSize - 1)? <div className='div'><button onClick={() => onClick(page.index)} className="circle--current"><img src="/assets/images/pin.png"/>{t(`label.${page.name}`)}</button><span className="line--current"></span></div>:
                    (page.index == currPage)? <div className='div'><button onClick={() => onClick(page.index)} className="circle--current"><img src="/assets/images/pin.png"/>{t(`label.${page.name}`)}</button></div>: 
                    (page.index < currPage ) ? <div className='div'><button onClick={() => onClick(page.index)} className="circle--current"><img src="/assets/images/done.png"/>{t(`label.${page.name}`)}</button><span className="line--current"></span></div>:
                    (page.index == maxSize -1)? <div className='div'><button onClick={() => onClick(page.index)} className="circle">{t(`label.${page.name}`)}</button><span></span></div>:
                    (page.index < maxSize)? <div className='div'><button onClick={() => onClick(page.index)} className="circle">{t(`label.${page.name}`)}</button><span className="line"></span></div>:''
                    
                );
            },[])
        }
     </div>
 )
}

export default ProgressBar;