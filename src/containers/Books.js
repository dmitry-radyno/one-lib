import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as booksActionCreators from 'actions/books';

import DocumentMeta from 'react-document-meta';
import Meta from 'meta';

import { Header } from 'components/Header';
import { Footer } from 'components/Footer';
import { Page } from 'components/Page';
import { Toolbar } from 'components/Toolbar';
import { BooksList } from 'components/BooksList';
import { SearchInput } from 'components/SearchInput';


@connect(
  state => state.books,
  dispatch => bindActionCreators(booksActionCreators, dispatch)
)
export class Books extends Component {
    static propTypes = {
        dispatch: React.PropTypes.func
    };

    constructor(props) {
        super(props);
        this.props.fetchBooks();
        this.onSearchChange = this.onSearchChange.bind(this);
    }

    onSearchChange(searchValue) {
        this.props.fetchBooks(searchValue);
    }

    render() {
        return (
            <section>
                <DocumentMeta {...Meta} />
                <Header title="Список литературы" />
                <Page>
                    <Toolbar>
                        <div className="toolbar-left"><SearchInput onChange={this.onSearchChange} /></div>
                        <div className="toolbar-label toolbar-right">Всего электронных материалов: {this.props.books.length}</div>
                    </Toolbar>
                    <BooksList books={this.props.books} />
                </Page>
                <Footer />
            </section>
        );
    }
}
