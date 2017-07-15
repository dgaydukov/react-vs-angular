/**
 * Created by diman on 23.06.17.
 */


import React from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

import config from 'site-config';
import * as helpers from "../../helpers"
import styles from "./module.css";
const imgPath = "/img/redirect-popup/";
const img = {
    logo: imgPath+"logo.svg",
    loader: imgPath+"loader.gif",
}

const ERROR_MSG = {
    SOLVE: "Мы решаем вашу проблему. Пожалуйста дождитесь ответа.",
    FAIL: "Переход в магазин временно недоступен. Попробуйте позже.",
}

class RedirectPopup extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error: "",
        }
    }

    componentDidMount(){
        setTimeout(()=>{
            this.getExternalLink(3);
        }, 3000);
    }

    getExternalLink(numberOfAttempts){
        numberOfAttempts--;
        const params = {
            platformId: config.platformId,
            partnerId: this.props.shop.id,
            userId: this.props.profile.id,
        }
        const query = Object.keys(params).map(i => i + "=" + params[i]).join("&");
        const backUrl = `https://payqr.ru/websdk/api/partners/resolvedlink?${query}`;
        axios
            .get(backUrl)
            .then(response=>{
                console.log(response.data, backUrl)
                window.location = response.data.partnerUrl;
            })
            .catch(error=>{
                this.setState({error: ERROR_MSG.SOLVE});
                if(numberOfAttempts > 0){
                    setTimeout(this.getExternalLink.bind(this, numberOfAttempts), 1000);
                }
                else{
                    this.setState({error: ERROR_MSG.FAIL});
                }
            })
    }
    render(){
        return(
            this.props.profile.id ?
                <div className="way">
                    <div className="way__logo">
                        <img src="/images/logo.svg" alt=""/>
                    </div>
                    <div className="way__main">
                        <h1 className="way__title">Ваша карта бонусного клуба в {this.props.shop.name} активирована</h1>
                        <div className="way__count">{this.props.shop._promo.amount}<span>{this.props.shop._promo.type}</span></div>
                        <div className="way__message">Ваши бонусы будут зачислены вам на счет после покупки.</div>
                    </div>
                    <div className="way__grownd">
                        <img src="/images/source.gif" alt="" className="way__spiner"/>
                    </div>
                    <div className={styles.error}>{this.state.error}</div>
                </div>
                :
                null
        )
    }
}

export default RedirectPopup;