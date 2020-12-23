import './index.css';
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
// import { createStore, applyMiddleWare } from 'redux';
// import { Provider } from 'react-redux';
// import logger from 'redux-logger';
// import thunk from 'redux-thunk';
// import reducer from './store/reducers/postReducers';
import { BrowserRouter as Router } from 'react-router-dom'

// const store = createStore(reducer, applyMiddleWare(thunk, logger))
ReactDOM.render(
  <Router>
    {/* <Provider store={store}> */}
    <App />
    {/* </Provider> */}
  </Router>,
  document.getElementById('root')
);
