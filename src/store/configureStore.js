import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers/rootReducer';

export function configureStore(initialState) {
    const middlewares = [];
    const middlewareEnhancer = applyMiddleware(...middlewares);
    const storeEnhancer = [middlewareEnhancer];
    const rootEnhancer = compose(...storeEnhancer);
    const store = createStore(rootReducer, initialState, rootEnhancer);
    return store;
}