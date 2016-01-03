import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

//import { fetchEntities } from 'actions/entities';
import * as actionCreators from 'actions/entities';

import DocumentMeta from 'react-document-meta';

import { Header } from 'components/Header';
import { Footer } from 'components/Footer';
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
export class List extends Component {
    static propTypes = {
        dispatch: React.PropTypes.func
    }

    constructor(props) {
        super(props);
        this.props.fetchEntities();
    }

    render() {
        return (
            <section>
                <DocumentMeta {...metaData} />
                <Header title="Список литературы" />
                <EntitiesList {...this.props} />
                <Footer />
            </section>
        );
    }
}
