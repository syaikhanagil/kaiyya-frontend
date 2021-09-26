import { applyMiddleware, createStore } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducer from '../reducer';

const middleware = [
    thunk
];

const store = createStore(reducer, applyMiddleware(...middleware));
// const store = createStore(reducer, applyMiddleware(...middleware));

export default store;
