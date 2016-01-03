import React, { Component } from 'react';
import { Link } from 'react-router';
//import 'bootstrap-webpack';

export class Header extends Component {
  
  static propTypes = {
    title: React.PropTypes.string
  }
  
  render() {
    return (
      <div className="header">
        <h1>Библиотека ВГКС - {this.props.title}</h1>
      </div>
    );
  }
}