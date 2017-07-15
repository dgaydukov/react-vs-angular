/**
 * Created by diman on 24.06.17.
 */


import React from "react";

import styles from "./module.css";


const SORT_DESC = "SORT_DESC";
const SORT_ASC = "SORT_ASC";

class ReactCustomDataTable extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            sortType: SORT_ASC,
            sortColumn: 0,
        }
    }
    sort(column){
        const sortType = this.state.sortType;
        const newSortType = sortType == SORT_ASC ? SORT_DESC : SORT_ASC;
        this.props.data.body.sort((curr, next)=>{
            if(Number.isInteger(curr[column])){
                if(sortType == SORT_ASC){
                    return curr[column] - next[column];
                }
                else{
                    return next[column] - curr[column];
                }
            }

            else{
                if(sortType == SORT_ASC){

                    return  curr[column].toUpperCase() < next[column].toUpperCase() ? -1 : 1;
                }
                else{
                    return  curr[column].toUpperCase() > next[column].toUpperCase() ? -1 : 1;
                }
            }
        });
        this.setState({
            sortColumn: column,
            sortType: newSortType,
        })
    }
    render(){
        return(
            <table className="table">
                <thead>
                    <tr className="table__tr">
                        {this.props.data.head.map((header, i)=>{
                            let cssClass = "";
                            if(this.state.sortColumn == i){
                                cssClass = " " + (this.state.sortType == SORT_ASC ? styles.sortASC : styles.sortDESC);
                            }
                            return(
                                <th className="table__th table__th--info" key={i}><button onClick={this.sort.bind(this, i)} className={styles.button}>{header}</button><span className={styles.sort + cssClass}/></th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody className="table__tbody">
                    {this.props.data.body.map((row, i)=>{
                        return(
                            <tr key={i} className="table__tr">
                                {row.map((cell, j)=>{
                                    return(<td className="table__td" key={j} dangerouslySetInnerHTML={{__html: cell}} />)
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )
    }
}


export default ReactCustomDataTable;