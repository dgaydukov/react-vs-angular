/**
 * Created by diman on 01.07.17.
 */


import React from 'react';
import { Link } from 'react-router-dom';

const CATEGORY_PER_PAGE = 10;

import store from '../../redux/store';
import _ from 'underscore';
import * as creators from "../../redux/action-creators"
import Catalog from "../catalog/module"

class MainPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            categoryPerPage: CATEGORY_PER_PAGE,
            prevCategoryPerPage: CATEGORY_PER_PAGE,
            showHiv: true,
        }
        this.categoryOnWidth = this.categoryOnWidth.bind(this);
        this.toggleHiv = this.toggleHiv.bind(this);
        this.closeHiv = this.closeHiv.bind(this);
        this.categoryOnWidthThrottle = _.throttle(this.categoryOnWidth, 500);
    }

    toggleHiv(){
        this.setState({showHiv: !this.state.showHiv});
    }
    closeHiv(){
        this.setState({showHiv: false});
    }

    componentDidMount(){
        this.categoryOnWidth();
        window.addEventListener("resize", this.categoryOnWidthThrottle);
        store.dispatch(creators.getRightBlockSuccess({
            extendedAuth: true,
            authProfile: true,
            authWithdraw: false,
            authInfo: false,
            feedback: false,
            category: false,
            banner: true,
        }));
    }
    componentWillUnmount(){
        window.removeEventListener("resize", this.categoryOnWidthThrottle)
    }
    categoryOnWidth(){
        if(this.state.categoryPerPage != this.props.state.categories.length){
            if(window.innerWidth < 1110 && this.state.categoryPerPage != 6){
                this.setState({
                    categoryPerPage: 6,
                    prevCategoryPerPage: 6
                });
            }
            if(window.innerWidth > 1110 && window.innerWidth < 1250  && this.state.categoryPerPage != 8){
                this.setState({
                    categoryPerPage: 8,
                    prevCategoryPerPage: 8
                });
            }
            if(window.innerWidth > 1250 && this.state.categoryPerPage != 10){
                this.setState({
                    categoryPerPage: 10,
                    prevCategoryPerPage: 10
                });
            }
        }
    }
    toggleCategory(number){
        this.setState({categoryPerPage: number})
        if(number != this.props.state.categories.length){
            window.scrollTo(0, 500);
        }
    }

    render(){
        var categories = this.props.state.categories;
        categories.sort((curr, next) => next.rating - curr.rating);
        categories = categories.slice(0, this.state.categoryPerPage);


        return(
            <div className="mainpage">
				<div className="clearfix">
					<button className="btn hiw__open" onClick={this.toggleHiv}><span className="icon-faq-help icn"></span><span>Как это работает</span></button>
					<div className="clearfix"></div>
					<div className="hiw" style={{display: this.state.showHiv?"block":"none"}}>
						<button className="btn hiw__close" onClick={this.closeHiv}><span className="icon-close icn"></span></button>
						<h2 className="hiw__title">Как это работает</h2>
						<div className="hiw__wrap">
							<div className="hiw__step">
								<div className="hiw__icn">
									<img src="images/icn-hiw-1.svg" />
								</div>
								<div className="hiw__name">Перейдите в магазин</div>							
							</div>
							<div className="hiw__arrow"><span className="icon-arrow-next icn"></span></div>
							<div className="hiw__step">
								<div className="hiw__icn">
									<img src="images/icn-hiw-2.png" />
								</div>
								<div className="hiw__name">Сделайте покупку</div>							
							</div>
							<div className="hiw__arrow"><span className="icon-arrow-next icn"></span></div>
							<div className="hiw__step">
								<div className="hiw__icn">
									<img src="images/icn-hiw-3.png" />
								</div>
								<div className="hiw__name">Получите бонусы</div>
							</div>
							<div className="hiw__arrow"><span className="icon-arrow-next icn"></span></div>
							<div className="hiw__step">
								<div className="hiw__icn">
									<img src="images/icn-hiw-4.png" />
								</div>
								<div className="hiw__name">Выводите бонусы на карту</div>
							</div>
						</div>
                        <Link to="/rules"><button className="btn hiw__btn">Условия и правила</button></Link>
					</div>
				</div>
                <div className="clearfix">
                    <div className="categorys">
                        {categories.map((item, i)=>{
                            var top = item.topOffers.sort((curr, next) => next.rating - curr.rating).slice(0,5);
                            return(
                                <div className="category-item" key={i}>                                    
                                    <Link to={item._link} className="category-item__link">
                                        <div className="category-item__img">
                                            <img src={item.src} alt=""/>
                                        </div>
                                        <h3 className="category-item__name">{item.name}</h3>
                                        <div className="category-item__bar">
											<div className="category-item__bar-row clearfix">
												<div className="category-item__bar-name">Бонусов до</div>
												<div className="category-item__bar-val">{item.cashback}%</div>
											</div>
											<div className="category-item__bar-row clearfix">
												<div className="category-item__bar-name">Магазины</div>
												<div className="category-item__bar-val">{item.count}</div>
											</div>                                            
                                        </div>
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                    {this.state.categoryPerPage == this.props.state.categories.length ?
                        <button className="btn btn-mid-more btn-mid-more--less" onClick={this.toggleCategory.bind(this, this.state.prevCategoryPerPage)}>ПОКАЗАТЬ Меньше</button>
                            :
                        <button className="btn btn-mid-more" onClick={this.toggleCategory.bind(this, this.props.state.categories.length)}>ПОКАЗАТЬ ЕЩЕ</button>
                    }
                </div>

                <Catalog profile={this.props.state.profile} catalog={this.props.state.catalog} categories={this.props.state.categories} favorites={this.props.state.favorites} mainpage="true" offersOnPage="6"/>
            </div>
        )
    }
}

export default MainPage;