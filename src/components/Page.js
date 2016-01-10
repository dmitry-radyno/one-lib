import React, { Component } from 'react';

export class Page extends Component {
        render() {
                return (
                        <div className="page">
                                {this.props.children}
                        </div>
                );
        }
}