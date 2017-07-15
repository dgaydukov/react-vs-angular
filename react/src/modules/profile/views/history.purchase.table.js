/**
 * Created by diman on 16.06.17.
 */



import React from "react";
import {Link} from "react-router-dom";

import ReactCustomDataTable from "../../react-curstom-datatable/module";
import * as helpers from "../../../helpers";



const HistoryPurchaseTableView = (props) =>{
    const operations = props.operations,
        cssClassForStatus = props.cssClassForStatus;
    const data = {
        head: [
            "Информация о покупке",
            "Дата",
            "Статус",
            "Сумма",
        ],
        body: []
    };
    operations.map((item, i) => {
        const bodyItem = [
            `<div class="table__info-buy-wrap">
                <div class="table__info-buy-logo">
                    <img src="${"https://payqr.ru" + item.shopLogoUrl}" alt="">
                </div>
                <div class="table__info-buy-txt">
                    <div class="table__info-buy-title">Покупка в <span class="table__info-buy-blue"><a href="/partners/${item._name}">${item.shopName}</a></span></div>
                    <div class="table__info-buy-main">
                        <div>Номер покупки:  ${item.number}</div>
                        <div>Сумма покупки: ${item.customData.orderAmount} ${item.customData.orderCurrency == 'USD' ? '$' : '₽'}</div>
                    </div>
                </div>
            </div>`,


            `<time>${helpers.formatIsoDate(item.date)}</time>`,

            `<span class=${cssClassForStatus[item.status] + " frame-buy__status"}>${item.status == 'Cancelled' ? 'Отменено' : item.status == 'Charging' ? 'Ожидается подтверждение' : 'Подтверждено'}</span>`,

            `<span class=${cssClassForStatus[item.status] + " frame-buy__sum"}>${item.status == 'Cancelled' ? '--' : item.status == 'Charging' ? ('+ ' + item.amount) : ('+ ' + item.amount)}</span>`
        ]

        data.body.push(bodyItem);

    });
    return(
        <ReactCustomDataTable data={data}/>
    )
}


export default HistoryPurchaseTableView;