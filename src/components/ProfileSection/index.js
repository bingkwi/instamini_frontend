import React, { Component } from 'react';
import Constant from "../../utils/Constants";

class Photo extends Component {
    render() {
        return (
            <div>
                <img src={`${Constant.host}${this.props.avatarLink}`} className="img-fluid rounded-circle mr-4" style={{ objectFit: "cover", width: "150px", height: "150px" }} alt="" />
            </div>
        );
    }
}

class Username extends Component {
    render() {
        return (
            <div className="py-2 d-flex">
                <span className="mx-4 pt-2" style={{ fontSize: "1.5rem" }}>{this.props.username}</span>
                    <span className="mx-4 pt-2" style={{ fontSize: "1.5rem" }}>{this.props.displayName}</span>
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

class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            displayName: "",
            password: "",
            passwordConfirm: ""
        }
        this.handleSignupCallback = () =>
            this.props.handleSignup(this.state.username, this.state.displayName, this.state.password, this.state.passwordConfirm);
    }
    render() {
        return (
            <div>
                {/* <!-- Button trigger modal --> */}
                <button type="button" className="btn btn-sm pt-4" data-toggle="modal" data-target="#modelId">
                    <i className="fa fa-cog" aria-hidden="true"></i>
                </button>

                {/* <!-- Modal --> */}
                <div className="modal fade" id="modelId" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Profile</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <input type="text" className="form-control" placeholder="Username"
                                    id="username" value={this.state.username} onChange={e => this.setState({ username: e.target.value })} />
                            </div>
                            <div className="modal-body">
                                <input type="text" className="form-control" placeholder="Full name"
                                    id="fullName" value={this.state.displayName} onChange={e => this.setState({ displayName: e.target.value })} />
                            </div>
                            <div className="modal-body">
                                <input type="password" className="form-control" placeholder="Password" id="pwd"
                                    value={this.state.password} onChange={e => this.setState({ password: e.target.value })} />
                            </div>
                            <div className="modal-body">
                                <input type="password" className="form-control" placeholder="Confirm password" id="pwd"
                                    value={this.state.passwordConfirm} onChange={e => this.setState({ passwordConfirm: e.target.value })} />
                            </div>
                            <div className="modal-footer d-flex">
                                <button className="btn btn-success">OK</button>
                                <button className="btn btn-primary">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
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
            <div className="card container w-50 p-3 mt-3">
                <div className="d-flex ml-3" >
                    <Photo avatarLink={this.props.avatarLink} />
                    <div className="mr-5">
                        <div className="d-flex">
                        <Username
                            username={this.props.username}
                            displayName={this.props.displayName} />
                        {/* <div className=""> */}
                            <EditProfile />
                        {/* </div> */}
                        </div>
                        <div className="mx-4 d-flex py-2">
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
