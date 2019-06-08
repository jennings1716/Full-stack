import React, {Component} from 'react';
import logo from './logo.svg';
import classes from  './App.css';
import Person from "./Person/Person"
// import Radium, { StyleRoot } from "radium";
/*function App() {
  return (
    <div className="App">
      <h1> Hello World </h1>
    </div>
  );
}*/

class App extends Component{

  constructor(){
    super();
    this.onClickHandler = this.onClickHandler.bind(this)
    this.onChangeHandler = this.onChangeHandler.bind(this)
    this.onToggleHandler = this.onToggleHandler.bind(this)
    this.onDeleteHandler = this.onDeleteHandler.bind(this)
  }
  
  state ={
          persons:[{
                  name:"Jennings",
                  id:"1231"
                },
                {
                  name:"Vicky",
                  id:"sda"
                },
                {
                  name:"Queen",
                  id:"asdasd"
                }],
          showDetails:false
  }

  onClickHandler(new_name){
    this.setState({
          persons:[{
                  name:new_name
                },
                {
                  name:"Vicky"
                }]
        })
  }

  onChangeHandler(event,index){
    console.log("Change text",event.target.value)
    let new_val =this.state.persons;
    new_val[index].name = event.target.value;
    this.setState(new_val);
  }

  onToggleHandler(){
    console.log("toggling")
    this.setState({
          showDetails:!this.state.showDetails
        })
  }

  onDeleteHandler(index){
    let persons = [... this.state.persons];
    persons.splice(index,1);
    this.setState({persons})
  }

  render(){
    let persons = null
    let count_class = classes.healthy
    if(this.state.persons.length<3){
      count_class = classes.weak
    }
    if(this.state.showDetails){
         persons =( 
                      <div className={classes.App}>
                        {
                          this.state.persons.map((person,index)=>{
                            return <Person delete={()=>this.onDeleteHandler(index)} change = {(event)=> this.onChangeHandler(event,index)} name={person.name} key={person.id}/>
                          })
                        }
                      </div>
                      );
    }
    return(
     
        <div>
          <div className={classes.toggle}>
            <button className={classes.togbutton} onClick={this.onToggleHandler}>Click Here</button>
          </div>
          <div>
            <p className={count_class}> Number of persons: {this.state.persons.length} </p>
            {persons}
          </div>
        </div>
     
    )
  }
}

export default App;
