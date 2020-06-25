import React, { Component } from 'react';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props,
            username: "",
            password: "",
        };
    }

    onKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.props.handleLogin(this.state.username, this.state.password);
        }
    }

    render() {
        return (
            <form className="card container w-25 p-5" onSubmit={() => this.props.handleLogin(this.state.username, this.state.password)}>
                <div className="form-group">
                    <h1 className="nav-link text-center pb-4 pt-1" href="#">Instamini</h1>
                    <input type="text" className="form-control" placeholder="Username" id="username" required onKeyDown={this.onKeyDown}
                        value={this.state.username} onChange={e => this.setState({ username: e.currentTarget.value })} />
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" placeholder="Password" id="pwd" required onKeyDown={this.onKeyDown}
                        value={this.state.password} onChange={e => this.setState({ password: e.currentTarget.value })} />
                </div>
                <button type="submit" className="btn btn-primary">Log In</button>
                <hr></hr>
                <button type="submit" className="btn btn-success" onClick={this.props.onSwitch}>Sign Up</button>

            </form>
        );
    }
}

class SignUpPage extends Component {
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
            <form className="card container w-25 p-5" onSubmit={(e) => { e.preventDefault(); this.handleSignupCallback() }}>
                <div className="form-group">
                    <h1 className="nav-link text-center pb-4 pt-1" href="#">Instamini</h1>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Full name" required
                        id="fullName" value={this.state.displayName} onChange={e => this.setState({ displayName: e.target.value })} />
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Username" required
                        id="username" value={this.state.username} onChange={e => this.setState({ username: e.target.value })} />
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" placeholder="Password" id="pwd" required
                        value={this.state.password} onChange={e => this.setState({ password: e.target.value })} />
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" placeholder="Confirm password" id="pwd" required
                        value={this.state.passwordConfirm} onChange={e => this.setState({ passwordConfirm: e.target.value })} />
                </div>
                    <button type="submit" className="btn btn-success">Sign Up</button>
                <hr></hr>
                <button type="submit" className="btn btn-primary" onClick={this.props.onSwitch}>Log In</button>

            </form>
        );
    }
}

class Pages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props
        };
    }

    onSwitch = () => {
        this.setState({ isSignup: !this.state.isSignup });
    }
    render() {
        return (
            <div>
                {this.state.isSignup ? <SignUpPage onSwitch={this.onSwitch} handleSignup={this.props.handleSignup} />
                    : <LoginPage handleLogin={this.props.handleLogin} onSwitch={this.onSwitch} />}
            </div>
        );
    }
}

export default Pages;