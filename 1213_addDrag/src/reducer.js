// import { combineReducers } from 'redux';
import {
  RECEIVE_POSTS,
} from './actions';

/**
 *
 */
function getDeviceList(state = {}, action) {
  switch (action.type) {
    case RECEIVE_POSTS:
      return {
        ...state,
        list: action.list,
      };
    default:
      return state;
  }
}

export default getDeviceList;

// export default init;
