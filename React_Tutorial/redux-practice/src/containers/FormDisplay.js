import React from "react";
import "./FormDisplay.css";
import Alldata from "../components/Alldata/Alldata";
import FormEntry from "../components/FormEntry/FormEntry";
class FormDisplay extends React.Component{
    render(){
        return (
            <div>
               
                <FormEntry/>
                <Alldata/>
            </div>
        )
    }
}

export default FormDisplay;