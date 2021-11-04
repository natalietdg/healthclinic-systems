import Radium from 'radium';
import React from 'react';
import { fadeIn, fadeInRight, fadeOutRight, slideOutRight } from 'react-animations';

export const styles:any = {
    fadeIn: {
        animation: 'x 4s',
        animationName: Radium.keyframes(fadeIn, 'fadeIn'),
        // animationDelay: '0.8s',
    },
    fadeInRight: {
        animation: 'x 2s',
        animationName: Radium.keyframes(fadeInRight, 'fadeInRight'),
       
    },
    fadeOutRight: {
        animation: 'x 2s',
        animationName: Radium.keyframes(fadeOutRight, 'fadeOutRight'),
    },
    slideOutRight: {
        animation: 'x 2s',
        animationName: Radium.keyframes(slideOutRight, 'slideOutRight'),
    }
}
