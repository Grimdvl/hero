// import { createStore, combineReducers } from 'redux';
// import reducer from '../reducers';
// import heroes from '../reducers/heroes';
// import filters from '../reducers/filters';
// import heroes from '../components/heroesList/heroesSlice';
// const enhancer = (createStore) => (...args) => {
//     const store = createStore(...args);

//     const oldDispatch = store.dispatch;
//     store.dispatch = (action) => {
//         if (typeof action === 'string') {
//             return oldDispatch({
//                 type: action
//             })
//         }
//         return oldDispatch(action);
//     }
// }
// const store = createStore(
//     // reducer,
//     combineReducers({heroes, filters}),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

import filters from '../components/heroesFilters/filtersSlice';
import { apiSlice } from '../api/apiSlice'; 
import { configureStore } from '@reduxjs/toolkit';

const stringMiddleware = () => (next) => (action) => {
    if (typeof action === 'string') {
        return next({
            type: action
        })
    }
    return next(action)
};

const store = configureStore({
    reducer: {/*heroes,*/ filters,
                [apiSlice.reducerPath]: apiSlice.reducer},
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware, apiSlice.middleware),
    devTools: process.env.NODE_ENV !== 'production',
})

export default store;