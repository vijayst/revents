import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import ReduxToastr from 'react-redux-toastr';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { configureStore } from './store/configureStore';
import ScrollToTop from './common/ScrollToTop';
import firebase from './common/firebase';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';

const store = configureStore();

const config = {
    userProfile: 'users',
    attachAuthIsReady: true,
    useFirestoreForProfile: true
};

ReactDOM.render(
    <Provider store={store}>
        <ReactReduxFirebaseProvider
            firebase={firebase}
            config={config}
            dispatch={store.dispatch}
            createFirestoreInstance={createFirestoreInstance}
        >
            <BrowserRouter>
                <ScrollToTop>
                    <ReduxToastr />
                    <App />
                </ScrollToTop>
            </BrowserRouter>
        </ReactReduxFirebaseProvider>
    </Provider>,
    document.getElementById('root')
);
