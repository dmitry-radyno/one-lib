import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import Meta from 'meta';

import * as bookActionCreators from 'actions/books';

import { Header } from 'components/Header';
import { Page } from 'components/Page';
import { Footer } from 'components/Footer';
import { AddBookForm } from 'components/AddBookForm';


@connect(
    dispatch => bindActionCreators(bookActionCreators, dispatch)
)
export class PreBook extends Component {
    static propTypes = {
        dispatch: React.PropTypes.func
    };

    render() {
        return (
            <section>
                <script src="./test.js" />
                <DocumentMeta {...Meta} />
                <Header />
                    <Page>
                        <AddBookForm book={this.props.params.prebookId} {...this.props} />
                    </Page>
                <Footer />
            </section>
        )
    }
}
