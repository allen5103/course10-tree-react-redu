import React from 'react';
import PropTypes from 'prop-types';

class DeviceListTitle extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      text: 'All Devices',
    };
    this.setId = this.setId.bind(this);
  }

  setId() {
    const { setFocusId } = this.props;
    setFocusId(-1);
  }

  render() {
    const { text } = this.state;
    const {
      count, expanded, expandToggle, focusId,
    } = this.props;

    return (
      <div className="deviceListTitle">
        <div className={expanded ? 'expand expanded' : 'expand'} onClick={expandToggle} />
        <div className="icon" />
        <div className={focusId < 0 ? 'info selected' : 'info'} onClick={this.setId}>{`${text}(${count})`}</div>
      </div>
    );
  }
}

DeviceListTitle.propTypes = {
  count: PropTypes.number,
  expanded: PropTypes.bool,
  expandToggle: PropTypes.func.isRequired,
  focusId: PropTypes.number.isRequired,
  setFocusId: PropTypes.func.isRequired,
};

DeviceListTitle.defaultProps = {
  expanded: true,
  count: 0,
};

export default DeviceListTitle;
