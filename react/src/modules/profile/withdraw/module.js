'use strict';

import React from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import config from 'site-config';

import styles from "./module.css";
import MaskedInput from 'react-maskedinput';
import * as helpers from "../../../helpers";
import * as webAPI from "../../../api/webapi";

const WITHDRAW_BANKCARD = "WITHDRAW_BANKCARD";
const WITHDRAW_MOBILE = "WITHDRAW_MOBILE";

const STATUS_START = "STATUS_START";
const STATUS_PROCESS = "STATUS_PROCESS";
const STATUS_SUCCESS = "STATUS_SUCCESS";
const STATUS_ERROR = "STATUS_ERROR";




class ProfileWithdraw extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            errors: [],
            mobilePhoneNumber: "",
            mobilePhoneAmount: "",
            mobilePhoneWithdraw: false,
            bankCardPan: "",
            bankCardAmount: "",
            bankCardWithdraw: false,
            withdrawType: WITHDRAW_BANKCARD,
            status: STATUS_START,
        }
        this.bankCardStateChange = this.bankCardStateChange.bind(this);
        this.mobilePhoneStateChange = this.mobilePhoneStateChange.bind(this);
        this.withdrawMobilePhone = this.withdrawMobilePhone.bind(this);
        this.withdrawBankCard = this.withdrawBankCard.bind(this);
        this.updateProfile = this.updateProfile.bind(this);
        this.clearBankCardPan = this.clearBankCardPan.bind(this);
    }

    bankCardStateChange(e){
        let bankCardWithdraw =  false,
            bankCardPan = this.state.bankCardPan,
            bankCardAmount = this.state.bankCardAmount;

        switch (e.target.name){
            case "bankCardPan":
                bankCardPan = this.clearBankCardPan(e.target.value);
                break;
            case "bankCardAmount":
                e.target.value = e.target.value.replace(/\D/g, '');
                if(e.target.value > this.getMaxBankCardAmount()){
                    e.target.value = this.getMaxBankCardAmount();
                }
                bankCardAmount = e.target.value;
                break;
        }
        if(bankCardAmount >= this.getMinBankCardAmount() && bankCardPan.length == 16){
            bankCardWithdraw = true;
        }
        this.setState({
            bankCardPan: bankCardPan,
            bankCardAmount: bankCardAmount,
            bankCardWithdraw: bankCardWithdraw,
        });
    }

    mobilePhoneStateChange(e){
        let mobilePhoneWithdraw =  false,
            mobilePhoneNumber = this.state.mobilePhoneNumber,
            mobilePhoneAmount = this.state.mobilePhoneAmount;

        switch (e.target.name){
            case "mobilePhoneNumber":
                mobilePhoneNumber = this.clearBankCardPan(e.target.value);
                break;
            case "mobilePhoneAmount":
                e.target.value = e.target.value.replace(/\D/g, '');
                if(e.target.value > this.getMaxMobilePhoneAmount()){
                    e.target.value = this.getMaxMobilePhoneAmount();
                }
                mobilePhoneAmount = e.target.value;
                break;
        }
        if(mobilePhoneAmount >= this.getMinMobilePhoneAmount() && mobilePhoneNumber.length == 11){
            mobilePhoneWithdraw = true;
        }
        this.setState({
            mobilePhoneNumber: mobilePhoneNumber,
            mobilePhoneAmount: mobilePhoneAmount,
            mobilePhoneWithdraw: mobilePhoneWithdraw,
        });
    }

    getMinBankCardAmount(){
        let amount = 0;
        if(this.props.profile.withdrawalTypes){
            const withdraw = this.props.profile.withdrawalTypes.filter(i=>i.typeName.toLowerCase() == "bankcard");
            if(withdraw[0]){
                amount = withdraw[0].amountFrom;
            }
        }
        return 1;
    }
    getMaxBankCardAmount(){
        let amount = 0;
        if(this.props.profile.withdrawalTypes){
            const withdraw = this.props.profile.withdrawalTypes.filter(i=>i.typeName.toLowerCase() == "bankcard");
            if(withdraw[0]){
                amount = withdraw[0].amountTo;
            }
        }
        return amount;
    }
    getMinMobilePhoneAmount(){
        let amount = 0;
        if(this.props.profile.withdrawalTypes){
            const withdraw = this.props.profile.withdrawalTypes.filter(i=>i.typeName.toLowerCase() == "mobilephone");
            if(withdraw[0]){
                amount = withdraw[0].amountFrom;
            }
        }
        return 1;
    }
    getMaxMobilePhoneAmount(){
        let amount = 0;
        if(this.props.profile.withdrawalTypes){
            const withdraw = this.props.profile.withdrawalTypes.filter(i=>i.typeName.toLowerCase() == "mobilephone");
            if(withdraw[0]){
                amount = withdraw[0].amountTo;
            }
        }
        return amount;
    }



    getAmount(){
        return this.props.profile.fundsWallets[0].amount;
    }

    updateProfile(){
        webAPI.getProfile();
        webAPI.getOperations();
    }

    clearBankCardPan(card){
        return card.replace(/[^0-9.]/g, '');
    }

    changeWithdrawType(i){
        this.setState({withdrawType: i});
    }

    withdrawBankCard(){
        if(this.state.bankCardWithdraw){
            this.setState({status: STATUS_PROCESS});
            axios.post(`withdrawals/${helpers.guid()}/bankcard`, {
                bankCardPan: this.state.bankCardPan,
                amount: this.state.bankCardAmount,
            }).then(response=>{
                console.log(response);
                this.updateProfile();
                this.refs.bankCardPan.value = "";
                this.refs.bankCardAmount.value = "";
                this.setState({status: STATUS_SUCCESS});
            }).catch(error=>{
                console.log(error)
                //check if error is timeout
                if(error.toString().indexOf("timeout") != -1 && error.toString().indexOf("20000ms") != -1){
                    this.setState({status: STATUS_SUCCESS});
                }
                else{
                    this.setState({
                        status: STATUS_ERROR,
                        errors: ["Ошибка сервера. Повторите попытку позже"],
                    });
                }
            })
        }
    }

    withdrawMobilePhone(){
        if(this.state.mobilePhoneWithdraw) {
            this.setState({status: STATUS_PROCESS});
            axios.post(`withdrawals/${helpers.guid()}/mobile`, {
                mobilePhone: this.state.mobilePhoneNumber,
                amount: this.state.mobilePhoneAmount,
            }).then(response => {
                console.log(response)
                this.updateProfile();
                this.refs.mobilePhoneNumber.value = "";
                this.refs.mobilePhoneAmount.value = "";
                this.setState({status: STATUS_SUCCESS});
            }).catch(error=>{
                console.log(error)
                //check if error is timeout
                if(error.toString().indexOf("timeout") != -1 && error.toString().indexOf("20000ms") != -1){
                    this.setState({status: STATUS_SUCCESS});
                }
                else{
                    this.setState({
                        status: STATUS_ERROR,
                        errors: ["Ошибка сервера. Повторите попытку позже"],
                    });
                }
            })
        }
    }

    render(){
        if(this.props.profile.id){
            const mobilePhoneAmountPlaceHolder = `от ${this.getMinMobilePhoneAmount()} до ${this.getMaxMobilePhoneAmount()}`;
            const bankCardAmountPlaceHolder = `от ${this.getMinBankCardAmount()} до ${this.getMaxBankCardAmount()}`;
            switch (this.state.status){
                case STATUS_START:
                    return (
                        <div className="pop-up__main">
                            <Link to="/profile/user"><button className="btn pop-up__close"><span className="icon-close"></span></button></Link>
                            <div className="change-out">
								<div className="change-out__bonus">Доступно {this.getAmount()} бонусов</div>
                                <ul className="check-group">
                                    <li onClick={this.changeWithdrawType.bind(this,WITHDRAW_BANKCARD)} className={"check tabs-list__item" + (this.state.withdrawType == WITHDRAW_BANKCARD ? "tabs-list__item_active active":"")}>
										<button className="btn check__btn check__btn--card" type="button">На карту</button>
									</li>
                                    <li onClick={this.changeWithdrawType.bind(this,WITHDRAW_MOBILE)} className={"check tabs-list__item " + (this.state.withdrawType == WITHDRAW_MOBILE ? "tabs-list__item_active active":"")}>
										<button className="btn check__btn check__btn--tel" type="button">На телефон</button>
									</li>
                                </ul>
                                <div style={{display: this.state.withdrawType == WITHDRAW_BANKCARD ? "block":"none"}} id="content1">
                                    <div className="change__input-group clearfix">
                                        <label className="change__label change__label--long">
                                            <span className="change__label-name">Банковская карта</span>
                                            <MaskedInput className="input" mask="1111 1111 1111 1111" size="20" ref="bankCardPan" name="bankCardPan"  onChange={this.bankCardStateChange}/>
                                        </label>
                                        <label className="change__label change__label--short">
                                            <span className="change__label-name">Сумма баллов</span>
                                            <input className="input" type="text" ref="bankCardAmount" name="bankCardAmount" placeholder={bankCardAmountPlaceHolder} onChange={this.bankCardStateChange}/>
                                        </label>
                                    </div>
                                    <button className={"btn btn--bonus-out " + (!this.state.bankCardWithdraw ? styles.opacity:"")} onClick={this.withdrawBankCard}>ПЕРЕВЕСТИ</button>
                                </div>
                                <div style={{display: this.state.withdrawType == WITHDRAW_MOBILE ? "block":"none"}} id="content2">
                                    <div className="change__input-group clearfix">
                                        <label className="change__label change__label--long">
                                            <span className="change__label-name">Мобильный телефон</span>
                                            <MaskedInput className="input" mask="+7 (111) 111-11-11" size="20" ref="mobilePhoneNumber" name="mobilePhoneNumber"  onChange={this.mobilePhoneStateChange}/>
                                        </label>
                                        <label className="change__label change__label--short">
                                            <span className="change__label-name">Сумма баллов</span>
                                            <input className="input" type="text" ref="mobilePhoneAmount" name="mobilePhoneAmount" placeholder={mobilePhoneAmountPlaceHolder} onChange={this.mobilePhoneStateChange}/>
                                        </label>
                                    </div>
                                    <button className={"btn btn--bonus-out " + (!this.state.mobilePhoneWithdraw ? styles.opacity:"")} onClick={this.withdrawMobilePhone}>ПЕРЕВЕСТИ</button>
                                </div>
                            </div>
                        </div>
                    );
                    break;


                case STATUS_PROCESS:
                    return (
                        <div className="pop-up__main">
						<button className="btn pop-up__close"><span className="icon-close"></span></button>
                            <div>
                                <div className="pop-up-alert">
                                    <div className="pop-up-alert__icn">
                                        <img src="/img/profile/withdraw/loader.gif "/>
                                    </div>                                    
                                </div>
								<div className="pop-up-message">
									<div className="pop-up-alert__txt">Подождите.<br />Идёт обработка запроса!</div>
                                </div>								
                            </div>
                        </div>
                    )
                    break;


                case STATUS_SUCCESS:
                    return (
                        <div className="pop-up__main">
							<button className="btn pop-up__close"><span className="icon-close"></span></button>
                            <div className="pop-up-alert">
                                <div className="pop-up-alert__icn">
                                    <img src="/images/done-green.png" />
                                </div>                                
                            </div>
                            <div className="pop-up-message">
								<div className="pop-up-alert__txt">
                                    Заявка на вывод {this.state.withdrawType == WITHDRAW_BANKCARD ? this.state.bankCardAmount : this.state.mobilePhoneAmount} бонусов успешно создана
                                </div>
                                <div className="pop-up-message__big">Совсем скоро бонусы будут зачислены на {this.state.withdrawType == WITHDRAW_BANKCARD ? "карту •••• "+this.clearBankCardPan(this.state.bankCardPan).substr(12,4) : "номер " + this.state.mobilePhoneNumber}</div>
                                <div className="pop-up-message__small">В редких случаях зачисление может составить до 3-х рабочих дней.</div>
                            </div>
                            <Link to="/partners" className="btn pop-up__next">Продолжить покупки</Link>
                        </div>
                    )
                    break;


                case STATUS_ERROR:
                    return (
                        <div className="pop-up__main">
							<button className="btn pop-up__close"><span className="icon-close"></span></button>
                            <div className="pop-up-alert">
                                <div className="pop-up-alert__icn">
                                    <img src="/images/achtung.png" />
                                </div>                                
                            </div>
                            <div className="pop-up-message">
								<div className="pop-up-alert__txt">
                                    При попытке вывода {this.state.withdrawType == WITHDRAW_BANKCARD ? this.state.bankCardAmount : this.state.mobilePhoneAmount} бонусов произошла ошибка
                                </div>
                                <div className="pop-up-message__big">Мы в кратчайшие сроки это исправим, просим прощения за <br />неудобство</div>
                            </div>
                            <Link to="/partners"  className="btn pop-up__next">Продолжить покупки</Link>
                        </div>
                    )
                    break;
            }
        }
        else{
            return null
        }
    }
}

export default ProfileWithdraw;