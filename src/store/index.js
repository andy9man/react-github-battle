import {createStore, compose, applyMiddleware} from 'redux';
//import logger from 'redux-logger';
import {reducer} from './reducer.js';
import thunk from 'redux-thunk';
//import {API_URL} from './actions';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(thunk)
    //applyMiddleware(thunk, logger)
  )
)