import React, { Component } from 'react';
import Conway from '../../services/Conway.js';
import './App.css';
import Grid from '../grid/Grid';
import Controls from '../controls/Controls';
import * as messageBus from '../../services/message-bus.js';

class App extends Component {

  constructor(props) {
    super(props)
    this.conway = Conway.random(100,100,.2);
    setInterval(() =>{
      this.conway = this.conway.next();
      messageBus.publish('update');
    },30)
  }

  render() {
    return (
      <div className="App">
        <Grid grid={this.conway} />
        <Controls grid={this.conway} />
      </div>
    );
  }
}

export default App;
