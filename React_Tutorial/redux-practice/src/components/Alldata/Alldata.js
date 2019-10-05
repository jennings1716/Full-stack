import React from "react";
import {connect} from "react-redux";
import EachData from "./EachData/EachData";
import "./Alldata.css"
class Alldata extends React.Component{
    constructor(props){
        super(props);
        console.log("props",props)
    }
    
    render(){
        console.log("this.props in render",this.props)
        return (
            <div className="all-data-container">
                {
                    this.props.dataReducers.map((data,index)=>{
                        return <EachData alldata ={this.props.dataReducers} data={data} index={index}/>
                    })
                }
              
            </div>
        )
    }
}
function mapStateToProps(state){
    console.log(state)
    return state
}
Alldata = connect(mapStateToProps)(Alldata);
export default Alldata;