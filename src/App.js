import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as Constants from './Constants'
import './css/bootstrap.min.css'
import './css/bootstrap.css'
import './css/matall.css';
import './css/transition.css'
import Routes from './Routes'
class App extends Component {
  componentWillMount(){

    Constants.url = 'http://localhost:8080' + '/mystockmarket/'
    //Constants.url = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + '/PVPUI/'
    console.log("LOCATION PORT " + Constants.url)
    console.log("LOCATION PORT " + window.location.hostname)
  }
  render() {
    return (
       <div className="App stylesContainer" style={{margin : '2em'}}>
        
        <Routes />

      </div>
    );
  }
}

export default App;
