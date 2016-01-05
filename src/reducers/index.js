import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';
import { entities as books } from './books';

export default combineReducers({
  routing: routeReducer,
  books,
})