import React from 'react';
import { styles } from 'Components/shared/animation';
import Radium from 'radium';
import './loading-page.scss';


const LoadingPage = () => {
    return (
        <Radium.StyleRoot>
            <div className="loading-page" style={{...styles.fadeIn, animationIterationCount: 5}}>
                <h2>Loading{
                    
                    [1,2,3].map((number)=> {
                        return <span style={{...styles.fadeIn, animation: 'x 3s', animationIterationCount: 5}}>.</span>
                    })
                    
                }</h2>
                
            </div>
        </Radium.StyleRoot>
        

    )
}

export default LoadingPage;