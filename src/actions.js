export const INIT_DEVICES = 'init_devices';

/**
 * @param deviceList
 */
export function initDevices(deviceList) { return { type: INIT_DEVICES, deviceList }; }

export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT';

/**
 * @param subreddit
 */
export function selectSubreddit(subreddit) {
  return {
    type: SELECT_SUBREDDIT,
    subreddit,
  };
}

export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT';

/**
 * @param subreddit
 */
export function invalidateSubreddit(subreddit) {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit,
  };
}

export const REQUEST_POSTS = 'REQUEST_POSTS';
/**
 * @param subreddit
 */
function requestPosts() {
  return {
    type: REQUEST_POSTS,

  };
}

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
/**
 * @param list
 * @param arr
 */
function receivePosts(list) {
  return {
    type: RECEIVE_POSTS,
    list,
  };
}
/**
 * @param subreddit
 */
export function fetchPosts(subreddit) {
  // Thunk middleware 知道如何去處理 function。
  // 它把 dispatch method 作為參數傳遞給 function，
  // 因此讓它可以自己 dispatch action。

  return function (dispatch) {
    // 第一個 dispatch：更新應用程式 state 以告知
    // API 呼叫開始了。

    dispatch(requestPosts());

    // 被 thunk middleware 呼叫的 function 可以回傳一個值，
    // 那會被傳遞作為 dispatch method 的回傳值。

    // 在這個案例中，我們回傳一個 promise 以等待。
    // 這不是 thunk middleware 所必須的，不過這樣對我們來說很方便。
    const username = 'admin';
    const password = '123456';
    return fetch('http://172.16.26.14/Media/Device/getDevice', {
      method: 'get',
      headers: {
        'Content-Type': 'text/plain',
        Authorization: `Basic ${btoa(`${username}:${password}`)}`,
      },
    }).then((res) => res.text()).then((data) => {
      const list = [];

      const parser = new DOMParser();
      const xml = parser.parseFromString(data, 'application/xml');
      const devsNode = xml.getElementsByTagName('Device');
      const devs = Array.prototype.slice.call(devsNode);
      devs.forEach((dev) => {
        const d = {};
        d.id = dev.getAttribute('id');
        d.unitType = dev.getElementsByTagName('UnitType')[0].textContent;
        d.name = `${dev.getAttribute('id')} ${dev.getElementsByTagName('Name')[0].textContent}`;
        list.push(d);
      });
      //   initDevices(this.list);
      dispatch(receivePosts(list));
      // console.log(list);
    });


    // 在一個真實世界中的應用程式，你也會想要
    // 捕捉任何網路呼叫中的錯誤。
  };
}
