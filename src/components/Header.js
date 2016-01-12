import React, { Component } from 'react';
import { Link } from 'react-router';

export class Header extends Component {
  
    static propTypes = {
        title: React.PropTypes.string
    };
  
    render() {
        return (
            <div className="header">
                <h1>База данных электронных материалов</h1>
            </div>
        );
    }
}