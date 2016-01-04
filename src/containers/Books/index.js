import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

//import { fetchEntities } from 'actions/entities';
import * as actionCreators from 'actions/entities';

import DocumentMeta from 'react-document-meta';

import { Header } from 'components/Header';
import { Footer } from 'components/Footer';
import { Page } from 'components/Page';
import { Toolbar } from 'components/Toolbar';
import { BooksList } from 'components/BooksList';
import { SearchInput } from 'components/SearchInput';
import { EntitiesList } from 'components/EntitiesList';


const metaData = {
  title: 'One lib',
  description: 'Start you project easy and fast with modern tools.',
  meta: {
    charset: 'utf-8',
    name: {
      keywords: 'react,meta,document,html,tags',
    },
  },
};

@connect(
  state => state.entities,
  dispatch => bindActionCreators(actionCreators, dispatch)
)
export class Books extends Component {
    static propTypes = {
        dispatch: React.PropTypes.func
    }

    constructor(props) {
        super(props);
        this.props.fetchEntities();
    }

    render() {
        const books = [
            {id: 1, author: "Саймон Сингх", name: "Книга шифров", year: 2009},
            {id: 2, author: "Энди Уир", name: "Марсианин", year: 2015},
            {id: 3, author: "Стивен Хокинг", name: "Будущее пространства-времени", year: 2012}
        ];
        return (
            <section>
                <DocumentMeta {...metaData} />
                <Header title="Список литературы" />
                <Page>
                    <Toolbar>
                        <div className="toolbar-left"><SearchInput /></div>
                        <div className="toolbar-label toolbar-right">Всего электронных материалов: {books.length}</div>
                    </Toolbar>
                    <BooksList books={books} />
                </Page>
                <Footer />
            </section>
        );
    }
}
