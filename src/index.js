import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import ReduxToastr from 'react-redux-toastr';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { configureStore } from './store/configureStore';
import ScrollToTop from './common/ScrollToTop';

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <ScrollToTop>
                <ReduxToastr />
                <App />
            </ScrollToTop>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
