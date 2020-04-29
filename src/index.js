import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import thunk from 'redux-thunk';
import { compose, applyMiddleware, combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import { AppContainer } from 'react-hot-loader';

//Reducers
import userReducer from './reducers/userReducer';
import albumsReducer from './reducers/albumsReducer';
import photosReducer from './reducers/photosReducer';
import productsReducer from './reducers/productsReducer';
import usersReducer from './reducers/usersReducer';

const allEnhancers = compose(
	applyMiddleware(thunk, logger),
	window.navigator.userAgent.includes('Chrome')
		? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
		: compose
);
const rootReducer = combineReducers({
	user     : userReducer,
	albums   : albumsReducer,
	photos   : photosReducer,
	products : productsReducer,
	users    : usersReducer,
});

const store = createStore(
	rootReducer,
	{
		user : 'Lorem',
	},
	allEnhancers
);

console.log('index.js > store.getState : ', store.getState());
const render = ReactDOM.render(
	<AppContainer>
		<Provider store={store}>
			<App />
		</Provider>
	</AppContainer>,
	document.getElementById('root')
);
if (module.hot) {
	module.hot.accept('./App', render);
}
serviceWorker.unregister();
