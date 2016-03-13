import React, { Component } from 'react';
import io from 'socket.io-client';

const socket = io();

class LedControl extends Component {

  constructor() {
    super();
    this.state = {};
    this._getStatus = this._getStatus.bind(this);
  }

  componentDidMount() {
    socket.on('led:status', this._getStatus);
  }

  _getStatus(stat) {
    this.setState({ led: stat });
  }

  _toggleLed() {
    socket.emit('led:toggle', true);
  }

  render() {
    return (
      <div>
        <button onClick={this._toggleLed}>Toggle Led</button>
        <p>Led Status: { this.state.led ? 'On' : 'Off' }</p>
      </div>
    );
  }
}

export default LedControl;
