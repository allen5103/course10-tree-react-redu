import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TodoEditInput from '../TodoEditInput/main';

class Todo extends Component {
  constructor(...args) {
    super(...args);
    const { name, done, id } = this.props;
    this.state = {
      edit: false,
      editText: '',
    };
    this.editText = '';
    this.self = { name, id, done };
    this.getEditText = this.getEditText.bind(this);
    this.do = this.do.bind(this);
    this.edit = this.edit.bind(this);
    this.editDisplay = this.editDisplay.bind(this);
    this.remove = this.remove.bind(this);
  }

  getEditText(evt) {
    const newEditText = evt.target.value;
    this.setState({
      editText: newEditText,
    });
  }

  do() {
    const {
      done, editTodo,
    } = this.props;
    this.self.done = !done;
    editTodo(this.self);
  }

  edit() {
    const {
      name, editTodo,
    } = this.props;
    const { edit, editText } = this.state;
    if (editText.length > 0) {
      const win = window;
      const confirm = win.confirm(`確認將'${name}'修改為'${editText}'？`);
      if (confirm) {
        this.self.name = editText;
        editTodo(this.self);
        this.setState({
          edit: !edit,
          editText: '',
        });
      }
    } else {
      this.setState({
        edit: !edit,
      });
    }
  }

  editDisplay() {
    this.inputElement.focus();
    this.inputElement.value = '';
    const { edit } = this.state;
    const editHandler = !edit;
    this.setState({
      edit: editHandler,
    });
  }

  remove() {
    const { id, name } = this.props;
    const { removeTodo } = this.props;
    const win = window;
    const confirm = win.confirm(`確定刪除'${name}?'`);
    if (confirm) {
      removeTodo(id);
    }
  }

  render() {
    const { edit } = this.state;
    const {
      name, done, id, index,
    } = this.props;
    return (
      <li className={done ? 'todo done' : 'todo'}>
        <span>
          <label htmlFor={`todoCheck_${id}`}>
            <input
              id={`todoCheck_${id}`}
              type="checkbox"
              defaultChecked={done ? 'checked' : ''}
              onChange={this.do}
            />
            {`${index + 1}. ${name}`}
          </label>
        </span>
        |
        <TodoEditInput
          edit={edit}
          parentGetEditText={this.getEditText}
          inputRef={(input) => { this.inputElement = input; }}
        />
        {
          edit ? (
            <>
              <button type="button" className="closeBtn" onClick={this.editDisplay}>x</button>
            </>
          ) : null
        }
        <button
          type="button"
          onClick={edit ? this.edit : this.editDisplay}
        >
          Edit
        </button>
        <button type="button" onClick={this.remove}>Remove</button>
      </li>
    );
  }
}

Todo.propTypes = {
  name: PropTypes.string.isRequired,
  done: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  removeTodo: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
};

export default Todo;
