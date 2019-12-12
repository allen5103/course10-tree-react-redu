import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import reducer from './reducer';

const loggerMiddleware = createLogger();

const init = { list: [] };
// console.log(applyMiddleware);
const store = createStore(reducer, applyMiddleware(
  thunkMiddleware, // 讓我們來 dispatch() function
  //   loggerMiddleware, // 巧妙的 middleware，用來 log action
));
export default store;
