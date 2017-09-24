'use strict';

/**
 *  WebApp layout component
 */

import React from 'react';
import {Link, Switch, Route, Redirect} from 'react-router-dom';
import {getUser} from "../../api/webapi";
import Header from "./header/header";
import NotFound from "../404/notfound";
import DashBoard from "../dashboard";
import Login from "../auth/login";
import Register from "../auth/register";
import Company from "../company";
import User from "../users/user";
import Role from "../users/role";

const Content = (props) => {
    return(
        <Switch>
            <Route path="/dashboard" component={DashBoard}/>
            <Route path="/auth/register" component={Register}/>
            <Route path="/auth/login" component={Login}/>
            <Route path="/companies" component={Company}/>
            <Route path="/users/list" component={User}/>
            <Route path="/users/roles" component={Role}/>
            <Route path="/403" render={(routeProps)=>{
                return(
                    <NotFound {...props} {...routeProps}/>
                )
            }}/>
            <Redirect to="/dashboard"/>
        </Switch>
    )
}

export default class Layout extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        getUser();
    }

    render(){
        return(
            <div className="wrapper">
                <Header {...this.props}/>
                <Content {...this.props}/>
            </div>
        )
    }
}