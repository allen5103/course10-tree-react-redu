import React from 'react';
import PropTypes from 'prop-types';


/**
 * @param props
 */
function TodoEditInput(props) {
  // render() {
  const { parentGetEditText, inputRef, edit } = props;
  return (<><input className={edit ? '' : 'hide'} type="text" ref={inputRef} onChange={parentGetEditText} /></>);
  // }
}

TodoEditInput.propTypes = {
  parentGetEditText: PropTypes.func.isRequired,
  inputRef: PropTypes.func.isRequired,
  edit: PropTypes.bool,
};

TodoEditInput.defaultProps = {
  edit: false,
};

export default TodoEditInput;
