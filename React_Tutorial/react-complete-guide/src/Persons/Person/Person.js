import React,{Component} from 'react';
import classes from './person.css';

// import Radium, { StyleRoot } from 'radium';
class Person extends Component{
    render(){
        const pointer_style  = {
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
                <div onClick={this.props.delete} style={pointer_style} className={classes.pointer}>X</div>
                <p  >
                    This is person component and Name is {this.props.name}
                </p>
                <p>
                    {this.props.children}
                </p>
                <input type="text" onChange={this.props.change} value={this.props.name} />
            </div>
        )
    }
}


export default Person;