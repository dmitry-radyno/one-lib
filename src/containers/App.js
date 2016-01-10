import React, { Component } from 'react';

import './app.scss';

export class App extends Component {
  static propTypes = {
    children: React.PropTypes.any,
  };
  
  constructor(props) {
      super(props);
      
  }
  
  render() {
      
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
