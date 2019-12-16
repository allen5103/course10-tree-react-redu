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
      drag: false,
      dragText: '',
    };
    this.x = 0;
    this.y = 0;
    this.drag = false;
    this.dragTextBox = React.createRef();
    this.expandToggle = this.expandToggle.bind(this);
    this.setDragText = this.setDragText.bind(this);
    this.setFocusId = this.setFocusId.bind(this);
    this.getMousesPosition = this.getMousesPosition.bind(this);
    this.dragTextMove = this.dragTextMove.bind(this);
    this.dragStop = this.dragStop.bind(this);
    window.onmouseup = () => {
      this.dragStop();
    };
  }

  setDragText(id) {
    const { list } = this.props;
    const dev = list.filter((d) => d.id === id);
    if (id * 1 > 0) {
      this.setState({ dragText: dev[0].name });
    }
  }

  getMousesPosition() {
    window.onmousemove = this.dragTextMove;
  }

  setFocusId(id) {
    this.setState({
      focusId: id * 1,
    });
    this.setDragText(id);
  }

  dragTextMove(e) {
    const { drag } = this.state;
    if (!drag) {
      this.setState({ drag: true });
    }
    this.x = e.clientX + 15;
    this.y = e.clientY + 15;
    this.dragTextBox.current.style.top = `${this.y}px`;
    this.dragTextBox.current.style.left = `${this.x}px`;
  }

  dragStop() {
    this.setState({ drag: false });
    window.onmousemove = null;
  }

  dragToggle() {
    const { drag } = this.state;
    this.setState({ drag: !drag });
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
    const {
      expanded, focusId, dragText, drag,
    } = this.state;
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
              getMousesPosition={this.getMousesPosition}
              setFocusId={this.setFocusId}
              focusId={focusId}
              key={dev.id}
              id={dev.id}
              name={dev.name}
              unitType={dev.unitType}
            />
          ))}
        </ul>
        <div className={drag ? 'dragTextBox show' : 'dragTextBox'} ref={this.dragTextBox}>
          <div className="dragText">
            {dragText}
          </div>
        </div>
        <button type="button" onClick={getDeviceList}>click</button>
      </div>
    );
  }
}

DeviceList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object),
  getDeviceList: PropTypes.func.isRequired,
};
DeviceList.defaultProps = {
  list: [],
};


export default DeviceList;
