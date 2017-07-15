
import React from 'react';
import axios from 'axios';

import * as helpers from "../../helpers";

class Feedback extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            errors: [],
            success: "",
            name: "",
            email: "",
            title: "",
            comment: ""
        }
        this.stateChange = this.stateChange.bind(this);
        this.request = this.request.bind(this);
    }

    request(e){
        const errors = [];
        if(!this.state.name){
            errors.push("name");
        }
        if(!this.state.email){
            errors.push("email");
        }
        else if(!helpers.validateEmail(this.state.email)){
            errors.push("email");
        }
        if(!this.state.comment){
            errors.push("comment");
        }
        if(errors.length > 0){
            this.setState({errors: errors});
            return false;
        }

        axios.post("support/request", {
            name: this.state.name,
            email: this.state.email,
            comment: this.state.comment
        }).then(response=>{
            console.log(response)
            this.refs.name.value = "";
            this.refs.email.value = "";
            this.refs.comment.value = "";
            this.setState({
                errors: [],
                success: "Ваше сообщение отправлено",
            });
        }).catch(err=>{
            console.log(err);
            this.refs.name.value = "";
            this.refs.email.value = "";
            this.refs.comment.value = "";
            this.setState({
                errors: ["Ошибка сервера. Повторите попытку позже"],
                success: "Ваше сообщение отправлено",
            });
        })
    }

    render(){
        return(
			<div>
				<h2 className="sub-title">Сообщить о проблеме</h2>
				<div className="problem-form">                
					<div className="problem-form__wrap">
						<input className={"input" + (this.state.errors.indexOf("name")!=-1 ? " error":"")} type="text" ref="name" name="name" placeholder="Ваше имя" onChange={this.stateChange}/>
						<input className={"input" + (this.state.errors.indexOf("email")!=-1 ? " error":"")} type="text" ref="email" name="email" placeholder="Ваш E-mail" onChange={this.stateChange} />
						<textarea className={"input textarea" + (this.state.errors.indexOf("comment")!=-1 ? " error":"")} ref="comment" name="comment" placeholder="Расскажите о проблеме" onChange={this.stateChange}></textarea>
					</div>
					<div className="problem-form__message">{this.state.success}</div>
					<button className="btn btn--yello btn--submit" onClick={this.request}>ОТПРАВИТЬ ВОПРОС</button>                    
				</div>
			</div>
        )
    }

    stateChange(e){
        const state = {};
        state[e.target.name] = e.target.value;
        this.setState(state)
    }
}




export default Feedback;