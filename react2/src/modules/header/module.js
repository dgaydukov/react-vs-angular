/**
 * Created by diman on 06.07.17.
 */

import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component{
    constructor(props){
        super(props);
    }


    render(){
        const routers = [
            {key: "/mainpage", value: "Бонусный Клуб", display: true},
            {key: "/partners/popular", value: "Каталог Магазинов", display: true},
            {key: "/partners/favorites", value: "Акции", display: true},
            {key: "/profile/user", value: "Бонусный Счёт", display: true},
            {key: "/profile/help", value: "Помощь", display: true},
            {key: "/rules", value: "Правила покупок с бонусами", display: false},
        ];
        const currValue = routers.filter(item=>item.key==window.location.pathname)[0] ? routers.filter(item=>item.key==window.location.pathname)[0].value : "";

        return(
			<div>
				<nav className="main-menu">
					<ul className="main-menu__list">						
                        {routers.map((item, i)=>{
                            if(item.display){
                                return(<li key={i} className="main-menu__item"><Link to={item.key} className="main-menu__link">{item.value.toUpperCase()}</Link></li>);
                            }
                        })}
					</ul>
					<div className="breadcrumbs">
						<Link to="/mainpage">Главная</Link> • <span>{currValue}</span>
					</div>
				</nav>
			</div>
        )
    }
}

export default Header;