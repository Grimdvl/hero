import { createStore, combineReducers } from 'redux';
// import reducer from '../reducers';
import heroes from '../reducers/heroes';
import filters from '../reducers/filters';

const store = createStore(
    // reducer,
    combineReducers({heroes, filters}),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;