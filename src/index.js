import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
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
                <App />
            </ScrollToTop>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
