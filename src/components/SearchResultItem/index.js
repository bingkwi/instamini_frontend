import React, { Component } from "react";
import Constant from "../../utils/Constants";
class SearchResultItem extends Component {
    handleFollow = () => {
        if (this.props.followed) {
            this.props.handleUnfollow(this.props.username);
        } else {
            this.props.handleFollow(this.props.username);
        }
    };

    render() {
        return (
            <div className="d-flex align-items-center w-50 py-1 my-1 container">
                <div className="w-100 d-flex align-items-center">
                    <a href={`/${this.props.username}`}>
                        <img src={`${Constant.host}${this.props.avatarLink}`} alt="none" className="rounded-circle" width="60px" height="60px" style={{ objectFit: "cover" }} />
                    </a>
                    <div className="w-100 ml-3">
                        <a className="d-block text-decoration-none text-dark" href={`/${this.props.username}`} style={{ fontWeight: "600" }}>{this.props.username}</a>
                        <span className="d-block">{this.props.displayName}</span>
                    </div>
                </div>
                {
                    this.props.isSelf ? "" :
                        (this.props.followed ? 
                        <button className="btn btn-secondary" onClick={this.handleFollow}>Unfollow</button>
                        : <button className="btn btn-primary" onClick={this.handleFollow}>Follow</button>)
                }
            </div>
        );
    }
}

export default SearchResultItem;