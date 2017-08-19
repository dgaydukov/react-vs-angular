'use strict';


import React from 'react';
import { Switch, Route, Link, Redirect, withRouter } from 'react-router-dom';



import Header from "./header/module"
import Main from "../main/module"
import Catalog from "../catalog/module"
import Profile from "../user/profile"
import Faq from "../faq/module"
import Feedback from "../feedback/module"




const Content = props => {
    return(
        <Switch>
            <Route exact path="/" render={() =>(
                <Redirect to="/main"/>
            )}/>
            <Route path="/faq" component={Faq}/>
            <Route path="/support/feedback" component={Feedback}/>
            <Route path='/main' component={Main}/>
            <Route path='/products' component={Catalog}/>
            <Route path='/user/profile' render={() => {
                return (
                    props.profile.id ?
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
            console.log(location.pathname);
        });
    }

    componentWillUnmount() {
        this.unlisten();
    }

    render() {
        return (
            <div className="wrapper">
                <Header {...this.props}/>
                <div className="container">
                    <Content {...this.props}/>
                </div>
            </div>
        )
    }
}
export default withRouter(Layout);