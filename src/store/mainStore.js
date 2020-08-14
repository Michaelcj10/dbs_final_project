import { createStore, applyMiddleware, compose } from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";
// not using an ES6 transpiler

import { createBrowserHistory } from 'history';

import rootReducer from "../modules/root";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web and AsyncStorage for react-native

export const history = createBrowserHistory();

const initialState = {};

const persistConfig = {
  key: "root",
  storage
};

const enhancers = [];
const middleware = [thunk, routerMiddleware(history)];

if (process.env.NODE_ENV === "development") {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === "function") {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  connectRouter(history)(persistedReducer),
  initialState,
  composedEnhancers
);

let persistor = persistStore(store);

export default { store, persistor };
