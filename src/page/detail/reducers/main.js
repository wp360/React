import tabReducer from './tabReducer.js';
import menuReducer from './menuReducer.js';
import {combineReducers} from 'redux';

const reducers = combineReducers({
  tabReducer,
  menuReducer
});

export default reducers;