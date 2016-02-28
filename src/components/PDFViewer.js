import React, { Component } from 'react';
import PDF from 'components/PDF';
 
export class PDFViewer extends Component {
    static propTypes = {
        file: React.PropTypes.string,
        page: React.PropTypes.number,
        scale: React.PropTypes.number,
        downloadPages: React.PropTypes.array,
        onChangePage: React.PropTypes.func,
        onChangeScale: React.PropTypes.func,
        onSelectPage: React.PropTypes.func,
        onUnselectPage: React.PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.state = {
            pages: 100,
        };
        this.onDocumentComplete = this.onDocumentComplete.bind(this);
        this.onChangePage = this.onChangePage.bind(this);
        this.onFirstClick = this.onFirstClick.bind(this);
        this.onPrevClick = this.onPrevClick.bind(this);
        this.onNextClick = this.onNextClick.bind(this);
        this.onLastClick = this.onLastClick.bind(this);
        this.onIncreaseScale = this.onIncreaseScale.bind(this);
        this.onDecreaseScale = this.onDecreaseScale.bind(this);
        this.onTogglePage = this.onTogglePage.bind(this);
        this.onClickPage = this.onClickPage.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
    }
    
    onKeyUp(event) {
        if (event.keyCode === 37 && event.ctrlKey) {
            this.onPrevClick();
        }
        if (event.keyCode === 39 && event.ctrlKey) {
            this.onNextClick();
        }
        if (event.keyCode === 187 && event.ctrlKey) {
            this.onIncreaseScale();
            event.preventDefault();
        }
        if (event.keyCode === 189 && event.ctrlKey) {
            this.onDecreaseScale();
            event.preventDefault();
        }
    }
    componentDidMount() {
        document.body.addEventListener("keydown", this.onKeyUp, false);
    }
    componentWillUnmount() {
        document.body.removeEventListener("keydown", this.onKeyUp, false);
    }

    onChangePage(event) {
        var page = parseInt(event.target.value);
        this.props.onChangePage(Math.max(1, Math.min(this.state.pages, page)));
    }
    
    onFirstClick() {
        this.props.onChangePage(1);
    }
    onPrevClick() {
        this.props.onChangePage(Math.max(1, (isNaN(this.props.page) ? 0 : this.props.page) - 1));
    }
    onNextClick() {
        this.props.onChangePage(Math.min(this.state.pages, (isNaN(this.props.page) ? 0 : this.props.page) + 1));
    }
    onLastClick() {
        this.props.onChangePage(this.state.pages);
    }
    onClickPage(event) {
        var page = parseInt(event.target.dataset.page);
        this.props.onChangePage(Math.max(1, Math.min(this.state.pages, page)));
    }

    onIncreaseScale() {
        this.props.onChangeScale(this.props.scale + 0.1);
    }
    
    onDecreaseScale() {
        this.props.onChangeScale(Math.max(0.1, this.props.scale - 0.1));
    }
    showMessage(message) {
        var onShowMessage = this.props.onShowMessage;
        onShowMessage(message);
        window.setTimeout(function() {
            onShowMessage("");
        }, 3000);
    }
    onTogglePage() {
        var downloadPages = this.props.downloadPages,
            isPageAlreadyAdded = downloadPages.indexOf(this.props.page) > -1;

        if (isPageAlreadyAdded) {
            this.props.onUnselectPage(this.props.page);
        } else {
            if (downloadPages.length >= 10) {
                this.showMessage("Нельзя скачать больше 10 страниц!");
            } else {
                this.props.onSelectPage(this.props.page);
            }
        }
        
    }

    render() {
        let downloadButton = "",
            isPageSelected = (this.props.downloadPages || []).indexOf(this.props.page) > -1,
            selectButton = "",
            message = <div className="pdf-viewer__message">{this.props.message}</div>,
            downloadPages = "";
            
        if (this.props.enableDownload) {
            downloadButton = <button className="pdf-viewer__nav-button" onClick={this.onDownloadClick}>Скачать</button>;
            selectButton = <button className="pdf-viewer__nav-button pdf-viewer__nav-button_wide" onClick={this.onTogglePage}>{isPageSelected ? "Убрать страницу" : "Выбрать страницу"}</button>;

            if (this.props.downloadPages.length) {
                downloadPages = <div className="pdf-viewer__page-list">Выбранные страницы: 
                    {this.props.downloadPages.sort(function(a, b) {
                        return a > b ? 1 : -1;
                    }).map((page, index) =>
                        <span className="pdf-viewer__page" onClick={this.onClickPage} data-page={page}>{page}</span>
                    )}
                </div>;
            }
        }

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
                    <button className="pdf-viewer__nav-button" onClick={this.onLastClick}>В конец</button>
                    <div className="pdf-viewer__pages">
                        <button onClick={this.onPrevClick}>&lt;</button>
                        <input type="text" value={page} onChange={this.onChangePage} />
                        <span>/ {this.state.pages}</span>
                        <button onClick={this.onNextClick}>&gt;</button>
                    </div>
                    <div className="pdf-viewer__scale">
                        <button onClick={this.onDecreaseScale}>-</button>
                        <input type="text" value={this.props.scale.toFixed(1)} readOnly />
                        <button onClick={this.onIncreaseScale}>+</button>
                    </div>
                    {this.props.enableDownload ? downloadButton : ""}
                    {this.props.enableDownload ? selectButton : ""}
                    {downloadPages}
                </div>
                <div className="pdf-viewer__content">
                    <PDF file={this.props.file} page={this.props.page} scale={this.props.scale} onDocumentComplete={this.onDocumentComplete} />
                </div>
                {this.props.message ? message : ""}
            </div>
        );
     }

     onDocumentComplete(pages) {
        this.setState({
            pages: pages
        });
    }
 }