import React, { Component } from 'react';
import SearchLocation from './components/searchLocation';

class App extends Component {
  render(){
    return (
      <div className="App container text-center">
        <a href="/"><h1 id="heading">WeatherToday</h1></a>
        <SearchLocation /> 
      </div>
    );
  }
  
}

export default App;
