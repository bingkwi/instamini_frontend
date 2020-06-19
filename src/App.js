import React from 'react';
import './App.css';
import NavigationBar from './components/NavigationBar';
import Post from './components/Post';
import Profile from './components/ProfilePage';
import Box from './components/PostInput';
import OnePost from './components/OnePost';
import Constants from './utils/Constants'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.feed = [];
  }

  render() {
    return (
      <div>
        <NavigationBar displayName="Quynh Bich" />

        <section class="container-proflie">
          <Profile
            photo={{
              photo: "./images/test.jpg"
            }}

            username={{
              username: "binh.dohai",
              displayName: "Quynh Bich"
            }}

            counting={{
              post: 1,
              followerCount: 2,
              followingCount: 2
            }}

          />
        </section>

        <section class="container">
          <Box />
        </section>

        <section class="container">
          <Post
            photos={[
              {
                link: "./images/test.jpg"
              },
              {
                link: "./images/test.jpg"
              },
              {
                link: "./images/test.jpg"
              }
            ]
            }

            post={{
              username: "binh.dohai",
              likeCount: 1,
              commentCount: 2,
              caption: "This is demo caption"
            }}
          />
        </section>

        <section>
          <OnePost
            photo={{
              photos: "./images/test.jpg"
            }}

            post={{
              username: "binh.dohai",
              likeCount: 1,
              commentCount: 2,
              caption: "This is demo caption"
            }}

          />
        </section>
      </div>
    );
  }
}

export default App;
