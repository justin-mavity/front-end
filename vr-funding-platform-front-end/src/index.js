import "./index.css";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { PostReducers } from "./store/reducers/PostReducers";
import { BrowserRouter as Router } from "react-router-dom";

const store = createStore(PostReducers, applyMiddleware(thunk, logger));
ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById("root")
);
