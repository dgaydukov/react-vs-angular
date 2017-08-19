'use strict';


import React from 'react';
import { Switch, Route, Link, Redirect, withRouter } from 'react-router-dom';



import MainPage from "../mainpage/module"
import Catalog from "../catalog/module"
import Profile from "../profile/module"
import Header from "../header/module";




const Content = props => {
    return(
        <Switch>
            <Route exact path="/" render={() =>(
                <Redirect to="/mainpage"/>
            )}/>
            <Route path='/mainpage' render={() => {
                return (
                    props.state.catalog.length > 0 ?
                        <MainPage state={props.state}/>
                        :
                        <img id="preloader" src="/img/layout/loader.gif"/>
                )
            }}/>
            <Route path='/partners' render={() => {
                return (
                    props.state.catalog.length > 0 ?
                        <Catalog profile={props.state.profile} catalog={props.state.catalog} categories={props.state.categories} favorites={props.state.favorites}/>
                        :
                        <img id="preloader" src="/img/layout/loader.gif"/>
                )
            }}/>
            <Route path='/profile' render={() => {
                return (
                    props.state.profile.id ?
                        <Profile profile={props.state.profile} operations={props.state.operations} cards={props.state.cards}/>
                        :
                        <h2>no access</h2>
                )
            }}/>
        </Switch>
    )
}

class Layout extends React.Component{
    constructor(props){
        super(props);
    }

    componentWillMount() {
        this.unlisten = this.props.history.listen(location => {
            //console.log(location.pathname);
        });
    }

    componentWillUnmount() {
        this.unlisten();
    }

    render() {
        const state = this.props.state;
        return (
            <div className="wrapper">
                <div className="container">
                    <main className="main clearfix">
                        <div className="main-with-bar clearfix">
                            <Content state={state}/>
                        </div>
                    </main>
                </div>
            </div>
        )
    }
}
export default withRouter(Layout);