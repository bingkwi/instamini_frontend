import React from 'react';
import './App.css';
import NavigationBar from './components/NavigationBar';
import Constant from './utils/Constants';
import NewsFeed from './pages/NewsFeed';
// import Constants from './utils/Constants'
import LoginPage from './pages/LoginPage';
import FullPost from './pages/FullPost';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProfilePage from './pages/ProfilePage';
import SearchResult from './pages/SearchResult';
import LoadingPage from './pages/LoadingPage';
import Footer from './components/Footer';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ...props,
      username: undefined,
      token: undefined,
      userLink: undefined,
      avatarLink: undefined,
      followings: [],
      loading: true,
      isSearching: false,
      query: ''
    };
  }

  login = (username, password) => {
    this.setState({ loading: true }, () => {
      let statusCode, ok;
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
        statusCode = res.status;
        if (ok = res.ok) {
          return res.json();
        }
        return Promise.resolve({
          tokenResponse: {}
        })
      }).then(tokenResponse => {
        if (!ok) {
          window.showMessageModal('danger', 'Login failed', 'Login failed, please check username and password!');
          return;
        }
        this.setState({
          username: tokenResponse.username,
          displayName: tokenResponse.displayName,
          token: tokenResponse.token,
          avatarLink: tokenResponse.avatarLink,
          followings: tokenResponse.followings,
          userLink: tokenResponse.link,
          loading: false
        });
      });
      // window.setTimeout(() => this.setState({ loading: false }), 500);
    });
  }

  getCookie = function (name) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
  }

  checkLogin = () => {
    this.setState({ loading: true }, () => {
      let ok;
      let token = this.getCookie("Token");
      if (!token) {
        this.setState({ loading: false });
        return;
      }
      token = token ? token : "";
      fetch(`${Constant.host}/session?key=${token}`, {
        credentials: 'include'
      }).then(res => {
        if (ok = res.ok) {
          return res.json();
        }
        return Promise.resolve({
          tokenResponse: {}
        })
      }).then(tokenResponse => {
        if (!ok && token === "" && this.state.username) {
          window.showMessageModal("danger", "Session timed out", "Your session has timed out, please login again!");
        }
        this.setState({
          username: tokenResponse.username,
          displayName: tokenResponse.displayName,
          token: tokenResponse.token,
          userLink: tokenResponse.link,
          avatarLink: tokenResponse.avatarLink,
          followings: tokenResponse.followings,
          loading: false
        });
      });
      // this.setState({ loading: false });
    });
  }

  logout = () => {
    this.setState({ loading: true }, () => {
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
          avatarLink: undefined,
          followings: [],
          query: ""
        }, () => window.location.href = "/");
      })
    }
    );
  }

  checkSignup = (username, displayName, password, passwordConfirm) => {
    let ok = false;
    if (password !== passwordConfirm) {
      return { ok, err: "Passwords do not match!" };
    }
    const usernameRegex = /^[A-Za-z0-9_]{6,}$/;
    if (!usernameRegex.test(username)) {
      return { ok, err: "Username must only contain letters, numbers and underscore!" };
    }
    ok = true;
    return { ok };
  }

  signup = (username, displayName, password, passwordConfirm) => {
    const ok = this.checkSignup(username, displayName, password, passwordConfirm);
    let err;
    if (err = ok.err) {
      window.showMessageModal("danger", "Error", err);
      return;
    }
    if (ok) {
      let ok, err;
      fetch(`${Constant.host}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: username,
          displayName: displayName,
          password: password
        })
      }).then(res => {
        ok = res.ok;
        return res.json();
      }).then(result => {
        if (!ok) {
          err = result.err;
          window.showMessageModal("danger", "Error", err);
        }
      });
    }
  }

  navigateToProfile = username => {
    window.location.href = `/${username}`;
  }
  navigateToProfileCallback = () => this.navigateToProfile(this.state.username);

  handleSearch = (token, query) => {
    if (query === '') {
      this.setState({ loading: false, searchResult: [] });
      return;
    }
    fetch(`${Constant.host}/users?q=${query}&key=${token}`)
      .then(res => res.json())
      .then(result => this.setState({ searchResult: result, loading: false }));
  }
  handleSearchCallback = () => this.handleSearch(this.state.token, this.state.query);
  createFollow = (token, username, followedUsername) => {
    if (!followedUsername) return;
    let ok;

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
  };
  createFollowCallback = followedUsername => this.createFollow(this.state.token, this.state.username, followedUsername);
  deleteFollow = (token, username, followedUsername) => {
    if (!followedUsername) return;
    let ok;
    fetch(`${Constant.host}/users/${username}/follows?f=${followedUsername}&key=${token}`, {
      method: "DELETE"
    }).then(res => {
      ok = res.ok;
      console.log(ok);
      this.handleSearchCallback();
    });
  };
  deleteFollowCallback = followedUsername => this.deleteFollow(this.state.token, this.state.username, followedUsername);

  componentDidMount() {
    this.checkLogin();
  }

  render() {
    return (
      <Router>
        <div>
          <Route path="/">
            {this.state.username && this.state.token && this.state.userLink ?
              <NavigationBar displayName={this.state.username} avatarLink={`${Constant.host}${this.state.avatarLink}`}
                handleLogout={this.logout} handleNavigateToProfile={this.navigateToProfileCallback}
                query={this.state.query} onQueryChange={(e) => this.setState({ query: e.target.value }, this.handleSearchCallback)}
                onSearchFocus={() => this.setState({ isSearching: true })}
                onSearchExit={() => {
                  if (!this.state.searchResult || this.state.searchResult.length === 0)
                    this.setState({ isSearching: false, query: "" });
                }}
                handleSearch={this.handleSearchCallback}
                handleNavigateHome={() => {
                  this.setState({ isSearching: false, query: "" });
                  if (window.location.pathname !== "/") {
                    window.location.href = "/";
                  }
                }
                } />
              : ""
            }
            {this.state.loading ? <LoadingPage /> : ""}
            {this.state.isSearching === true ?
              <SearchResult matchingUsers={this.state.searchResult} sessionUser={this.state.username}
                handleFollow={this.createFollowCallback} handleUnfollow={this.deleteFollowCallback} />
              : ""
            }
            {/* <SearchResultItem username="binhdh" displayName="Binh Do" avatarLink="./images/test.jpg" /> */}
          </Route>
          <Switch>
            <Route exact path="/">
              {this.state.loading === true || this.state.isSearching === true ? "" :
                (this.state.username && this.state.token && this.state.userLink ?
                  <NewsFeed username={this.state.username} token={this.state.token}
                    userLink={this.state.userLink} handleUnauthorization={this.checkLogin} />
                  : <LoginPage isSignup={false} handleLogin={this.login} handleSignup={this.signup} />)
              }
            </Route>
            <Route exact path="/posts/:id" render={({ match }) =>
              this.state.username && this.state.token && this.state.userLink ?
                <FullPost id={match.params.id} username={this.state.username} token={this.state.token} userLink={this.state.userLink} />
                : ""
            }>
            </Route>
            <Route exact path="/:username" render={({ match }) =>
              !this.state.isSearching && (this.state.token || this.getCookie("Token")) ?
                <ProfilePage username={match.params.username} token={this.state.token ? this.state.token : this.getCookie("Token")}
                  canFollow={match.params.username !== this.state.username} sessionUser={this.state.username} currentFollowings={this.state.followings} />
                : window.location.href = "/"
            }>
            </Route>
          </Switch>
        </div>
        <Router path="/">
          <Footer />
        </Router>
      </Router>
    );
  }
}

export default App;
