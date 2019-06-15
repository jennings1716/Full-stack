import React,{Component} from 'react';
import Person from "./Person/Person"
import classes from './Persons.css';


class Persons extends Component{
    constructor(){
        super();
        console.log("Persons constructor");
    }

    getDerivedStateFromProps(props,state){
        console.log("Persons.js getDerivedStateFromProps ");
        return state
    }

    shouldComponentUpdate(nextprops,nextState){
        console.log("Persons.js shouldComponentUpdate ");
        return true
    }

    getSnapshotBeforeUpdate(prevProps,prevState){
        console.log("Persons.js getSnapShotBeforeUpdate ")
        return {message:"NEW message"}
    }


    componentDidUpdate(prevProps,prevState,message){
        console.log("Persons.js componentDidUpdate ",message);
    }

    render(){
        console.log("Persons render");
        return(
            <div className={classes.App} >
                {
                    this.props.person_array.map((person,index)=>{
                    return <Person delete={()=>this.props.delete(index)} change = {(event)=> this.props.change(event,index)} 
                        name={person.name} key={person.id}/>
                    })
                }
            </div>
        );
    }
}

export default Persons;