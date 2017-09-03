import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { fetchAllPosts } from './actions';
import reducer from './reducers';
import { Provider } from 'react-redux';

const store = createStore(
	reducer,
	applyMiddleware(
		thunkMiddleware
	)
	// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// Use the `react-redux` bindings to make connecting the Redux store
// with the React components a lot easier.
// Wrap the main root component inside of Provider and pass it the store.
// This way whenever any of the components that the App renders or App itself
// needs access to Redux store or needs to dispatch an action, it will be able
// to do that more easily.
ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root'));
registerServiceWorker();

// store
// 	.dispatch(fetchAllPosts())
// 	.then(() => console.log(store.getState()));