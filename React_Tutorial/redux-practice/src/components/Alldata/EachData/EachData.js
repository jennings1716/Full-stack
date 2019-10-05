import React from "react";
import "./EachData.css"
import {connect} from 'react-redux';
import actions from "../../../actions";
class EachData extends React.Component{
    constructor(props){
        super(props);
        
    }
    EditGivenData(index){
        console.log('EDIT FIRED')
        this.props.dispatch(actions.placeData(this.props.alldata,index))
    }
    deleteGivenData(event,index){
        event.preventDefault()
        console.log('DELETE FIRED')
        this.props.dispatch(actions.deleteAction(index))
        event.stopPropagation();
    }
    render(){
        let index = this.props.index
        return (
            <div className="Each-Container" onClick={()=>this.EditGivenData(index)}>
                
                <div className="title-cont">
                    <div className="title-div">Title</div>
                    <div className="title-val">{this.props.data.title}</div>
                </div>
                <div className="text-cont">
                    <div className="text-div">Text</div>
                    <div className="text-val">{this.props.data.text}</div>
                </div>
                <div onClick={(event)=>this.deleteGivenData(event,index)}>Delete</div>
            </div>
        )
    }
}
export default connect()(EachData);