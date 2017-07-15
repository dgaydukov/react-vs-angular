/**
 * Created by diman on 26.06.17.
 */

/*
 https://web-design-weekly.com/2016/07/08/adding-google-analytics-react-application/
 */


import React from 'react';
import ReactGA from 'react-ga';

import clickEvents from './click-events';
import PathnameChangeEvents from './pathname-change-events';

const ReactCustomGA = {
    Click: (name) => {
        if(clickEvents[name]){
            ReactGA.event(clickEvents[name]);
        }
    },

    Change: (name)=>{
        if(PathnameChangeEvents[name]){
            ReactGA.event(clickEvents[name]);
        }
    }
}

export default ReactCustomGA;