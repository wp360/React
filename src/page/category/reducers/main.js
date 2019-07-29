import headerReducer from './headerReducer';
import contentListReducer from './contentListReducer.js';
import scrollViewReducer from 'component/ScrollView/scrollViewReducer';
import {combineReducers} from 'redux';

const reducers = combineReducers({
  headerReducer,
  contentListReducer,
  scrollViewReducer
});

export default reducers;