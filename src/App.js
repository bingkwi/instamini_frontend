import React from 'react';
import './App.css';
import NavigationBar from './components/NavigationBar';
import Post from './components/Post';
import Profile from './components/ProfileSection';
import Box from './components/PostInput';
import Constant from './utils/Constants';
import NewsFeed from './pages/NewsFeed';
// import Constants from './utils/Constants'
import LoginPage from './pages/LoginPage';
import FullPost from './pages/FullPost';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Gallery from './components/Gallery';
import ProfilePage from './pages/ProfilePage';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ...props,
      username: undefined,
      token: undefined,
      userLink: undefined,
      avatarLink: undefined,
      loading: true,
      isSearching: false,
      query: undefined
    };
  }

  login = (username, password) => {
    this.setState({ loading: true });
    fetch(`${Constant.host}/session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password
      }),
      credentials: 'include'
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.resolve({
        tokenResponse: {}
      })
    }).then(tokenResponse => {
      this.setState({
        username: tokenResponse.username,
        displayName: tokenResponse.displayName,
        token: tokenResponse.token,
        avatarLink: tokenResponse.avatarLink,
        userLink: tokenResponse.link
      });
    });
    this.setState({ loading: false });
  }

  getCookie = function (name) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
  }

  checkLogin = () => {
    this.setState({ loading: true });
    let token = this.getCookie("Token");
    token = token ? token : "";
    fetch(`${Constant.host}/session?key=${token}`, {
      credentials: 'include'
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.resolve({
        tokenResponse: {}
      })
    }).then(tokenResponse => {
      console.log(tokenResponse)
      this.setState({
        username: tokenResponse.username,
        displayName: tokenResponse.displayName,
        token: tokenResponse.token,
        userLink: tokenResponse.link,
        avatarLink: tokenResponse.avatarLink,
        loading: false
      });
    });
    // this.setState({ loading: false });
  }

  logout = () => {
    this.setState({ loading: true });
    const token = this.getCookie("Token") ? this.getCookie("Token") : "";
    fetch(`${Constant.host}/session?key=${token}`, {
      method: "DELETE",
      credentials: 'include'
    }).then(() => {
      this.setState({
        loading: false,
        username: undefined,
        displayName: undefined,
        token: undefined,
        userLink: undefined,
        avatarLink: undefined
      });
    })
  }

  navigateToProfile = username => {
    window.location.href = `/${username}`;
  }
  navigateToProfileCallback = () => this.navigateToProfile(this.state.username);

  handleSearch = (token, query) => {
    this.setState({ loading: true }, () => {
      if (query === '') {
        this.setState({ loading: false, searchResult: [] });
        return;
      }
      fetch(`${Constant.host}/users?q=${query}&key=${token}`)
        .then(res => res.json())
        .then(result => this.setState({ searchResult: result, loading: false }));
    });

  }
  handleSearchCallback = () => this.handleSearch(this.state.token, this.state.query);
  createFollow = (token, username, followedUsername) => {
    if (!followedUsername) return;
    let ok;
    this.setState({ loading: true }, () => {
      fetch(`${Constant.host}/users/${username}/follows?f=${followedUsername}&key=${token}`, {
        method: "POST"
      }).then(res => {
        ok = res.ok;
        return res.json();
      })
        .then(json => {
          if (ok) {
            console.log(json);
          } else {

          }
          this.handleSearchCallback();
        })
    })
  };
  createFollowCallback = followedUsername => this.createFollow(this.state.token, this.state.username, followedUsername);
  deleteFollow = (token, username, followedUsername) => {
    if (!followedUsername) return;
    let ok;
    this.setState({ loading: true }, () => {
      fetch(`${Constant.host}/users/${username}/follows?f=${followedUsername}&key=${token}`, {
        method: "DELETE"
      }).then(res => {
        ok = res.ok;
        console.log(ok);
        this.handleSearchCallback();
      });
    })
  };
  deleteFollowCallback = followedUsername => this.deleteFollow(this.state.token, this.state.username, followedUsername);

  componentDidMount() {
    this.checkLogin();
  }

  render() {
    return (
      <Router>
        <Route path="/">
          {this.state.username && this.state.token && this.state.userLink ?
            <NavigationBar displayName={this.state.username} avatarLink={`${Constant.host}${this.state.avatarLink}`}
              handleLogout={this.logout} handleNavigateToProfile={this.navigateToProfileCallback} />
            : ""
          }
        </Route>
        <Switch>
          <Route exact path="/">
            {this.state.loading === true ? "" :
              (this.state.username && this.state.token && this.state.userLink ?
                <NewsFeed username={this.state.username} token={this.state.token} userLink={this.state.userLink} />
                : <LoginPage isSignup={false} handleLogin={this.login} />)
            }
          </Route>
          <Route path="/posts/:id" render={({ match }) =>
            this.state.username && this.state.token && this.state.userLink ?
              <FullPost id={match.params.id} username={this.state.username} token={this.state.token} userLink={this.state.userLink} />
              : ""
          }>
          </Route>

          <Route path="/:username" render={({ match }) =>
            this.state.username && this.state.token && this.state.userLink ?
              <ProfilePage username={this.state.username} token={this.state.token} userLink={this.state.userLink}/>
              : ""
          }>
          </Route>
        </Switch>
      </Router>

      // <div>
      //   <NavigationBar displayName="Quynh Bich" />
      //   {/* {this.state.username && this.state.token && this.state.userLink ? 
      //     <NewsFeed username={this.state.username} token={this.state.token} userLink={this.state.userLink} />
      //     : ""
      //   } */}
      //   {
      //     this.state.username && this.state.token && this.state.userLink ?
      //       <FullPost id="1" username={this.state.username} token={this.state.token} userLink={this.state.userLink} />
      //       : ""
      //   }
      //   {/* <section class="container-proflie">
      //     <Profile
      //       photo={{
      //         photo: "./images/test.jpg"
      //       }}

      //       username={{
      //         username: "binh.dohai",
      //         displayName: "Quynh Bich"
      //       }}

      //       counting={{
      //         post: 1,
      //         followerCount: 2,
      //         followingCount: 2
      //       }}

      //     />
      //   </section> */}

      //   {/* <section class="container">
      //     <Box />
      //   </section> */}

      //   {/* <section class="container">
      //     <Post
      //       photos={[
      //         {
      //           link: "./images/test.jpg"
      //         },
      //         {
      //           link: "./images/test.jpg"
      //         },
      //         {
      //           link: "./images/test.jpg"
      //         }
      //       ]
      //       }
      //       comments={[

      //       ]}
      //       post={{
      //         username: "binh.dohai",
      //         likeCount: 1,
      //         commentCount: 2,
      //         caption: "This is demo caption"
      //       }}
      //     />
      //   </section> */}

      //   {/* <LoginPage />  */}

      //   <section className="container">
      //     {/* <Gallery
           
      //   /> */}
      //     <ProfilePage posts={[
      //       {
      //         link: "./images/test.jpg",
      //         likeCount: 1,
      //         commentCount: 2,
      //       },
      //       {
      //         link: "./images/test.jpg",
      //         likeCount: 1,
      //         commentCount: 2,
      //       },
      //       {
      //         link: "./images/test.jpg",
      //         likeCount: 1,
      //         commentCount: 2,
      //       },
      //       {
      //         link: "./images/test.jpg",
      //         likeCount: 1,
      //         commentCount: 2,
      //       },
      //     ]}
      //       username="binh.dohai "

      //       handleFollow={this.createFollowCallback}
      //       handleUnFollow={this.deleteFollowCallback} />
      //   </section>
      // </div>

    );
  }
}

export default App;
