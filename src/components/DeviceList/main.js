import React from 'react';
import PropTypes from 'prop-types';
import DeviceListTitle from '../DeviceListTitle/main';
import Device from '../Device/main';
import './style.css';


class DeviceList extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      expanded: true,
      focusId: 0,
    };
    this.list = [];
    this.expandToggle = this.expandToggle.bind(this);
    this.setFocusId = this.setFocusId.bind(this);
  }


  getData() {
    const { initDevices } = this.props;
    const username = 'admin';
    const password = '123456';
    fetch('http://172.16.26.14/Media/Device/getDevice', {
      method: 'get',
      headers: {
        'Content-Type': 'text/plain',
        Authorization: `Basic ${btoa(`${username}:${password}`)}`,
      },
    }).then((res) => res.text()).then((data) => {
      const parser = new DOMParser();
      const xml = parser.parseFromString(data, 'application/xml');
      const devsNode = xml.getElementsByTagName('Device');
      const devs = Array.prototype.slice.call(devsNode);
      devs.forEach((dev) => {
        const d = {};
        d.id = dev.getAttribute('id');
        d.unitType = dev.getElementsByTagName('UnitType')[0].textContent;
        d.name = `${dev.getAttribute('id')} ${dev.getElementsByTagName('Name')[0].textContent}`;
        this.list.push(d);
      });
      initDevices(this.list);
      this.list = [];
    });
  }

  setFocusId(id) {
    this.setState({
      focusId: id * 1,
    });
  }

  expandToggle() {
    const { expanded } = this.state;
    const toggle = !expanded;
    this.setState({
      expanded: toggle,
    });
  }

  render() {
    const { fetchPosts, postsBySubreddit } = this.props;
    const { expanded, focusId } = this.state;
    // console.log(postsBySubreddit);
    return (
      <div className="deviceList">
        <DeviceListTitle
          setFocusId={this.setFocusId}
          focusId={focusId}
          count={postsBySubreddit.list.length}
          expanded={expanded}
          expandToggle={this.expandToggle}
        />
        <ul className="devices" style={{ display: expanded ? 'block' : 'none' }}>
          {postsBySubreddit.list.map((dev) => (
            <Device
              setFocusId={this.setFocusId}
              focusId={focusId}
              key={dev.id}
              id={dev.id}
              name={dev.name}
              unitType={dev.unitType}
            />
          ))}
        </ul>
        <button type="button" onClick={fetchPosts}>click</button>
      </div>
    );
  }
}

DeviceList.propTypes = {
  // list: PropTypes.arrayOf(PropTypes.object),
  initDevices: PropTypes.func.isRequired,
  fetchPosts: PropTypes.func.isRequired,
  postsBySubreddit: PropTypes.shape({ list: PropTypes.array }),
};
DeviceList.defaultProps = {
  postsBySubreddit: {},
};

export default DeviceList;
