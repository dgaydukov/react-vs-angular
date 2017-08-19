'use strict';

import React from 'react'
import { Link } from 'react-router-dom';

export default class Faq extends React.Component{
    constructor(props){
        super(props);
    }

    stateChange(e){
        const state = {};
        state[e.target.name] = e.target.value;
        this.setState(state);
    }
    
    render(){
        return(
            <h1>FAQ</h1>
        )
    }
}