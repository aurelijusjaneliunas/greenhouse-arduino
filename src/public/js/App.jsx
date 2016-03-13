import React, { Component } from 'react';
import io from 'socket.io-client';

import LedToggle from './LedToggle';

class App extends Component {

  constructor () {
    super();
    this.state = {};
    this._ledToggle = this._ledToggle.bind(this);
  }

  componentDidMount () {
    const socket = io();
    socket.on('led:status', this._ledToggle);
  }

  _ledToggle (stat) {
    this.setState({'led': stat});
  }

  render () {
    return (
      <div>
        <LedToggle />
        <p>Led Status: { this.state.led ? 'On' : 'Off' }</p>
      </div>
    );
  }
}

export default App;
