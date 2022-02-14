import React, { Component } from 'react';
import UserContext from "../utils/userContext"

class TodoComp extends Component {

    
    render() {
        // I am using UserContext in order to get these functions from UsersList component which is its grand father of this component.
        return (<UserContext.Consumer>
            {(data) => {
                return <div style={{ border: "solid 1px" }}>
                    Title: {this.props.todo.title} <br />
                    Completed: {this.props.todo.completed.toString()}
                    {!(this.props.todo.completed) ? <button onClick={() => { data.completeTodo(this.props.todo.id) }}>Mark Completed</button> : null}
                </div>
            }}
        </UserContext.Consumer>
        );
    }
}

export default TodoComp;