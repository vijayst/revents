import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { getFirebase } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';

export function configureStore(initialState) {
    const middlewares = [thunk.withExtraArgument({ getFirebase, getFirestore }), logger];
    const middlewareEnhancer = applyMiddleware(...middlewares);
    const storeEnhancers = [middlewareEnhancer];
    const rootEnhancer = compose(...storeEnhancers);
    const store = createStore(rootReducer, initialState, rootEnhancer);
    return store;
}