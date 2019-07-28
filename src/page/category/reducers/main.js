// import scrollViewReducer from 'component/ScrollView/scrollViewReducer';
import headerReducer from './headerReducer';
import {combineReducers} from 'redux';

const reducers = combineReducers({
  headerReducer
  // scrollViewReducer
});

export default reducers;