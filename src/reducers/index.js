import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';
import { reducer as formReducer } from 'redux-form';
import { items } from './items';
import { entities } from './entities';

const rootReducer = combineReducers({
  form: formReducer,
  routing: routeReducer,
  /* your reducers */
  items,
  entities,
});

export default rootReducer;
