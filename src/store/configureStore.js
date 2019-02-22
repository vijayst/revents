import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { getFirestore, reduxFirestore } from 'redux-firestore';
import firebase from '../common/firebase';

export function configureStore(initialState) {
    const middlewares = [thunk.withExtraArgument(getFirestore), logger];
    const middlewareEnhancer = applyMiddleware(...middlewares);
    const storeEnhancers = [middlewareEnhancer, reduxFirestore(firebase)];
    const rootEnhancer = compose(...storeEnhancers);
    const store = createStore(rootReducer, initialState, rootEnhancer);
    return store;
}