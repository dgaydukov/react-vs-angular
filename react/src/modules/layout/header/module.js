'use strict';

import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component{
    constructor(props){
        super(props);
    }


    render(){
        const routers = [
            {key: "/faq", value: "FAQ", display: true},
            {key: "/catalog", value: "catalog", display: true},
            {key: "/users", value: "users", display: true},
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