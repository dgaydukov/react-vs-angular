'use strict';


import React from 'react'


export default class Catalog extends React.Component{
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
            <h1>Catalog</h1>
        )
    }
}