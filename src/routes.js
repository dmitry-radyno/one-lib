import React from 'react';
import { Route, IndexRoute } from 'react-router';

import { App } from 'containers/App';
import { Books } from 'containers/Books';
import { Book } from 'containers/Book';
import { PreBooks } from 'containers/PreBooks';
import { PreBook } from 'containers/PreBook';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Books} />
    <Route path="book/:bookId" component={Book} />
    <Route path="manage" component={PreBooks} />
    <Route path="prebook/:prebookId" component={PreBook} />
  </Route>
);
