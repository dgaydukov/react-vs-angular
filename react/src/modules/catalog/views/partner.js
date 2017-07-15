
import React from 'react'
import { Link } from 'react-router-dom';

import store from '../../../redux/store';
import * as creators from "../../../redux/action-creators"

class CatalogShop extends React.Component{
    constructor(props){
        super(props);
        window.scrollTo(0,0);
    }

    componentWillMount(){
        store.dispatch(creators.getCatalogShopSuccess(this.props.parentProps.shop))
    }

    render(){
        const item = this.props.parentProps.shop,
            //type = this.props.parentProps.location.match.params.type,
            type = window.location.pathname.split("/")[3],
            profile = this.props.parentProps.profile;
        return(
            <div className="shop">
            </div>
        )
    }
}
export default CatalogShop;