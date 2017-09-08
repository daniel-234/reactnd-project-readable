import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Router, Route } from 'react-router';
import createHistory from 'history/createBrowserHistory';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
import reducer from './reducers';
import { Provider } from 'react-redux';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	reducer,
	composeEnhancers(
		/*
		 * Apply `middleware` for logging and to talk to
		 * an asynchronous API.
		 * Redux middleware provides a third-party extension
		 * point between dispatching an action and the moment
		 * it reaches the reducer.
		 * The logger will show us informations every time an
		 * action is dispatched.
		 */
		applyMiddleware(
			thunkMiddleware,
			logger
		)
	)
);

const history = createHistory();

/*
 * Use the `react-redux` bindings to make connecting the Redux store
 * with the React components a lot easier.
 * Wrap the main root component inside of Provider and pass it the
 * store. This way whenever any of the components that the App renders
 * or App itself needs access to Redux store or needs to dispatch an
 * action, it will be able to do that more easily.
 */
ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<Route path='/:category?' component={App} />
		</Router>
	</Provider>,
	document.getElementById('root'));
registerServiceWorker();
