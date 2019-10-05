import React from "react";
import "./FormEntry.css";
import {connect} from 'react-redux';
import actions from "../../actions";
class FormEntry extends React.Component{
    constructor(props){
        super(props)
        this.title="";
        this.text = ""
        this.submitForm = this.submitForm.bind(this);
    }
    submitForm(){
        const { dispatch } = this.props; 
        if (!this.title.value.trim()) {
            return
          }
        if(this.props.dataplaceReducers.index!=null){
            console.log("PUTTING DATA XXXX",this.title.value);
            console.log("PUTTING DATA XXXX",this.text.value);
            dispatch(actions.putAction(
                                        this.props.dataplaceReducers.index,
                                       {"title":this.title.value,"text":this.text.value
                                    }))
            this.title.value=""
            this.text.value=""
        }else{
            console.log("POSTING DATA XXXX");
            dispatch(actions.postAction({"title":this.title.value,"text":this.text.value}))
            this.title.value=""
            this.text.value=""
        }

       
    }

    render(){
        console.log("received_Data",this.props.dataplaceReducers[0])
        if(this.props.dataplaceReducers.index!=null){
            this.title.value=this.props.dataplaceReducers.data.title
            this.text.value=this.props.dataplaceReducers.data.text
        }
       
        return (
            <div>
                <div>
                    <input type="text" ref={node => (this.title = node)} className="title"/>
                </div>
                <div>
                    <input type="text" ref={node => (this.text = node)} className="textarea"/>
                </div>
                <button onClick={this.submitForm}>Submit</button>
            </div>
        )
    }
}
function mapStateToProps(state){
    console.log(state)
    return state
}
FormEntry = connect(mapStateToProps)(FormEntry);
export default FormEntry;