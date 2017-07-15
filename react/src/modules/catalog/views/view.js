import React from 'react';
import { Link } from 'react-router-dom';

const CatalogList = props => {
	props = props.parentProps;
    const sort = props.sort,
        type = props.SORT_TYPE;

    console.log(props.offersOnPage , props.total)
    const sortText = {}
    sortText[type.POPULAR] = "популярности";
    sortText[type.BONUS] = "бонусам";
    sortText[type.LATEST] = "новинкам";

    return (
            <div className="catalog clearfix">
				<h2 className="offers__title">ИНТЕРНЕТ-МАГАЗИНЫ</h2>
                <div className="offers-filter clearfix">
					<div className="search">
						<div className="offers-filter__name">Поиск</div>
                    	<input type="search" name="searchText" className="input search-input" placeholder="Введите название магазина" onKeyUp={props.stateChange}/>
					</div>
					<div className="sorting">
						<div className="offers-filter__name">Сортировка</div>                    	
						<div className="sorting__list">							
							<Link to={`/partners/${type.BONUS}`} className={sort == type.BONUS && "active"}>ПО {sortText[type.BONUS]}</Link>
							<Link to={`/partners/${type.POPULAR}`} className={sort == type.POPULAR && "active"}>ПО {sortText[type.POPULAR]}</Link>
							<Link to={`/partners/${type.LATEST}`} className={sort == type.LATEST && "active"}>ПО {sortText[type.LATEST]}</Link>
						</div>
					</div>                    
                </div>


                {(props.sort == props.SORT_TYPE.FAVORITES && props.catalog.length == 0) &&
                    <div className="tabs-favorite">
                        <p>Вы еще ничего не добавили в избранное.</p>
                        <p>Добавьте Ваши любимые магазины<br/>из <Link to="/partners">каталога магазинов</Link></p>
                    </div>
                }

                <table className="offers-tbl">
					<thead className="offers-tbl__thead">
						<tr>
							<th className="offers-tbl__th offers-tbl__th--name">Название магазина</th>
							<th className="offers-tbl__th offers-tbl__th--bonus">Бонусы</th>
							<th className="offers-tbl__th offers-tbl__th--bar"></th>
						</tr>
					</thead>
					<tbody>
						{props.catalog.map((item, i) => {
							return (
								<tr className="offer-item" key={i}>
									<td className="offers-tbl__td">
										<div className="offer-item__blc">
											<Link to={item._partnerLink} key={i} className="offer-item__img">
												<img src={item._src} alt=""/>
											</Link>
											<div className="offer-item__txt-wrap">
												<div className="offer-item__offer-name">{item.BONUS}</div>
												<div className="offer-item__txt" dangerouslySetInnerHTML={{__html: item._desc}}/>
											</div>
										</div>
									</td>
									<td className="offers-tbl__td">
										<div className="offer-item__bonus">{item._promo.amount}{item._promo.type}</div>
										<div className="offer-item__bonus-old">{item._promo.prevPrefix} {item._promo.prevAmount}{item._promo.prevType}</div>
									</td>
									<td className="offers-tbl__td">
										<Link to={item._partnerLink}><button className="btn offer-item__btn">НАЧАТЬ ПОКУПКИ</button></Link>
                                        {props.isInFavorites(item.id) ?
											<div className="btn offer-item__like" onClick={props.addToFavorites.bind(null, item.id)}>
												<span className="icon-checkmark-circled icn"></span><span>В избранном</span>
												<div className="offer-item__like-tooltipe">Удалить из избранного</div>

											</div>
                                            :
											<div className="btn offer-item__like" onClick={props.addToFavorites.bind(null, item.id)}>
												<span className="icon-heart-bookmark icn"></span><span>В избранное</span>
												<div className="offer-item__like-tooltipe">Добавить в избранное</div>
											</div>
                                        }
									</td>		
								</tr>
							)
						})}
					</tbody>
                </table>
				{props.mainpage && <Link to="/partners/bonus"><button className="btn btn-mid-more">ПОКАЗАТЬ ЕЩЕ</button></Link>}
                {props.offersOnPage != props.total && !props.mainpage &&
				<button className="btn btn-mid-more" onClick={props.showMore}>ПОКАЗАТЬ ЕЩЕ</button>
                }
            </div>
    );
}

export default CatalogList
