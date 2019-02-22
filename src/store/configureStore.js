import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk';

export function configureStore(initialState) {
    const middlewares = [thunk];
    const middlewareEnhancer = applyMiddleware(...middlewares);
    const storeEnhancer = [middlewareEnhancer];
    const rootEnhancer = compose(...storeEnhancer);
    const store = createStore(rootReducer, initialState, rootEnhancer);
    return store;
}