import React from 'react'

const TodoComponent = (props) => {
    return (
        <div className="todo-item" onClick={props.handleClick}>
            {props.todo.text}
            {props.selectedTodoId === props.todo._id && <i className="material-icons todo-item-close-icon" onClick={props.handleCloseClick}>close</i>}
        </div>
    )
}

export default TodoComponent