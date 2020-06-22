import React, { Component } from 'react';
import Profile from "../../components/ProfileSection";
import Gallery from "../../components/Gallery";

class ProfilePage extends Component {
    render() {
        return (
            <div>
                <ProfileSection />
                <Gallery posts={this.props.posts} />
            </div>
        );
    }
}

export default ProfilePage;
