import React, { Component } from 'react';
import { PDFViewer } from 'components/PDFViewer';

export class BookForm extends Component {

    constructor(props) {
        super(props);
    }

    onChangePage(page) {
        this.props.updateBookUI({
            page: page
        });
        if (this.props.message) {
            this.props.showMessage("");
        }
    }

    onChangeScale(scale) {
        this.props.updateBookUI({
            scale: scale
        });
    }
    
    onSelectPage(page) {
        this.props.addDownloadPage(page);
    }
    
    onUnselectPage(page) {
        this.props.removeDownloadPage(page);
    }
    
    onShowMessage(message) {
        this.props.showMessage(message);
    }

    render() {
        if (this.props.fetching) {
            return <div className="waiting">Loading...</div>;
        } else if (!this.props.book) {
            return <div></div>;
        } else {
            var pdfProps = {
                file: "documents/" + this.props.book.file,
                page: this.props.page,
                scale: this.props.scale,
                message: this.props.message,
                enableDownload: true,
                downloadPages: this.props.downloadPages,
                onChangePage: this.onChangePage.bind(this),
                onChangeScale: this.onChangeScale.bind(this),
                onSelectPage: this.onSelectPage.bind(this),
                onUnselectPage: this.onUnselectPage.bind(this),
                onShowMessage: this.onShowMessage.bind(this),
            };
            return (
                <div>
                    <h3 className="book-name">{this.props.book.name} - {this.props.book.author}, {this.props.book.year}</h3>
                    <PDFViewer {...pdfProps}  />
                </div>
            );
        }
    }
}