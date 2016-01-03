import React, { Component } from 'react';
import 'bootstrap-webpack';

/* global styles for app */
import './styles/app.scss';

export class App extends Component {
  static propTypes = {
    children: React.PropTypes.any,
  }
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
