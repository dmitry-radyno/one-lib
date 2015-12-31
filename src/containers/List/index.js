import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { EntitiesList } from 'components/EntitiesList';
import { fetchEntities } from 'actions/entities';

import DocumentMeta from 'react-document-meta';

/* actions */
import * as actionCreators from 'actions/entities';

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
                <h3>Entities list is here</h3>
                <EntitiesList {...this.props} />
            </section>
        );
    }
}
