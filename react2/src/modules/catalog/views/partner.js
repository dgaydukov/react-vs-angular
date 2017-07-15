
import React from 'react'
import { Link } from 'react-router-dom';

import RedirectPopup from "../../redirect-popup/module"
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
                {type == "popup" && <RedirectPopup shop={item} profile={profile}/>}
                <div className="offers-card clearfix">
					<div className="offers-card__bar clearfix">
						<div className="offers-card__bar-img">
							<img src={item._src} alt=""/>
						</div>
						<div className="offers-card__bonus-blc">
							<h1 className="offers-card__name">{item.brand.name}</h1>
							<div className="offers-card__bonus">
								<div className="offer-card__until">бонусов {item._promo.prefix} <span className="offer-card__until-old">{item._promo.prevAmount}{item._promo.prevType}</span> <span  className="offer-card__until-new">{item._promo.amount}{item._promo.type}</span></div>
							</div>
						</div>
						{profile.id ?
							<a href={`${window.location.pathname}/popup`} className="btn offer-card__btn" target="_blank">НАЧАТЬ ПОКУПКИ</a>
								:
							<Link to={`${window.location.pathname}/to-popup/register`} className="btn offer-card__btn">НАЧАТЬ ПОКУПКИ</Link>
						}
					</div>
					
					<div className="offers-card-tabs">
						<div className="offers-card-tabs__list clearfix">
							<div className="offers-card-tabs__tab active">О МАГАЗИНЕ</div>
							<div className="offers-card-tabs__tab">ОТЗЫВЫ</div>
						</div>
						<div className="offers-card-tabs__items">
							<div className="offers-card-tabs__item show">
								<h2 className="frame-card__desc-subheader">Кэшбэк по категориям</h2>
								<p dangerouslySetInnerHTML={{__html: item._promo.descriptionHtml}}/>
								<h2>Покупки с кэшбэком в {item.brand.name}</h2>
								<p dangerouslySetInnerHTML={{__html: item.descriptionHtml}} />
							</div>
							<div className="offers-card-tabs__item">
								<h2>Отзывы</h2>
							</div>
						</div>
					</div>
                </div>
            </div>
        )
    }
}
export default CatalogShop;