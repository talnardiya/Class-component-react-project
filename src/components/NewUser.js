import React, { Component } from 'react';

class NewUser extends Component {
    constructor(props) {
        super(props)
        this.state = { name: "", email: "" }
    }

    render() {

        return (<div style={{ position: "absolute", top: "50px", left: "500px" }}>
            <h2>Add new user</h2>
            Name: <input type="text" value={this.state.name} onChange={(e) => { this.setState({ name: e.target.value }) }} /> <br />
            Email: <input type="text" value={this.state.email} onChange={(e) => { this.setState({ email: e.target.value }) }} /> <br />
            
            {/* When the client will click on the Add button he will activate these functions that were created in UsersList component */}
            <button onClick={() => {
                this.props.addUser(this.state.name, this.state.email)
                this.props.hideAddUser()
            }}>Add</button>
            <button onClick={() => this.props.hideAddUser()}>Cancel</button>
        </div>)
    }
}

export default NewUser;