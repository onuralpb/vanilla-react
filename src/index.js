import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import thunk from "redux-thunk";
import { compose, applyMiddleware, combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import logger from "redux-logger";
import userReducer from "./reducers/userReducer";
import albumsReducer from "./reducers/albumsReducer";
import photosReducer from "./reducers/photosReducer";
import productsReducer from "./reducers/productsReducer";

const allEnhancers = compose(
	applyMiddleware(thunk, logger),
	window.navigator.userAgent.includes("Chrome")
		? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
		: compose
);
const rootReducer = combineReducers({
	user     : userReducer,
	albums   : albumsReducer,
	photos   : photosReducer,
	products : productsReducer,
});

const store = createStore(
	rootReducer,
	{
		user : "Lorem",
	},
	allEnhancers
);

console.log("index.js > store.getState : ", store.getState());
ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
);

serviceWorker.unregister();
