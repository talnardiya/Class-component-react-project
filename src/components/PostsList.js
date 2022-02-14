import React, { Component } from 'react';
import NewPost from './NewPost';
import PostComp from './PostComp';

class PostsList extends Component {

    constructor(props) {
        super(props)
        this.state = { posts: [], showAddPost: false }
    }
    // This function is loading the posts list by id.
    componentDidMount() {
        let posts = this.props.getUsersPosts(this.props.id);
        this.setState({ posts })
    }
    // This function is changing the state if the props has been changed.
    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            let posts = this.props.getUsersPosts(this.props.id);
            this.setState({ posts });
        }
    }
    // This function is hiding the NewPost component.
    hideAddPost = () => {
        this.setState({ showAddPost: false })
    }


    render() {
        return (
            <div style={{ left: "500px", position: "absolute", top: "290px", overflow: "scroll", height: "200px" }}>

                {/* I am cheking if the showAddPost is true and if so it will show the NewPost component and if not it will map the posts array and create PostComp. */}
                {this.state.showAddPost ?
                    <div>

                        <NewPost hideAddPost={this.hideAddPost} userId={this.props.id} />
                    </div>
                    :
                    <div>
                        <h2>Posts - user {this.props.id}</h2>
                        <button onClick={() => this.setState({ showAddPost: true })}>Add</button>
                        {this.state.posts.map((post, index) => {
                            return (<div key={index}>
                                <PostComp post={post} />
                            </div>)
                        })}
                    </div>
                }
            </div>
        );
    }
}

export default PostsList;