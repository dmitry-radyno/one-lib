import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import * as preBooksActionCreators from 'actions/prebooks';

import DocumentMeta from 'react-document-meta';
import Meta from 'meta';

import { Header } from 'components/Header';
import { Footer } from 'components/Footer';
import { Page } from 'components/Page';
import { Toolbar } from 'components/Toolbar';


@connect(
  state => state.prebooks,
  dispatch => bindActionCreators(preBooksActionCreators, dispatch)
)
export class PreBooks extends Component {
    static propTypes = {
        dispatch: React.PropTypes.func
    };

    constructor(props) {
        super(props);
        this.props.fetchPreBooks();
    }

    render() {
        const prebooks = this.props.data;
        return (
            <section>
                <DocumentMeta {...Meta} />
                <Header title="Список литературы" />
                <Page>
                    <Toolbar>
                        <div className="toolbar-label toolbar-right">Осталось добавить: {prebooks.length}</div>
                    </Toolbar>
                    <table className="booksList">
                        <tbody>
                            {
                                prebooks.map((prebook, index) => 
                                    <tr className={index%2 === 0 ? "odd" : "even"} key={index}>
                                        <td className="textLeft">
                                            <Link to={`prebook/${prebook.filename}`}>
                                                {prebook.filename}
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </Page>
                <Footer />
            </section>
        );
    }
}
