export const RECEIVE_POSTS = 'RECEIVE_POSTS';
/**
 * @param list
 */
function receivePosts(list) {
  return {
    type: RECEIVE_POSTS,
    list,
  };
}

/**
 *
 */
export function getDeviceList() {
  return function (dispatch) {
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
      // console.log(list);
      dispatch(receivePosts(list));
    });
  };
}
