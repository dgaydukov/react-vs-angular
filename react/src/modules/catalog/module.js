'use strict';


import React from 'react'


class Catalog extends React.Component{
    constructor(props){
        super(props);
        this.stateChange = this.stateChange.bind(this);
        this.addToFavorites = this.addToFavorites.bind(this);
        this.isInFavorites = this.isInFavorites.bind(this);
        this.showMore = this.showMore.bind(this);
        this.loadMoreOffers = _.throttle(this.loadMoreOffers.bind(this), 300);
        this.state = {
            searchText: "",
            sort: SORT_TYPE.POPULAR,
            offersOnPage: this.props.mainpage ? this.props.offersOnPage : 6,
            offersOnPageStep: 15,
        }
    }
    componentDidMount(){
        store.dispatch(creators.getRightBlockSuccess({
            extendedAuth: true,
            authProfile: false,
            authWithdraw: false,
            authInfo: false,
            feedback: false,
            category: true,
            banner: false,
        }));
        if(!this.props.mainpage){
            //document.addEventListener("scroll", this.loadMoreOffers);
        }
    }
    componentWillUnmount(){
        document.removeEventListener("scroll", this.loadMoreOffers);
    }

    showMore(){
        this.setState({offersOnPage: this.state.offersOnPage+30});
    }

    loadMoreOffers(){
        this.setState({pageYOffset: window.pageYOffset})
        const height = document.body.scrollHeight - window.pageYOffset - document.body.offsetHeight;
        if(height < 200){
            const offersOnPage = this.state.offersOnPage + this.state.offersOnPageStep;
            this.setState({offersOnPage: offersOnPage})
        }
    }

    addToFavorites(id, e){
        store.dispatch(creators.getFavoritesSuccess(id));
    }
    isInFavorites(id){
        if(this.props.favorites.indexOf(id) !== -1){
            return true
        }
        return false;
    }

    stateChange(e){
        const state = {};
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    render(){
        const sort = window.location.pathname.split("/")[2] ? decodeURI(window.location.pathname.split("/")[2]) : SORT_TYPE.POPULAR;
        var catalog = this.props.catalog.slice();
        var categories = this.props.categories;

        if(this.state.searchText){
            catalog = catalog.filter(item => {
                const latinName = helpers.getSemanticLatinName(item.name),
                    cyrillicName = helpers.getSemanticCyrillic(item.name),
                    search = this.state.searchText.toLowerCase();
                if(latinName.indexOf(search) != -1 || cyrillicName.indexOf(search) != -1){
                    return item;
                }
            });
        }

        if(this.props.mainpage){
            catalog = catalog.splice(0, this.state.offersOnPage);
        }

        categories.sort((curr, next) => curr.name.toUpperCase() < next.name.toUpperCase() ? -1 : 1);
        const parentProps = {
            CASHBACK_PERCENT: CASHBACK_PERCENT,
            SORT_TYPE: SORT_TYPE,
            stateChange: this.stateChange,
            addToFavorites: this.addToFavorites,
            isInFavorites: this.isInFavorites,
            showMore: this.showMore,
            sort: sort,
            total: this.props.catalog.length,
            categories: categories,
            catalog: catalog,
            profile: this.props.profile,
            offersOnPage: this.state.offersOnPage,
            mainpage: this.props.mainpage,
        }

        return(
            this.props.mainpage ?
                <CatalogList parentProps={parentProps}/>
                :
            <Switch>
                <Route path={"/partners/" + SORT_TYPE.CATEGORIES + "/:categoryName"} render={(props) => {
                    parentProps.catalog = catalog.filter(item => {
                        if(item.category._name == props.match.params.categoryName){
                            return item;
                        }
                    });
                    return (
                         <CatalogList parentProps={parentProps}/>
                    )}
                }/>
                <Route path={"/partners/" + SORT_TYPE.POPULAR} render={() => {
                    catalog.sort((curr, next)=>{
                        if (next.label > curr.label) return 1;
                        if (next.label < curr.label) return -1;
                        if (next.rating > curr.rating) return 1;
                        if (next.rating < curr.rating) return -1;
                        return 0;
                    });
                    catalog = catalog.splice(0, this.state.offersOnPage);
                    parentProps.catalog = catalog;
                    return (
                         <CatalogList parentProps={parentProps}/>
                    )}
                }/>
                <Route path={"/partners/" + SORT_TYPE.NAME} render={() => {
                    parentProps.catalog.sort((curr, next) => curr.name.toUpperCase() < next.name.toUpperCase() ? -1 : 1);
                    return (
                        <CatalogList parentProps={parentProps}/>
                    )}
                }/>
                <Route path={"/partners/" + SORT_TYPE.BONUS} render={() => {
                    parentProps.catalog.sort((curr, next) => next._promo.amount - curr._promo.amount);
                    return (
                        <CatalogList parentProps={parentProps}/>
                    )}
                }/>
                <Route path={"/partners/" + SORT_TYPE.LATEST} render={() => {
                    return (
                        <CatalogList parentProps={parentProps}/>
                    )}
                }/>
                <Route path={"/partners/" + SORT_TYPE.FAVORITES} render={() => {
                    parentProps.catalog = catalog.filter(item => {
                        if(this.isInFavorites(item.id)){
                            return item;
                        }
                    })
                    return (
                         <CatalogList parentProps={parentProps}/>
                    )}
                }/>
                <Route path='/partners/:shopName/:type?' render={(location) => {
                    let shop;
                    catalog.map(item => {
                        const shopSemanticUrl = helpers.getSemanticLatinName(item.name);
                        if(sort == shopSemanticUrl || sort == item.id){
                            shop = item;
                        }
                    });
                    parentProps.shop = shop;
                    return(
                        <CatalogShop parentProps={parentProps}/>
                    )
                }}/>
                <Redirect to="/partners/bonus"/>
            </Switch>
        )
    }
}

export default Catalog;


