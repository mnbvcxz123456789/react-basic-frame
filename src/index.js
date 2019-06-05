
import React from 'react';
import ReactDom from 'react-dom';
import getRouter from 'router/router';
import { Provider } from 'react-redux';
import store from './redux/store';

if(module.hot) {
    module.hot.accept();
}

ReactDom.render(
    <Provider store={store}>
        {getRouter()}
    </Provider>
    , document.getElementById('app'));