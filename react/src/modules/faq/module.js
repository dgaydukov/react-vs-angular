
import React from 'react'
import { Link } from 'react-router-dom';

class Faq extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            opened: [0]
        }
    }


    toggleAnswer(i){
        const opened = this.state.opened.slice();
        var index = opened.indexOf(i);
        if(index == -1){
            opened.push(i);
        }
        else{
            opened.splice(index,1);
        }
        this.setState({opened: opened});
    }

    render(){
        return(
        <div className="faq">
            <h2 className="sub-title">Вопросы и ответы</h2>
            <div className="faq__wrap">
                {getFaqList().map((item,i)=>{
                    const opened = this.state.opened.indexOf(i) != -1;
                    return(
                        <div key={i} className="faq__group">
                            <h3 className={"faq__title" + (opened ? " active":"")} onClick={this.toggleAnswer.bind(this, i)}>{item.question}</h3>
                            <div className={"faq__txt" + (opened ? " show" : "")}>
                                <p dangerouslySetInnerHTML={{__html: item.answer}} />
                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
        )
    }
}

const getFaqList = () => {
    return [
        
    ];
}

export default Faq;