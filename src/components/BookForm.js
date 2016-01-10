import React, { Component } from 'react';

export class BookForm extends Component {

    render() {
        if (this.props.fetching) {
            return <div className="waiting">Loading...</div>;
        } else if (!this.props.book) {
            return <div></div>;
        } else {
            return (
                <div>
                    <h3 className="book-name">{this.props.book.name} - {this.props.book.author}, {this.props.book.year}</h3>
                    <div>PDF preview is here</div>
                </div>
            );
        }
    }
}