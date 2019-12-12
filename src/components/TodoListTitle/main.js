import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TodoListTitle extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      addTodeText: '',
      date: new Date(),
    };
    this.newTodo = { name: '', id: 0, done: false };
    this.getAddTodoText = this.getAddTodoText.bind(this);
    this.add = this.add.bind(this);
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  getAddTodoText(evt) {
    this.setState({ addTodeText: evt.target.value });
  }

  add() {
    const { addTodeText } = this.state;
    const { addTodo, list } = this.props;
    this.newTodo.name = addTodeText;
    this.newTodo.id = list[list.length - 1].id + 1;
    addTodo(this.newTodo);
    this.newTodo = { name: '', id: 0, done: false };
    this.setState({
      addTodeText: '',
    });
  }

  tick() {
    this.setState({
      date: new Date(),
    });
  }

  render() {
    const { addTodeText, date } = this.state;
    // const { date } = this.props;
    return (
      <div className="todoListTitle">
        <span>TodoList</span>
        <input
          type="text"
          placeholder="add new todo"
          value={addTodeText}
          onChange={this.getAddTodoText}
        />
        <input type="button" value="add" onClick={this.add} />
        <p className="timer">{date.toLocaleDateString() + date.toLocaleTimeString()}</p>
      </div>
    );
  }
}

TodoListTitle.propTypes = {
  addTodo: PropTypes.func.isRequired,
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default TodoListTitle;
