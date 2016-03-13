import React, { Component } from 'react';
import io from 'socket.io-client';


const socket = io();

class LedToggle extends Component {

  constructor () {
    super();
    this.state = {};

    this.toggleLed = this.toggleLed.bind(this);
  }

  toggleLed () {
    socket.emit('led:toggle', true);
  }

  render () {
    return (
      <button onClick={this.toggleLed}>Toggle LED</button>
    );
  }
}

export default LedToggle;
