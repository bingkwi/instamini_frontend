import React, { Component } from 'react';
import Constant from "../../utils/Constants";
import ImageUpload from '../ImageUpload';

class Photo extends Component {
    render() {
        return (
            <>
                {this.props.canEdit ?
                    <>
                        <button className="col-sm-3 btn" data-toggle="modal" data-target="#avatarModal">
                            <img src={`${Constant.host}${this.props.avatarLink}`} className="img-fluid rounded-circle" style={{ objectFit: "cover", width: "150px", height: "150px" }} alt="" />
                        </button>
                        <ImageUpload username={this.props.username} token={this.props.token} refresh={this.props.refresh} />
                    </>
                    :
                    <div className="col-sm-3">
                        <img src={`${Constant.host}${this.props.avatarLink}`} className="img-fluid rounded-circle" style={{ objectFit: "cover", width: "150px", height: "150px" }} alt="" />
                    </div>}
            </>
        );
    }
}

class Username extends Component {
    render() {
        return (
            <div>
                <div className="d-flex w-100 align-items-center">
                    <span style={{ fontSize: "1.5rem" }}>{this.props.username}</span>
                    <EditProfile />
                </div>
                <span className="d-block" style={{ fontSize: "1.35rem" }}>{this.props.displayName}</span>
            </div>
        );
    }
}

class Counting extends Component {
    render() {
        return (
            <div className="w-75 d-flex justify-content-between">
                <button className="btn p-0">{this.props.postCount} posts</button>
                <button className="btn p-0" data-toggle="modal" data-target="#followers">{this.props.follower} followers</button>
                <div class="modal fade" id="followers" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Followers</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                Body
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="btn p-0" data-toggle="modal" data-target="#followings">{this.props.following} followings</button>
                <div class="modal fade" id="followings" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Followings</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                Body
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>


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
                <button type="button" className="btn btn-sm" data-toggle="modal" data-target="#modelId">
                    <i className="fa fa-cog" aria-hidden="true"></i>
                </button>

                {/* <!-- Modal --> */}
                <div className="modal fade" id="modelId" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Profile</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span className="m-0" aria-hidden="true">&times;</span>
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
            <div className="card container w-50 py-3 px-4 mt-3">
                <div className="d-flex justify-content-between align-items-center">
                    <Photo avatarLink={this.props.avatarLink} canEdit={!this.props.canFollow} 
                        username={this.props.username} token={this.props.token} 
                        refresh={this.props.refresh} />
                    <div className="col-sm-8">
                        <div className="d-flex justify-content-between">
                            <Username
                                username={this.props.username}
                                displayName={this.props.displayName} />
                            <FollowButton
                                canFollow={this.props.canFollow}
                                followed={this.props.followed}
                                username={this.props.username}
                                handleFollow={this.props.handleFollow}
                                handleUnfollow={this.props.handleUnfollow}
                            />
                        </div>
                        <div className="d-flex py-2">
                            <Counting
                                postCount={this.props.posts.length}
                                follower={this.props.followerCount}
                                following={this.props.followingCount}
                            />
                        </div>

                    </div>
                    <div className="mt-2">

                    </div>
                </div>
            </div>

        );
    }
}

export default Profile;
