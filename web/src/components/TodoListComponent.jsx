import React from 'react'
import TodoComponent from './TodoComponent'

class TodoListComponent extends React.Component {
    // constructor(props) {
    //   super(props)
    // }

    render() {
        return (
            <div>
                {this.props.todos.map(todo => <TodoComponent key={todo._id} todo={todo} handleClick={() => this.props.handleTodoClick(todo._id)}
                                                             selectedTodoId={this.props.selectedTodoId}
                                                             handleCloseClick={() => this.props.removeTodo(todo._id)}/>)}
            </div>
        )
    }
}

export default TodoListComponent