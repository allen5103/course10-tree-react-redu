import React from 'react';
import PropTypes from 'prop-types';

class Device extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
    };
    this.unitTypeConvert = this.unitTypeConvert.bind(this);
    this.setId = this.setId.bind(this);
  }

  setId(e) {
    e.preventDefault();
    const initX = e.clientX;
    const initY = e.clientY;
    const { id, setFocusId, getMousesPosition } = this.props;
    setFocusId(id);
    getMousesPosition(initX, initY);
  }

  unitTypeConvert() {
    const { unitType } = this.props;
    switch (unitType) {
      case 'IP Box Camera':
        return 'A1';
      case 'Megapixel IP Box Camera':
        return 'A1';
      case 'Lens Embed IP Box Camera':
        return 'A2';
      case 'IP Speed Dome':
        return 'B1';
      case 'IP Dome':
        return 'B2';
      case 'Megapixel IP Dome':
        return 'B2';
      case 'Megapixel IP Hemispheric Camera':
        return 'B5';
      case 'IP Camera':
        return 'C1';
      case 'Megapixel IP Camera':
        return 'C1';
      case 'IP Cube Camera':
        return 'D1';
      case 'Megapixel IP Cube Camera':
        return 'D1';
      case 'Quad Server':
        return 'E1';
      case 'Video Server':
        return 'E2';
      case 'IP PTZ Camera':
        return 'F1';
      case 'Megapixel IP PTZ Camera':
        return 'F1';
      default:
        return '';
    }
  }


  render() {
    const {
      name, id, focusId,
    } = this.props;
    return (
      <li className="device">
        <div className={`icon ${this.unitTypeConvert()}`} />
        <div
          className={id === `${focusId}` ? 'info selected' : 'info'}
          onMouseDown={this.setId}
        >
          {name}
        </div>
      </li>
    );
  }
}

Device.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  unitType: PropTypes.string.isRequired,
  focusId: PropTypes.number,
  setFocusId: PropTypes.func.isRequired,
  getMousesPosition: PropTypes.func.isRequired,
};

Device.defaultProps = {
  focusId: 0,
};

export default Device;
