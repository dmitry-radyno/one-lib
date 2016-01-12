import React, { Component } from 'react';
import { PDFViewer } from 'components/PDFViewer';

export class BookForm extends Component {

    constructor(props) {
        super(props);
        this.onChangePage = this.onChangePage.bind(this);
        this.onChangeScale = this.onChangeScale.bind(this);
    }

    onChangePage(page) {
        this.props.updateBookUI({
            page: page
        });
    }

    onChangeScale(scale) {
        this.props.updateBookUI({
            scale: scale
        });
    }

    render() {
        if (this.props.fetching) {
            return <div className="waiting">Loading...</div>;
        } else if (!this.props.book) {
            return <div></div>;
        } else {
            return (
                <div>
                    <h3 className="book-name">{this.props.book.name} - {this.props.book.author}, {this.props.book.year}</h3>
                    <PDFViewer file="documents/1.pdf" page={this.props.page} scale={this.props.scale} onChangePage={this.onChangePage} onChangeScale={this.onChangeScale} enableDownload={true} />
                </div>
            );
        }
    }
}