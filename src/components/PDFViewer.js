import React, { Component } from 'react';
import PDF from 'react-pdf';
 
 export class PDFViewer extends Component {
    static propTypes = {
        file: React.PropTypes.string,
        page: React.PropTypes.number,
        scale: React.PropTypes.number,
        onChangePage: React.PropTypes.func,
        onChangeScale: React.PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.state = {
            pages: 0,
        };
        this.onDocumentComplete = this.onDocumentComplete.bind(this);
        this.onChangePage = this.onChangePage.bind(this);
        this.onFirstClick = this.onFirstClick.bind(this);
        this.onPrevClick = this.onPrevClick.bind(this);
        this.onNextClick = this.onNextClick.bind(this);
        this.onLastClick = this.onLastClick.bind(this);
        this.onIncreaseScale = this.onIncreaseScale.bind(this);
        this.onDecreaseScale = this.onDecreaseScale.bind(this);
    }

    onChangePage(event) {
        var page = parseInt(event.target.value);
        this.setState({
            page: page
        });
    }
    
    onFirstClick() {
        this.props.onChangePage(1);
    }
    onPrevClick() {
        this.props.onChangePage(Math.max(1, this.props.page - 1));
    }
    onNextClick() {
        this.props.onChangePage(Math.min(this.state.pages, this.props.page + 1));
    }
    onLastClick() {
        this.props.onChangePage(this.state.pages);
    }

    onIncreaseScale() {
        this.props.onChangeScale(this.props.scale + 0.1);
    }
    
    onDecreaseScale() {
        this.props.onChangeScale(Math.max(0.1, this.props.scale - 0.1));
    }

    render() {
        let page = this.props.page;
        if (isNaN(page)) {
            page = "";
        } else {
            page = Math.min(Math.max(1, page), this.state.pages);
        }
        return (
            <div className="pdf-viewer">
                <div className="pdf-viewer__toolbar">
                    <button className="pdf-viewer__nav-button" onClick={this.onFirstClick}>В начало</button>
                    <button className="pdf-viewer__nav-button" onClick={this.onPrevClick}>Назад</button>
                    <div className="pdf-viewer__pages">
                        <input type="text" value={page} onChange={this.onChangePage} />
                        <span>/ {this.state.pages}</span>
                    </div>
                    <div className="pdf-viewer__scale">
                        <button onClick={this.onDecreaseScale}>-</button>
                        <input type="text" value={this.props.scale.toFixed(1)} />
                        <button onClick={this.onIncreaseScale}>+</button>
                    </div>
                    <button className="pdf-viewer__nav-button" onClick={this.onNextClick}>Вперед</button>
                    <button className="pdf-viewer__nav-button" onClick={this.onLastClick}>В конец</button>
                </div>
                <div className="pdf-viewer__content">
                    <PDF file={this.props.file} page={this.props.page} scale={this.props.scale} onDocumentComplete={this.onDocumentComplete} />
                </div>
            </div>
        );
     }

     onDocumentComplete(pages) {
        this.setState({
            pages: pages
        });
    }
 }