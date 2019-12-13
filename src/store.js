import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import reducer from './reducer';

const loggerMiddleware = createLogger();

const store = createStore(reducer, applyMiddleware(
  thunkMiddleware, loggerMiddleware,
));
export default store;
