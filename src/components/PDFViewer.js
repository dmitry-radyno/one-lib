import React, { Component } from 'react';
import PDF from 'react-pdf';
 
 export class PDFViewer extends Component {
    static propTypes = {
        file: React.PropTypes.string
    };

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            pages: 0,
            scale: 1.2
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
        this.setState({
            page: 1
        });
    }
    onPrevClick() {
        this.setState({
            page: Math.max(1, this.state.page - 1)
        });
    }
    onNextClick() {
        this.setState({
            page: Math.min(this.state.pages, this.state.page + 1)
        });
    }
    onLastClick() {
        this.setState({
            page: this.state.pages
        });
    }
    
    onIncreaseScale() {
        this.setState({
            scale: this.state.scale + 0.1
        });
    }
    
    onDecreaseScale() {
        this.setState({
            scale: Math.max(0.1, this.state.scale - 0.1)
        });
    }

    render() {
        let page = this.state.page;
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
                        <input type="text" value={this.state.scale.toFixed(1)} />
                        <button onClick={this.onIncreaseScale}>+</button>
                    </div>
                    <button className="pdf-viewer__nav-button" onClick={this.onNextClick}>Вперед</button>
                    <button className="pdf-viewer__nav-button" onClick={this.onLastClick}>В конец</button>
                </div>
                <div className="pdf-viewer__content">
                    <PDF file={this.props.file} page={this.state.page} scale={this.state.scale} onDocumentComplete={this.onDocumentComplete} />
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