import React, { Component } from 'react';
import Profile from "../../components/ProfileSection";
import Gallery from "../../components/Gallery";

class ProfilePage extends Component {
    render() {
        return (
            <div>
                <Profile
                    photo={{
                        photo: "./images/test.jpg"
                    }}

                    username="binh.dohai"
                    displayName="Quynh Bich"
                    // post= "1"
                    followerCount="2"
                    followingCount="2"

                    handleFollow={this.props.handleFollow}
                    handleUnfollow={this.props.handleUnfollow}
                />
                <Gallery posts={this.props.posts} />
            </div>
        );
    }
}

export default ProfilePage;
