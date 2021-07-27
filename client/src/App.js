import React, { Component } from "react";
import {Route, BrowserRouter as Router, Switch} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import index from "./Pages/index"
import otherpage from "./Pages/Otherpage"
import login from "./Pages/login"

class App extends Component{

  constructor(props){
    super(props);
    this.state = {apiResponse: ""};
  }

  // callAPI(){
  //   fetch("http://localhost:9000/GBITG")
  //     .then(res => res.text())
  //     .then(res => this.setState({ apiResponse: res }))
  //     .catch(err => err);
  // }

  componentDidMount() {
    //this.callAPI();
  }

render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={index}/>
          <Route path="/otherpage" component={otherpage}/>
          <Route path="/login" component={login}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
