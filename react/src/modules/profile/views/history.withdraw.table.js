/**
 * Created by diman on 16.06.17.
 */



import React from "react";

import ReactCustomDataTable from "../../react-curstom-datatable/module";
import * as helpers from "../../../helpers";

const HistoryWithdrawTableView = (props) => {
    const operations = props.operations,
        cssClassForStatus = props.cssClassForStatus;
    const data = {
        head: [
            "Информация о выводе",
            "Дата",
            "Статус",
            "Сумма",
        ],
        body: []
    };
    operations.map((item, i) => {
        const bodyItem = [
            `<div class="frame-buy__desc">
                <span>Номер вывода: ${item.number}</span>
            </div>`,

            `<time>${helpers.formatIsoDate(item.date)}</time>`,

            `<span class=${cssClassForStatus[item.status] + " frame-buy__status"}>${item.status == 'Cancelled' ? 'Отменено' : item.status == 'Charging' ? 'Ожидается подтверждение' : 'Подтверждено'}</span>`,

            `<span class=${cssClassForStatus[item.status] + " frame-buy__sum"}>${item.status == 'Cancelled' ? '--' : item.status == 'Charging' ? ('+ ' + item.amount) : ('+ ' + item.amount)}</span>`
        ]

        data.body.push(bodyItem);

    })
    return(
        <ReactCustomDataTable data={data}/>
    )
}

export default HistoryWithdrawTableView;