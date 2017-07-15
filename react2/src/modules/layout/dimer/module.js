/**
 * Created by diman on 27.06.17.
 */

import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import * as helpers from "../../../helpers"
import styles from "./module.css";

import ProfileWithdraw from "../../profile/withdraw/module"

const STICKER_MODULE = {
    WITHDRAW: "withdraw",
}
const STICKER_COMPONENTS = {}
STICKER_COMPONENTS[STICKER_MODULE.WITHDRAW] = ProfileWithdraw;


class Dimer extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const state = this.props.state;
        var screenModule = [
            STICKER_MODULE.WITHDRAW,
        ].filter(item =>  window.location.pathname.split("/").indexOf(item.toLowerCase()) !== -1)[0];
        const StickComponent = STICKER_COMPONENTS[screenModule];
        if(StickComponent){
            document.body.style.overflow = 'hidden';
        }
        else{
            document.body.style.overflow = 'visible';
        }
        return(
            <div className="pop-up" style={{display: screenModule ? `block` : `none`}}>
                <Link to={helpers.getPrevPath()} className="pop-up__overlay"></Link>
                {StickComponent && <StickComponent view={screenModule} STICKER_MODULE={STICKER_MODULE} profile={state.profile}/>}
            </div>
        )
    }
}

export default Dimer;