import React, { Component } from 'react';
import io from 'socket.io-client';
import Toggle from 'material-ui/lib/toggle';
import Paper from 'material-ui/lib/paper';

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
      <div className="row center-xs">
        <Paper
          zDepth={3}
          className="col-xs-8 col-md-4 row"
          style={{ paddingTop: '20px' }}
        >
          <Toggle
            onToggle={this._toggleLed}
            label="Toggle LED"
            toggled={this.state.led}
          />
          <p>Led Status: { this.state.led ? 'On' : 'Off' }</p>
        </Paper>
      </div>
    );
  }
}

export default LedControl;
