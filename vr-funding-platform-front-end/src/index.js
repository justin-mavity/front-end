import "./index.css";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { PostReducer } from "./store/reducers/postReducers";
import { BrowserRouter as Router } from "react-router-dom";

const store = createStore(PostReducer, applyMiddleware(thunk, logger));
ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById("root")
);
