import React, { Component } from 'react';
import NewTodo from './NewTodo';
import TodoComp from './TodoComp';

class TodosList extends Component {

    constructor(props) {
        super(props)
        this.state = { todos: [], showAddTodo: false }
    }
    // This function is loading the todos list by id.
    componentDidMount() {
        let todos = this.props.getUsersTodos(this.props.id);
        this.setState({ todos })
    }
    // This function is changing the state if the props has been changed.
    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            let todos = this.props.getUsersTodos(this.props.id);
            this.setState({ todos });
        }
    }
    // This function is hiding the NewTodo component.
    hideAddTodo = () => {
        this.setState({ showAddTodo: false })
    }


    render() {
        return (
            <div style={{ left: "500px", position: "absolute", top: "50px", overflow: "scroll", height: "200px" }}>

                {/* I am cheking if the showAddTodo is true and if so it will show the NewTodo component and if not it will map the todos array and create TodoComp. */}
                {this.state.showAddTodo ?
                    <div>

                        <NewTodo hideAddTodo={this.hideAddTodo} userId={this.props.id} />
                    </div>
                    :
                    <div>
                        <h2>Todos - user {this.props.id}</h2>
                        <button onClick={() => this.setState({ showAddTodo: true })}>Add</button>
                        {this.state.todos.map((todo, index) => {
                            return (<div key={index}>
                                <TodoComp todo={todo} />
                            </div>)
                        })}
                    </div>
                }
            </div>
        );
    }
}

export default TodosList;