'use strict';

/*
* Header component
 */

import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';
import s from "./header.css";

export default class Header extends PureComponent{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <header>
                <ul className={s.list}>
                    <li><Link to="/">{`dashboard(${this.props.user.id?"logged":"anonymous"})`}</Link></li>
                    <li><Link to="/auth/register">register</Link></li>
                    <li><Link to="/auth/login">login</Link></li>
                    <li><Link to="/companies">companies</Link></li>
                    <li><Link to="/users/list">users</Link></li>
                    <li><Link to="/users/roles">roles</Link></li>
                </ul>
            </header>
        )
    }
}