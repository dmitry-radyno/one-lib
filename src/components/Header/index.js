import React, { Component } from 'react';
import { Link } from 'react-router';
//import 'bootstrap-webpack';

import { styles } from './header.scss';

export class Header extends Component {
  render() {
    return (
      <div className={`${styles}`}>
        I'm header
        <Link to="/">Home</Link>
        <Link to="/list">List</Link>
      </div>
    );
  }
}
