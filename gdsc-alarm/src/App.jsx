import React, { Component } from 'react'
import "./App.css"
import Timers from './Timers';
class App extends Component {
  render() {
    return (
      <div className="App">
        <Timers />
      </div>
    )
  }
}

export default App;