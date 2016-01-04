import React from 'react';
import { Route, IndexRoute } from 'react-router';

/* containers */
import { App } from 'containers/App';
import { Books } from 'containers/Books';
import { Book } from 'containers/Book';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Books} />
    <Route path="book/:bookId" component={Book} />
  </Route>
);
