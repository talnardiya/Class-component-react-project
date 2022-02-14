import React, { Component } from 'react';
import UserContext from "../utils/userContext"

class NewTodo extends Component {
    constructor(props) {
        super(props)
        this.state = { todo: "" }
    }

    render() {
        // I am using UserContext in order to get these functions from UsersList component which is its grand father of this component.
        return (<UserContext.Consumer>
            {(data) => {
                return <div>
                    <h2>Add new todo - user {this.props.userId}</h2>
                    Title: <input type="text" value={this.state.todo} onChange={(e) => { this.setState({ todo: e.target.value }) }} />
                    <button onClick={() => {
                        data.addTodo(this.props.userId, this.state.todo)
                        this.props.hideAddTodo()
                    }}>Add</button>
                    <button onClick={() => this.props.hideAddTodo()}>Cancel</button>
                </div>
            }}
        </UserContext.Consumer>);
    }
}

export default NewTodo;