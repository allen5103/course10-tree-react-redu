import { connect } from 'react-redux';
import { addTodo } from '../actions';
import TodoListTitle from '../components/TodoListTitle/main';


export default connect((state) => state, { addTodo })(TodoListTitle);
