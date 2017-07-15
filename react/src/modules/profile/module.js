'use strict';

import React from "react";
import { Switch, Route, Link, Redirect } from 'react-router-dom';

import * as webAPI from "../../api/webapi";
import Faq from "../faq/module"

import store from '../../redux/store';
import * as creators from "../../redux/action-creators"

import ProfileView from "./views/profile"
import HistoryWithdrawView from "./views/history.withdraw"
import HistoryPurchaseView from "./views/history.purchase"


class Profile extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        store.dispatch(creators.getRightBlockSuccess({
            extendedAuth: true,
            authProfile: false,
            authWithdraw: true,
            authInfo: true,
            feedback: false,
            category: false,
            banner: false,
        }));
        webAPI.getOperations();
    }

    render(){
        let withdrawOperations = [],
            purchaseOperations = [];
        if(this.props.operations.length > 0){
            this.props.operations.map(item=>{
                if(item.typeName == "Withdraw"){
                    withdrawOperations.push(item);
                }
                else if(item.typeName == "AdmitadCashback"){
                    purchaseOperations.push(item);
                }
            })
        }
        const cssClassForStatus = {
            "Charged": "frame-buy__status--done",
            "Charging": "frame-buy__status--wait",
            "Cancelled": "frame-buy__status--cancel",
        }
        return (
            <Switch>
                <Route exact path='/profile'render={() => (
                    <Redirect to="/profile/user"/>
                )}/>
                <Route path='/profile/user' render={() => (
                    <ProfileView cards={this.props.cards} withdrawOperations={withdrawOperations} purchaseOperations={purchaseOperations} profile={this.props.profile} cssClassForStatus={cssClassForStatus}/>
                )}/>
                <Route path='/profile/history/purchase' render={(props) => (
                    <HistoryPurchaseView operations={purchaseOperations} cssClassForStatus={cssClassForStatus}/>
                )}/>
                <Route path='/profile/history/withdraw' render={(props) => (
                    <HistoryWithdrawView operations={withdrawOperations} cssClassForStatus={cssClassForStatus}/>
                )}/>
                <Route path='/profile/help' render={() => (
                    <Faq profile={this.props.profile}/>
                )}/>
            </Switch>
        );
    }
}

export default Profile;