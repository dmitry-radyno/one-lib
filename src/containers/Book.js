import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import Meta from 'meta';

import * as bookActionCreators from 'actions/book';

import { Header } from 'components/Header';
import { Page } from 'components/Page';
import { Footer } from 'components/Footer';
import { BookForm } from 'components/BookForm';


@connect(
    state => state.book,
    dispatch => bindActionCreators(bookActionCreators, dispatch)
)
export class Book extends Component {
    static propTypes = {
        dispatch: React.PropTypes.func
    };
    
    constructor(props) {
        super(props);
        this.props.fetchBook(this.props.routeParams.bookId);
    }
    
    componentWillMount() {
        this.props.clearBookPage();
    }
    
    render() {
        
        return (
            <section>
                <DocumentMeta {...Meta} />
                <Header />
                    <Page>
                        <BookForm book={this.props.params.bookId} {...this.props} />
                    </Page>
                <Footer />
            </section>
        )
    }
}
