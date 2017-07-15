/**
 * Created by diman on 05.06.17.
 */


import * as types from '../action-types';
import * as helpers from "../../helpers";

const initialState = {
    data: [],
    categories: [],
    shop: {}
};

const catalogReducer = function(state = initialState, action) {
    switch(action.type) {
        case types.GET_CATALOG_SUCCESS:
            const categories = [];
            const catalog = Object.assign({}, state, { data: action.data });
            catalog.data.map(item => {
                item._partnerLink = "/partners/" + helpers.getSemanticLatinName(item.name);
                item._src = "https://payqr.ru" + item.brand.imageUrl;
                item.category._name = helpers.getSemanticLatinName(item.category.name);

                item._promo = {}

                let current, prev;
                for (var promo of item.promoActions) {
                    let now = +new Date(),
                        dateFrom = +new Date(promo.dateFrom),
                        dateTo = +new Date(promo.dateTo);
                    if ((!promo.dateFrom || dateFrom <= now) && (!dateTo || dateTo > now)) {
                        current = promo;
                    } else if (promo.dateFrom && promo.dateFrom > now) {
                        prev = promo;
                    }
                }
                item._promo.name = "Бонусы";
                item._promo.type = current.amount.type;
                item._promo.prefix = current.amount.prefix;
                item._promo.amount = current.amount.value;
                item._promo.descriptionHtml = current.descriptionHtml.replace(/\n\n/g, '<br />');
                if(prev){
                    item._promo.prevPrefix = "до";
                    item._promo.prevAmount = prev.amount.value;
                    item._promo.prevType = prev.amount.type;
                }
                item._desc = item.description.substr(0,80) + "...";


                var index = categories.findIndex(c => c.name == item.category.name);
                if(index != -1){
                    categories[index].count++;
                    if(current.amount.type == "%"){
                        if(categories[index].cashback < current.amount.value){
                            categories[index].cashback = current.amount.value;
                        }
                    }
                    if(categories[index].rating < item.rating){
                        categories[index].rating = item.rating;
                    }
                    var topOffers = categories[index].topOffers;
                    topOffers.push({name: item.name, link: item._partnerLink, rating: item.rating });
                }
                else{
                    categories.push({
                        name: item.category.name,
                        _name: item.category._name,
                        _link: `/partners/categories/${item.category._name}`,
                        src: "https://payqr.ru" + item.category.imageUrl,
                        count: 1,
                        cashback: current.amount.type == "%" ? current.amount.value : 0,
                        rating: item.rating,
                        topOffers: [{name: item.name, link: item._partnerLink, rating: item.rating }]
                    })
                }
            });
            catalog.categories = categories;
            return catalog;
            break;


        case types.GET_CATALOG_SHOP_SUCCESS:
            const shop = Object.assign({}, state, { shop: action.data });
            return shop;
            break;
    }
    return state;
}

export default catalogReducer;
