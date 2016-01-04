import React, { Component } from 'react';
import DocumentMeta from 'react-document-meta';

import { Header } from 'components/Header';
import { Page } from 'components/Page';
import { Footer } from 'components/Footer';


const metaData = {
  title: 'Redux Easy Boilerplate',
  description: 'Start you project easy and fast with modern tools',
  canonical: 'http://example.com/path/to/page',
  meta: {
    charset: 'utf-8',
    name: {
      keywords: 'react,meta,document,html,tags',
    },
  },
};

export class Book extends Component {
  render() {
    return (
      <section>
        <Header title="Электронный материал" />
        <Page>
          {this.props.params.bookId}
        </Page>
        <Footer />
      </section>
    );
  }
}
