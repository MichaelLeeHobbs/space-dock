import React from 'react'
import TodoListComponent from './TodoListComponent'
import {db} from '../client'
import {cond} from 'space-api'

class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {todos: [], text: '', selectedTodoId: null};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTodoClick = this.handleTodoClick.bind(this);
        this.removeTodo = this.removeTodo.bind(this);



    }

    componentDidMount() {
        // Get user id from local storage
        const userId = localStorage.getItem('userId')

        const onSnapshot = (docs, type) => {
            console.log('onSnapshot > docs', docs)
            this.setState({todos: docs}, () => {
                console.log('onSnapshot > setState > this.state.todos', this.state.todos)
            })
        }
        const onError = (err) => {
            console.log('Live query error', err)
        }
        const condition = cond('userId', '==', userId);
        window.lq = db.liveQuery("todos")
            .where(condition)
        window.lq
            .subscribe(onSnapshot, onError)
    }

    render() {
        return (
            <div className="todo-app-container">
                <div className="todo-app-title">Todos</div>
                <div className="todo-app-card">
                    <form onSubmit={this.handleSubmit}>
                        <input
                            style={{width: '100%', padding: '20px', fontSize: '1.2rem'}}
                            id="new-todo"
                            onChange={this.handleChange}
                            value={this.state.text}
                            placeholder="What needs to be done?"
                        />
                    </form>
                    <TodoListComponent todos={this.state.todos} handleTodoClick={this.handleTodoClick} selectedTodoId={this.state.selectedTodoId}
                                       removeTodo={this.removeTodo}/>
                </div>
            </div>
        );
    }

    handleChange(e) {
        this.setState({text: e.target.value});
    }

    handleTodoClick(id) {
        this.setState({selectedTodoId: id});
    }

    removeTodo(id) {
        window.deleteTest =
            db.delete('todos').where(cond('_id', '==', id))
        window.deleteTest
            .one().then(res => {
            // if (res.status === 200) {
            //     // The todo was deleted successfully
            //     this.setState({todos: this.state.todos.filter(todo => todo.id !== id)});
            //     return;
            // }
            if (res.status !== 200) {
                console.log('Delete Failed:', res)
            }

        }).catch(ex => {
            // Exception occured while processing request
            console.log('Delete Exception:', ex)
        });
    }

    handleSubmit(e) {
        const generateId = () => {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                let r = Math.random() * 16 | 0
                let v = c === 'x' ? r : ((r & 0x3) | 0x8);
                return v.toString(16);
            });
        }
        e.preventDefault();
        if (!this.state.text.length) {
            return;
        }

        const newItem = {
            text: this.state.text,
            _id: generateId(),
            userId: localStorage.getItem('userId')
        };

        this.setState({text: ''});

        db.insert('todos')
            .one(newItem)
            .then(res => {
                if (res.status !== 200) {
                    console.log('Insert Failed:', res)
                    alert("Error occurred - Insert Failed")
                }
            })
            .catch(ex => {
                // Exception occured while processing request
                console.log('Insert Exception:', ex)
            });
    }
}


export default TodoApp