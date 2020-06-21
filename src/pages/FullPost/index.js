import React, { Component } from 'react';
import Post from '../../components/Post';
import Constant from '../../utils/Constants';

class FullPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props,
            posts: [],
            loading: true
        };
    }

    updatePosts = () => {
        this.retrievePosts(this.props.id, this.props.token);
    }

    componentDidMount() {
        this.updatePosts();
    }

    // componentDidUpdate() {
    //     this.retrievePosts(this.props.username, this.props.token);
    // }

    retrievePosts(postId, token) {
        if (!postId || !token) {
            return;
        }
        let ok;
        fetch(`${Constant.host}/posts/${postId}?key=${token}`)
            .then(res => {
                ok = res.ok;
                if (res.ok) {
                    return res.json();
                }
            })
            .then(post => {
                let postList;
                if (!ok) {
                    postList = [];
                } else {
                    postList = [post];
                }
                this.setState({ posts: postList, loading: false });
            });
    }

    render() {
        console.log(this.state);
        return (
            <>
                {this.state.posts.map(post => <Post {...post} key={post.id} updatePosts={this.updatePosts} sessionUser={this.props.username} token={this.props.token} canEdit={post.username === this.props.username} isHorizontal={true} />)}
            </>
        );
    }
}

export default FullPost;