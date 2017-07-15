'use strict';

import React from "react";
import { Switch, Route, Link, Redirect } from 'react-router-dom';

import * as webAPI from "../../../api/webapi";


class ProfileCard extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        webAPI.getCards();
    }

    getIncomeBonus(item){
        var incomeBonus = 0;
        if(item && item.requirements){
            incomeBonus = item.requirements.filter(key=>key.incomeBonus)[0] ? item.requirements.filter(key=>key.incomeBonus)[0].incomeBonus : 0;
        }
        return incomeBonus;
    }

    render(){
        const amount = this.props.profile.fundsWallets[0].amount;
        const waitingAmount = this.props.profile.fundsWallets[0].waitingAmount;
        const badge = this.props.profile.badges[0];
        
        const maxIncomeBonus = this.getIncomeBonus(this.props.cards[this.props.cards.length-1]);
        let progressAmount = Math.round(amount/maxIncomeBonus*100);
        progressAmount = Math.round(progressAmount/4)+50;
        if(progressAmount > 100){
            progressAmount = 100;
        }
        let progressWaitingAmount = Math.round(waitingAmount/maxIncomeBonus*100);
        progressWaitingAmount+= progressAmount;
        if(progressWaitingAmount>100){
            progressAmount = 100;
        }

        console.log(progressAmount, progressWaitingAmount)

        const progressHands = [];
        let cardAchieved = true,
            nextIncomeBonus = 0;
        
        return (
            <div className="profile-card">
                <div className="statuses">
                    {this.props.cards.map((item,i)=>{
                        const extraCashbackPercent = item.availabilities.filter(key=>key.extraCashbackPercent)[0] ? item.availabilities.filter(key=>key.extraCashbackPercent)[0].extraCashbackPercent : 0;
                        const incomeBonus = this.getIncomeBonus(item);

                        progressHands.push({
                            cardAchieved: cardAchieved,
                            incomeBonus: incomeBonus,
                            name: item.name
                        })

                        let cssClass = ["status-item"];
                        if(cardAchieved){
                            cssClass.push("status-item--last");
                        }
                        if(item.id.toLowerCase() == badge.id.toLowerCase()){
                            cardAchieved = false;
                            nextIncomeBonus = this.props.cards[i+1] ? this.getIncomeBonus(this.props.cards[i+1]) :  this.getIncomeBonus(item);
                            cssClass.pop();
                            cssClass.push("status-item--active");
                        }

                        return(
                            <div className={cssClass.join(" ")} key={i}>
                                <div className="status-item__title">{item.id.toLowerCase() == badge.id.toLowerCase() && "Ваш текущий статус"}</div>
                                <h3 className="status-item__name">{item.name}</h3>
                                <img src={`/images/card-${item.name.toLowerCase()}.png`} alt="" className="status-item__img"/>
                                <div className="status-item__level">Уровень бонусов</div>
                                <div className={"status-item__bonus" + (extraCashbackPercent == 0 ? " status-item__bonus--standart":"")}>{extraCashbackPercent == 0 ? "Стандратный" : `+${extraCashbackPercent}%`}</div>
                                <div className="status-item__txt">{extraCashbackPercent == 0 ? "Совершайте покупки и получайте бонусы. Наберите достаточно бонусов, чтобы повысить уровень" : `На каждую покупку к текущим бонусам будет добавлять ${extraCashbackPercent}%`}</div>
								<div className="status-item__check-title">Вы уже получили статус <span>{item.name}</span></div>
                            </div>
                        )
                    })}
                </div>
                <div className="progress-blc">
                    <div className="progress-steps">
                        <div className="progress-step__name">Мой статус:</div>
						{progressHands.map((item,i)=>{
                            return(
                                <div key={i} className={"progress-bar__point-name" + (item.cardAchieved ? " progress-bar__point-name--active" : "")} style={{left: `${(i+1)*25}%`}}>                                    
                                    {item.name}
                                    </div>
                            )
                        })}
                        
                    </div>
                    <div className="progress-bar">
						<div className="progress-bar__in-wait" style={{width: `${progressWaitingAmount}%`}}>
							<div className="progress-bar__toolpoint"></div>
							<div className="progress-bar__tooltip">я ожидаю {waitingAmount} бонусов</div>
						</div>
                        <div className="progress-bar__in" style={{width: `${progressAmount}%`}}>
							<div className="progress-bar__toolpoint"></div>
							<div className="progress-bar__tooltip">у меня {amount} бонусов</div>
						</div>                        

                        {progressHands.map((item,i)=>{
                            return(
                                <div key={i} className={"progress-bar__point" + (item.cardAchieved ? " progress-bar__point--active" : "")} style={{left: `${(i+1)*25}%`}}>
									<span className="icon-checkmark-circled icn"></span>
                                    <div className="progress-bar__point-val">
										{item.incomeBonus}                                    
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileCard;