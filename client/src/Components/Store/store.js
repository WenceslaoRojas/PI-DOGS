import { createStore, applyMiddleware, compose } from "redux";
import AppReducer from "../Reducer/Reducer";
import thunk from "redux-thunk";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  /* eslint-disable no-underscore-dangle */
  AppReducer,
  composeEnhancer(applyMiddleware(thunk))
  /* eslint-enable */
);
