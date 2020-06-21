import React from 'react';
import './App.css';
import NavigationBar from './components/NavigationBar';
import Post from './components/Post';
import Profile from './components/ProfilePage';
import Box from './components/PostInput';
import OnePost from './components/OnePost';
import Constant from './utils/Constants';
import NewsFeed from './pages/NewsFeed';
// import Constants from './utils/Constants'
import LoginPage from './pages';
import FullPost from './pages/FullPost';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ...props,
      username: undefined,
      token: undefined,
      userLink: undefined
    };
  }

  login() {
    const username = "binhdh";
    fetch(`${Constant.host}/session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: "123456"
      })
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.resolve({
        tokenResponse : {}
      })
    }).then(tokenResponse => {
      this.setState({
        username: tokenResponse.username,
        token: tokenResponse.token,
        userLink: tokenResponse.link
      });
    });
  }

  componentDidMount() {
    this.login();
  }

  render() {
    return (
      <div>
        <NavigationBar displayName="Quynh Bich" />
        {/* {this.state.username && this.state.token && this.state.userLink ? 
          <NewsFeed username={this.state.username} token={this.state.token} userLink={this.state.userLink} />
          : ""
        } */}
        {
          this.state.username && this.state.token && this.state.userLink ?
          <FullPost id="1" username={this.state.username} token={this.state.token} userLink={this.state.userLink} />
          : ""
        }
        {/* <section class="container-proflie">
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
            comments={[

            ]}
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
        </section> */}

        {/* <LoginPage />  */}
      </div>
    );
  }
}

export default App;
