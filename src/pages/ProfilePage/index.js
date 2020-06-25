import React, { Component } from 'react';
import Profile from "../../components/ProfileSection";
import Gallery from "../../components/Gallery";
import Constant from "../../utils/Constants";

class ProfilePage extends Component {

    getProfile = (token, username) => {
        let ok;
        fetch(`${Constant.host}/users/${username}?key=${token}`)
            .then(res => {
                ok = res.ok;
                return res.json();
            }).then(result => {
                this.setState({ ...result }, () => document.title = `${result.displayName} (@${result.username}) | Instamini Photo Sharing`);
            });
    }

    createFollow = (token, username, followedUsername) => {
        if (!followedUsername) return;
        fetch(`${Constant.host}/users/${username}/follows?f=${followedUsername}&key=${token}`, {
            method: "POST"
        }).then(res => {
            if (res.ok) {
                this.getProfile(token, followedUsername);        
            }
        })
    };

    deleteFollow = (token, username, followedUsername) => {
        if (!followedUsername) return;
        fetch(`${Constant.host}/users/${username}/follows?f=${followedUsername}&key=${token}`, {
            method: "DELETE"
        }).then(res => {
            if (res.ok) {
                this.getProfile(token, followedUsername);        
            }
        })
    };

    componentDidMount() {
        this.getProfile(this.props.token, this.props.username);
    }

    render() {
        return (
            <div>
                {this.state === null ? "" :
                    <>
                        <Profile
                            {...this.state}
                            token={this.props.token}
                            canFollow={this.props.canFollow}
                            currentFollowings={this.props.currentFollowings}
                            sessionUser={this.props.sessionUser}
                            followed={this.state.followers.some(u => u.username === this.props.sessionUser)}
                            handleFollow={() => this.createFollow(this.props.token, this.props.sessionUser, this.props.username)}
                            handleUnfollow={() => this.deleteFollow(this.props.token, this.props.sessionUser, this.props.username)}
                            refresh={() => this.getProfile(this.props.token, this.props.username)}
                        />
                        <Gallery posts={this.state.posts} />
                    </>
                }
            </div>
        );
    }
}

export default ProfilePage;
