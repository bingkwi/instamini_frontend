import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';

class NavigationBar extends Component {
    render() {
        return (
            <div className="bg-light">
                <nav className="navbar navbar-expand-lg navbar-light container">
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto d-flex justify-content-between w-100">
                            <li className="nav-item active">
                                <a className="nav-link" href="/">Instamini<span className="sr-only">(current)</span></a>
                            </li>
                            <li>
                                <form className="form-inline my-2 my-lg-0">
                                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit"><i className="fa fa-search" aria-hidden="true"></i></button>
                                </form>
                            </li>
                            <li className="nav-item dropdown ">
                                <button className="nav-link dropdown-toggle btn d-flex align-items-center p-0" id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <img src={this.props.avatarLink} className="img-fluid rounded-circle mr-3" style={{ objectFit: "cover", width: "35px", height: "35px" }} alt="" />
                                    {this.props.displayName.concat(" ")} </button>
                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                    <button className="dropdown-item" onClick={this.props.handleNavigateToProfile}>Profile</button>
                                    <button className="dropdown-item" onClick={this.props.handleLogout}>Log out</button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

export default NavigationBar;
