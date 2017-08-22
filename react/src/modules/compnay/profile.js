'use strict';

import React from "react";
import { Switch, Route, Link, Redirect } from 'react-router-dom';


class Profile extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
    }

    render(){
        return (
            <Switch>
                <Route exact path='/profile'render={() => (
                    <Redirect to="/profile/user"/>
                )}/>
                <Route path='/profile/user' render={() => (
                    <Profile {...this.props}/>
                )}/>
                <Route path='/profile/history' render={() => (
                    <History {...this.props}/>
                )}/>
            </Switch>
        );
    }
}

export default Profile;