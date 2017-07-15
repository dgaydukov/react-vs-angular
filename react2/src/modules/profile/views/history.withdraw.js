'use strict';

import React from "react";
import { Link } from 'react-router-dom';

import HistoryWithdrawTableView from "./history.withdraw.table"

const HistoryWithdrawView = (props) => {
    return (
        <div>
            <div className="page-title">
                <div className="container">
                    <Link to="/profile"><div className="page-title__arrow"></div>Назад в личный кабинет</Link>
                </div>
            </div>
            <div className="frame-bonus">
                <div className="container">
                    <div className="frame-buy">
                        <div className="frame-buy__top">
                            <span>История вывода средств</span>
                        </div>
                        <HistoryWithdrawTableView operations={props.operations} cssClassForStatus={props.cssClassForStatus}/>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default HistoryWithdrawView;