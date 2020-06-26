import React, { Component } from 'react';
import Constant from '../../utils/Constants';
import Post from '../../components/Post';
import PostInput from '../../components/PostInput';

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

    handleSubmit = (token, username, caption, files) => {
        if (caption === "" || !files) return false;
        window.showLoadingModal();
        let formData = new FormData();
        formData.append("caption", caption);
        for (const file of files) {
            formData.append("uploads", file);
        }
        
        fetch(`${Constant.host}/users/${username}/posts?key=${token}`, {
            method: "POST",
            body: formData
        }).then(res => res.json()).then(() => {
            window.removeLoadingModal();
            this.updatePosts();
        });
    }

    render() {
        return (
            <div>
                <PostInput avatarLink={this.props.avatarLink} 
                    handleSubmit={(caption, files) => this.handleSubmit(this.props.token, this.props.username, caption, files)} />
                {this.state.posts.map(post => <Post {...post} key={post.id} updatePosts={this.updatePosts} sessionUser={this.props.username} token={this.props.token} canEdit={post.username === this.props.username} />)}
            </div>
        );
    }
}

export default NewsFeed;