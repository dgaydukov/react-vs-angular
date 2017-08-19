'use strict';

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from "./modules/layout/module"

const Router = (props) => {
    return (
        <BrowserRouter>
            <Layout {...props}/>
        </BrowserRouter>
    )
}
const mapStateToProps = function(store) {
    return {
        profile: store.profileState.data,
        catalog: store.catalogState.data,
    };
};

export default connect(mapStateToProps)(Router);