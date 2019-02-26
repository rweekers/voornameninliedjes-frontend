import React, { Component } from 'react';
import './Songdetail.css';

class Songdetail extends Component {
  render() {
    return (
      <div className="Songdetail">
        <p>{this.props.song}</p>
      </div>
    );
  }
}

export default Songdetail;
