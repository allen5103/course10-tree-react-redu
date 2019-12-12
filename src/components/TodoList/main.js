import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TodoListTitle from '../../containers/TodoListTitle';
import Todo from '../../containers/Todo';
import './style.css';


/**
 * @param props
 */
function TodoList(props) {
  const { list } = props;
  return (
    <div className="todoList">
      <TodoListTitle />
      <ul>
        {list.map((todo, index) => (
          <Todo
            index={index}
            key={todo.id}
            id={todo.id}
            name={todo.name}
            done={todo.done}
          />
        ))}
      </ul>
    </div>
  );
}

TodoList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default connect((state) => state)(TodoList);
