import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';
import books from './books';
import { book } from './book';
import { prebooks } from './prebooks';
import prebook from './prebook';

export default combineReducers({
  routing: routeReducer,
  books,
  book,
  prebooks,
  prebook,
});