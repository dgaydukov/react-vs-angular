
import React from 'react'
import { Link } from 'react-router-dom';


class NotFount extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="frame-faq">
                <h1>404 Страничка не найдена</h1>
            </div>
        )
    }
}

export default NotFount;