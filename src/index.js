import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore,compose, applyMiddleware, combineReducers } from 'redux';
import burgerBuilder from './store/reducers/burgerBuilder';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import order from './store/reducers/order';

const rootReducer = combineReducers({burgerBuilder: burgerBuilder,order: order});


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));



ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
