import React, { Component } from 'react';
import Constant from "../../utils/Constants";

class Photo extends Component {
    render() {
        return (
            <div>
                <img src={`${Constant.host }${this.props.avatarLink}`} className="img-fluid rounded-circle mr-4" style={{ objectFit: "cover", width: "150px", height: "150px" }} alt="" />
            </div>
        );
    }
}

class Username extends Component {
    render() {
        return (
            <div className="py-2">
                <span className="mx-5 pt-2" style={{ fontSize: "1.5rem" }}>{this.props.username}</span>
                <i class="fa fa-cog" aria-hidden="true"></i>
                <div>
                    <span className="mx-5 pt-2">{this.props.displayName}</span>
                </div>
            </div>
        );
    }
}

class Counting extends Component {
    render() {
        return (
            <div>
                <span>{this.props.postCount} posts</span>
                <span>{this.props.follower} followers</span>
                <span>{this.props.following} followings</span>
            </div>
        );
    }
}

class FollowButton extends Component {

    handleFollow = () => {
        if (this.props.followed) {
            this.props.handleUnfollow(this.props.username);
        } else {
            this.props.handleFollow(this.props.username);
        }
    };

    render() {
        return (
            <div>
                {
                    this.props.canFollow ?
                        (this.props.followed ? 
                        <button className="btn btn-secondary" onClick={this.handleFollow}>Unfollow</button>
                        : <button className="btn btn-primary" onClick={this.handleFollow}>Follow</button>)
                        : ""
                }
            </div>
        );
    }
}

class Profile extends Component {
    render() {
        return (
            <div className="card container w-75 p-4 mt-3">
                <div className="d-flex ml-3" >
                    <Photo avatarLink={this.props.avatarLink} />
                    <div className="mr-5">
                        <Username
                            username={this.props.username}
                            displayName={this.props.displayName} />
                        <div className="mx-5 d-flex py-2">
                            <Counting
                                postCount={this.props.posts.length}
                                follower={this.props.followerCount}
                                following={this.props.followingCount}
                            />

                        </div>
                    </div>
                    <div className="mt-2">
                        <FollowButton
                            canFollow={this.props.canFollow}
                            followed={this.props.followed}
                            username={this.props.username}
                            handleFollow={this.props.handleFollow}
                            handleUnfollow={this.props.handleUnfollow}
                        />
                    </div>
                </div>
            </div>

        );
    }
}

export default Profile;
