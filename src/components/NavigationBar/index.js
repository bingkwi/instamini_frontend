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
                                <a className="nav-link" href="#">Instamini<span className="sr-only">(current)</span></a>
                            </li>
                            <li>
                                <form className="form-inline my-2 my-lg-0">
                                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit"><i class="fa fa-search" aria-hidden="true"></i></button>
                                </form>
                            </li>
                            <li className="nav-item dropdown d-flex align-items-center">
                                <img src="./images/test.jpg" className="img-fluid rounded-circle mr-2" style={{objectFit: "cover", width: "35px", height: "35px"}} alt=""/>
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {this.props.displayName.concat(" ")} </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <a className="dropdown-item" href="#">Profile</a>
                                        <a className="dropdown-item" href="#">Log out</a>
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
