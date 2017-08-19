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
                <Catalog profile={this.props.state.profile} catalog={this.props.state.catalog} categories={this.props.state.categories} favorites={this.props.state.favorites} mainpage="true" offersOnPage="6"/>
            </div>
        )
    }
}

export default MainPage;