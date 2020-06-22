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

    render() {
        return (
            <div className="card container w-25 p-5">
                <div className="form-group">
                    <h1 className="nav-link text-center pb-4 pt-1" href="#">Instamini</h1>
                    <input type="email" className="form-control" placeholder="Username" id="username" value={this.state.username} onChange={e => this.setState({ username: e.currentTarget.value })} />
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" placeholder="Password" id="pwd" value={this.state.password} onChange={e => this.setState({ password: e.currentTarget.value })} />
                </div>
                <button type="submit" className="btn btn-primary" onClick={() => this.props.handleLogin(this.state.username, this.state.password)}>Log In</button>
                <hr></hr>
                <button type="submit" className="btn btn-success" onClick={this.props.onSwitch}>Sign Up</button>

            </div>
        );
    }
}

class SignUpPage extends Component {
    render() {
        return (
            <div className="card container w-25 p-5">
                <div className="form-group">
                    <h1 className="nav-link text-center pb-4 pt-1" href="#">Instamini</h1>
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" placeholder="Full name" id="fullName" />
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" placeholder="Username" id="username" />
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" placeholder="Password" id="pwd" />
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" placeholder="Confirm password" id="pwd" />
                </div>
            

            <button type="submit" className="btn btn-success">Sign Up</button>
            <hr></hr>
            <button type="submit" className="btn btn-primary" onClick={this.props.onSwitch}>Log In</button>
                
            </div >
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
                {this.state.isSignup ? <SignUpPage onSwitch={this.onSwitch} /> : <LoginPage handleLogin={this.props.handleLogin} onSwitch={this.onSwitch} /> }
            </div>
        );
    }
}

export default Pages;