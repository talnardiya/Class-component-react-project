import React, { Component } from 'react';
import UserContext from "../utils/userContext"


class NewPost extends Component {
    constructor(props) {
        super(props)
        this.state = { postTitle: "", postBody: "" }
    }

    render() {
        // I am using UserContext in order to get these functions from UsersList component which is its grand father of this component.
        return (<UserContext.Consumer>
            {(data) => {
                return <div>
                    <h2>Add new post - user {this.props.userId}</h2>
                    Title: <input type="text" value={this.state.postTitle} onChange={(e) => { this.setState({ postTitle: e.target.value }) }} /> <br />
                    Body: <input type="text" value={this.state.postBody} onChange={(e) => { this.setState({ postBody: e.target.value }) }} />

                    <button onClick={() => {
                        data.addPost(this.props.userId, this.state.postTitle, this.state.postBody)
                        this.props.hideAddPost()
                    }}>Add</button>
                    <button onClick={() => this.props.hideAddPost()}>Cancel</button>
                </div>
            }}
        </UserContext.Consumer>);
    }
}

export default NewPost;