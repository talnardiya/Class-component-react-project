import React, { Component } from 'react';

class PostComp extends Component {
  
  // I didn't use here a useless constructor because it doesn't accomplish anything.
    render() {
        return (
            <div>
                <div style={{ border: "solid 1px" }}>
                    Title: {this.props.post.title} <br />
                    Body: {this.props.post.body}

                </div>


            </div>
        );
    }
}

export default PostComp;