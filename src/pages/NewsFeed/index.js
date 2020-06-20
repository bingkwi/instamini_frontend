import React, { Component } from 'react';
import Constant from '../../utils/Constants';
import Post from '../../components/Post';

class NewsFeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props,
            posts: [],
            loading: true
        };
    }

    updatePosts = () => {
        this.retrievePosts(this.props.username, this.props.token);
    }

    componentDidMount() {
        this.updatePosts();
    }

    // componentDidUpdate() {
    //     this.retrievePosts(this.props.username, this.props.token);
    // }

    retrievePosts(username, token) {
        if (!username || !token) {
            return;
        }
        let ok;
        fetch(`${Constant.host}/users/${username}/feed?key=${token}`)
            .then(res => {
                ok = res.ok;
                if (res.ok) {
                    return res.json();
                }
            })
            .then(postList => {
                if (!ok) {
                    postList = [];
                }
                this.setState({ posts: postList, loading: false });
            });
    }

    render() {
        return (
            <>
                {this.state.posts.map(post => <Post {...post} key={post.id} updatePosts={this.updatePosts} sessionUser={this.props.username} token={this.props.token} />)}
            </>
        );
    }
}

export default NewsFeed;