import React, { Component } from 'react';

class Photo extends Component {
    render() {
        return (
            <div>
                <img src={this.props.photo} className="img-fluid rounded-circle mr-4" style={{ objectFit: "cover", width: "150px", height: "150px" }} alt="" />
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
                <span>{this.props.post} posts</span>
                <span>{this.props.follower} followers</span>
                <span>{this.props.following} followings</span>
            </div>
        );
    }
}



class Profile extends Component {
    render() {
        return (
            <div className="card container w-50 p-4">
                <div className="d-flex" >
                    <Photo photo={this.props.photo.photo} />
                    <div>
                        <Username
                            username={this.props.username.username}
                            displayName={this.props.username.displayName} />
                        <div className="mx-5 d-flex py-2">
                            <Counting
                                post={this.props.counting.post}
                                follower={this.props.counting.followerCount}
                                following={this.props.counting.followingCount}
                            />

                        </div>
                    </div>
                </div>


            </div>

        );
    }
}

export default Profile;
