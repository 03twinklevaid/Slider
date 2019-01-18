import React, { Component } from 'react';
import './App.css';
import Home from './Components/Home';
import PopUp from './Components/PopupScreen'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Home />
        <PopUp />
      </div>
    );
  }
}

export default App;
