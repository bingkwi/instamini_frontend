import React, { Component } from 'react';

class LoginPage extends Component {
    render() {
        return (
            <div className="card container w-25 p-5">
                <div className="form-group">
                    {/* <label for="email">Email address:</label>    */}
                    <h1 className="nav-link text-center pb-4 pt-1" href="#">Instamini</h1>
                    <input type="email" className="form-control" placeholder="Enter username" id="email" />
                </div>
                <div className="form-group">
                    {/* <label for="pwd">Password:</label> */}
                    <input type="password" className="form-control" placeholder="Enter password" id="pwd" />
                </div>
                <div className="form-group form-check">
                    <label className="form-check-label">
                        <input className="form-check-input" type="checkbox" /> Remember me
                    </label>
                </div>
                <button type="submit" className="btn btn-primary">Log In</button>
                <hr></hr>
                <button type="submit" className="btn btn-success">Sign Up</button>

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
                    <input type="email" className="form-control" placeholder="Email" id="email" />
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
                <div className="form-group form-check">
                    <label className="form-check-label">
                        <input className="form-check-input" type="checkbox" /> Remember me
                    </label>
                </div>
              
                <button type="submit" className="btn btn-success">Sign Up</button>
                <hr></hr>
                <button type="submit" className="btn btn-primary">Log In</button>
                
            </div>
        );
    }
}

class Pages extends Component {
    render(){
        return(
            <div>
                <LoginPage />
                <SignUpPage />
            </div>
        );
    }
}

export default Pages;