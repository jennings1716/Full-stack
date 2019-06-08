import React,{Component} from 'react';
import classes from './person.css';
// import Radium, { StyleRoot } from 'radium';
/*class Person extends Component{
    render(){
        return (
            <h1>
                This is person component
            </h1>
        )
    }
}*/

const person = (props)=>{
    const pointer_style  ={
            cursor: "pointer",
            width: "fit-content",
            left: "48%",
            position: "relative",
            border: "1px solid",
            padding: "0px 5px",
            borderRadius: "50%",
            background:"white",
            color:"red"
            
    }
    
     return (
            <div className={classes.personCard}>
                <div onClick={props.delete} style={pointer_style} className={classes.pointer}>X</div>
                <p  >
                    This is person component and Name is {props.name}
                </p>
                <p>
                    {props.children}
                </p>
                <input type="text" onChange={props.change} value={props.name} />
            </div>
        )
}
export default person;