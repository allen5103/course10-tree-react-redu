import { combineReducers } from 'redux';
import {
  INIT_DEVICES, SELECT_SUBREDDIT, INVALIDATE_SUBREDDIT,
  REQUEST_POSTS, RECEIVE_POSTS,
} from './actions';

/**
 *
 */
// function init(state = {}, action) {
//   switch (action.type) {
//     case INIT_DEVICES:
//       return {
//         ...state,
//         list: action.deviceList,
//       };
//     default:
//       return state;
//   }
// }


/**
 *
 */
function selectedSubreddit(state = {}, action) {
  switch (action.type) {
    case SELECT_SUBREDDIT:
      return {
        ...state,
        list: action.list,
      };
    default:
      return state;
  }
}

/**
 *
 */
function posts(state = {
  isFetching: false,
  didInvalidate: false,
  items: [],
}, action) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
      return { ...state, didInvalidate: true };
    case REQUEST_POSTS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false,
      };
    case RECEIVE_POSTS:
    default:
      return state;
  }
}

/**
 *
 */
function postsBySubreddit(state = { list: [] }, action) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
    case RECEIVE_POSTS:

      return {
        ...state,
        list: action.list,
      };
    case REQUEST_POSTS:
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  postsBySubreddit,
  selectedSubreddit,
});

export default rootReducer;

// export default init;
