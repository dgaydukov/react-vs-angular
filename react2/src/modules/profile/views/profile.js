/**
 * Created by diman on 16.06.17.
 */


import React from "react";
import {Link} from 'react-router-dom';

import HistoryPurchaseTableView from "./history.purchase.table"
import ProfileCard from "../card/module";

class ProfileView extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            operationPerPage: 3,
        }
    }
    render(){
        const profile = this.props.profile;
        const operations = this.props.purchaseOperations.slice(0, this.state.operationPerPage);
        return(
            <div className="clearfix">
                <ProfileCard cards={this.props.cards} profile={this.props.profile}/>
                <div className="history-blc clearfix">
                    <h2 className="sub-title">История операций</h2>
                    <div className="table-wrap">
                        {
                            operations.length > 0 ?
                                <HistoryPurchaseTableView operations={operations} cssClassForStatus={this.props.cssClassForStatus}/>
                                :
                                <h2>Вы ещё ничего не купили</h2>
                        }
                    </div>
                    {operations.length > 0 && this.state.operationPerPage < 100 &&
                    <button className="btn btn-mid-more" onClick={()=>{this.setState({operationPerPage:100})}}>ПОКАЗАТЬ ЕЩЕ</button>}
                </div>
            </div>
        )
    }
}

export default ProfileView;