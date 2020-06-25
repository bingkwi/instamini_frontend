import React, { Component } from 'react';
import Constant from "../../utils/Constants";
import ImageUpload from '../ImageUpload';
import FollowList from '../FollowList';

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
                <button className="btn p-0" data-toggle="modal" data-target="#followers">{this.props.followerCount} followers</button>
                <div className="modal fade" id="followers" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Followers</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true" className="m-0">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <FollowList follows={this.props.followers} currentFollowings={this.props.currentFollowings} sessionUser={this.props.sessionUser} />
                            </div>
                        </div>
                    </div>
                </div>
                <button className="btn p-0" data-toggle="modal" data-target="#followings">{this.props.followingCount} followings</button>
                <div className="modal fade" id="followings" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Followings</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true" className="m-0">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <FollowList follows={this.props.followings} currentFollowings={this.props.currentFollowings} sessionUser={this.props.sessionUser} />
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
            newPassword: "",
            passwordConfirm: "",
        }
        this.handleSignupCallback = () =>
            this.props.handleSignup(this.state.username, this.state.displayName, this.state.password, this.state.newPassword, this.state.passwordConfirm);

    }
    handleEdit = (token, username, displayName, password, newPassword, newPasswordConfirm) => {
        // check props.username and password
        fetch(`${Constant.host}/session`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              username: this.props.username,
              password: password
            }),
            credentials: 'include'
          }).then(res => {
            const ok = res.ok;
            if (!ok) return;

            // construct body
            let body = {};
            if (newPassword) {
                // check new pass & confirm
                if (newPasswordConfirm !== newPassword) {
                    return;
                }
                body.password = newPassword;
            }
            if (username) {
                const usernameRegex = /^[A-Za-z0-9_]{6,}$/;
                if (usernameRegex.test(username)) {
                    body.username = username;
                }
            }

            if (displayName) {
                const displayNameRegex = /^.+$/;
                if (displayNameRegex.test(displayName)) {
                    body.displayName = displayName;
                }
            }

            fetch(`${Constant.host}/users/${this.props.username}?key=${token}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(body)
                }).then(() => {
                    if(!username){
                        window.location.reload();
                    }else{
                        window.location.href = `/${username}`;
                    }
                    
                });
        });


    }

    handleDelete = (token, username) => {
        const okToDelete = window.confirm("Are you sure want to delete?");
        if (!okToDelete) {
            return;
        }
        fetch(`${Constant.host}/users/${username}?key=${token}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(() => {
                window.location.href = "/";
            });
    }
    handleEditCallback = () => this.handleEdit(this.props.token, this.state.username, this.state.displayName, this.state.password, this.state.newPassword, this.state.newPasswordConfirm)
    handleDeleteCallback = () => this.handleDelete(this.props.token, this.props.username);

    render() {
        return (
            <div>
                {/* <!-- Button trigger modal --> */}
                {this.props.canEdit ?
                    <>
                        <button className="nav-link fas fa-ellipsis-h fa-md mr-n2 text-dark bg-transparent border-0" href="#" id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        </button>
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">

                            <button className="dropdown-item row m-0 pl-2" data-target="#profileModal" data-toggle="modal">
                                <i className="fas fa-edit fa-sm col-sm-4"></i>
                                    Edit
                            </button>
                            <button className="dropdown-item row m-0 pl-2" onClick={this.handleDeleteCallback}>
                                <i className="fas fa-times fa-sm col-sm-4"></i>
                                    Delete
                            </button>
                        </div>
                    </>
                    : ""}

                {/* <!-- Modal --> */}
                <div className="modal fade" id="profileModal" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
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
                                <input type="password" className="form-control" placeholder="New password" id="pwd"
                                    value={this.state.newPassword} onChange={e => this.setState({ newPassword: e.target.value })} />
                            </div>
                            <div className="modal-body">
                                {this.state.newPassword ?
                                    <input type="password" className="form-control" placeholder="Confirm password" id="pwd" required
                                        value={this.state.passwordConfirm} onChange={e => this.setState({ passwordConfirm: e.target.value })} />
                                    : ""
                                }
                            </div>
                            <div className="modal-footer d-flex">
                                <button className="btn btn-success" onClick={this.handleEditCallback}>OK</button>
                                <button className="btn btn-secondary" data-dismiss="modal" data-target="#profileModal">Cancel</button>
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
                            <EditProfile
                                username={this.props.username}
                                token={this.props.token}
                                canEdit={!this.props.canFollow}
                                handleEdit={this.props.handleEdit}
                                handleDelete={this.props.handleDelete}
                                refresh={this.props.refresh} />
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
                                followerCount={this.props.followerCount}
                                followers={this.props.followers}
                                followingCount={this.props.followingCount}
                                followings={this.props.followings}
                                currentFollowings={this.props.currentFollowings}
                                sessionUser={this.props.sessionUser}
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
