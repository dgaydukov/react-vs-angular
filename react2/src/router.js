'use strict';

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from "./modules/layout/module"

const Router = (props) => {
    return (
        <BrowserRouter>
            <Layout state={props}/>
        </BrowserRouter>
    )
}
const mapStateToProps = function(store) {
    return {
        profile: store.profileState.data,
        rightBlock: store.profileState.rightBlock,
        favorites: store.profileState.favorites,
        catalog: store.catalogState.data,
        shop: store.catalogState.shop,
        categories: store.catalogState.categories,
        operations: store.operationsState.data,
        cards: store.cardsState.data,
    };
};

export default connect(mapStateToProps)(Router);