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
    const { getDeviceList, list } = this.props;
    const { expanded, focusId } = this.state;
    // console.log(getDeviceList);
    // getDeviceList();
    return (
      <div className="deviceList">
        <DeviceListTitle
          setFocusId={this.setFocusId}
          focusId={focusId}
          count={list.length}
          expanded={expanded}
          expandToggle={this.expandToggle}
        />
        <ul className="devices" style={{ display: expanded ? 'block' : 'none' }}>
          {list.map((dev) => (
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
        <button type="button" onClick={getDeviceList}>click</button>
      </div>
    );
  }
}

DeviceList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  // initDevices: PropTypes.func.isRequired,
  getDeviceList: PropTypes.func.isRequired,
  // postsBySubreddit: PropTypes.shape({ list: PropTypes.array }),
};
DeviceList.defaultProps = {
  // postsBySubreddit: { list: [] },
};

export default DeviceList;
