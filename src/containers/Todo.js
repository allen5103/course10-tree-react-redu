import { connect } from 'react-redux';
import { removeTodo, editTodo } from '../actions';
import Todo from '../components/Todo/main';

export default connect((state) => state, { removeTodo, editTodo })(Todo);
