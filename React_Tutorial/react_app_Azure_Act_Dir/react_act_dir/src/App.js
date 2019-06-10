import React,{Component} from 'react';
import './App.css';
import {authContext, adalGraphFetch } from './adalconfig';


class App extends Component {
   state = {
    apiResponse: ''
  };

  componentDidMount() {

    // We're using Fetch as the method to be called, and the /me endpoint 
    // from Microsoft Graph as the REST API request to make.
    adalGraphFetch(fetch, 'https://graph.microsoft.com/v1.0/me', {})
      .then((response) => {

        // This is where you deal with your API response. In this case, we            
        // interpret the response as JSON, and then call `setState` with the
        // pretty-printed JSON-stringified object.
        // console.log("response",response.json());
        response.json()
          .then((responseJson) => {
            console.log("response",responseJson);
            this.setState({ apiResponse: JSON.stringify(responseJson, null, 2) })
          });
      })
      .catch((error) => {

        // Don't forget to handle errors!
        console.error(error);
      })
  }

  logout(){
    console.log("Logging out");
    authContext.logOut()
   }
  
   render(){
    return (
    <div className="App">
      <h1>Hiii</h1>
      <button onClick={this.logout  }>Logout</button>
    </div>
  );
  }
  
}
export default App;
