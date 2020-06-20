import React, { Component } from "react";
import Constants from '../../utils/Constants';

class User extends Component {
    render() {
        return (
            <div className="header container p-2 my-1 d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                    <img src={`${Constants.host}${this.props.userAvatar}`} className="img-fluid rounded-circle mr-2 ml-1" style={{ objectFit: "cover", width: "35px", height: "35px" }} alt="" />
                    <a className="text-decoration-none text-dark ml-1 insta-bold" href="#" aria-haspopup="true" aria-expanded="false"
                        style={{ fontSize: ".9rem" }}>
                        {this.props.username} </a>
                </div>
                <OptionDropdown />
            </div>
        );
    }
}

class PhotoList extends Component {
    render() {
        const carouselId = `pcrs_${this.props.postId}`;
        if (this.props.photos.length > 1)
            return (
                <div id={carouselId} className="carousel slide" data-ride="carousel" data-interval="0">
                    <ol className="carousel-indicators">
                        {this.props.photos.map((photo, index) => {
                            if (index === 0) {
                                return <li data-target={`#${carouselId}`} data-slide-to="0" className="active" key={index}></li>;
                            } else {
                                return <li data-target={`#${carouselId}`} data-slide-to={index} key={index}></li>
                            }
                        })}
                    </ol>
                    <div className="carousel-inner" role="listbox">
                        {this.props.photos.map((photo, index) => {
                            if (index === 0) {
                                return <div className="carousel-item active">
                                    <img className="d-block w-100" src={`${Constants.host}${photo.link}`} alt="First slide" key="0" />
                                </div>;
                            } else {
                                return <div className="carousel-item">
                                    <img className="d-block w-100" src={`${Constants.host}${photo.link}`} alt="First slide" key={index} />
                                </div>;
                            }
                        })}
                    </div>
                    <a className="carousel-control-prev" href={`#${carouselId}`} role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon m-0" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href={`#${carouselId}`} role="button" data-slide="next">
                        <span className="carousel-control-next-icon m-0" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>

            );
        else {
            return (<div>
                {this.props.photos.map(photo => <img src={`${Constants.host}${photo.link}`} className="card-img-top" alt="A photo" />)}
            </div>)
        }
    }
}

class Reaction extends Component {
    render() {
        return (
            <>
                <div style={{ fontSize: "1.5rem" }}>
                    <i className="far fa-heart fa-md mr-2"></i>
                    <i className="far fa-comment fa-md ml-2" aria-hidden="true"></i>
                </div>

                <div>
                    <span>{`${this.props.likeCount} ${this.props.likeCount > 1 ? "likes" : "like"}, ${this.props.commentCount} ${this.props.commentCount > 1 ? "comments" : "comment"}`}</span>
                </div>
            </>
        )
    }
}

class Comment extends Component {
    render() {
        return (
            <div>
                <a className="insta-bold text-decoration-none text-dark" href="#">{this.props.username}</a>
                <span className="card-text ml-1">{this.props.content}</span>
            </div>
        )
    }
}

class Caption extends Comment {

}

class CommentInput extends Component {
    render() {
        return (
            <div className="card-footer text-muted px-0 py-0 d-flex">
                <input type="text" className="form-control border border-white" name="" id="" placeholder="Add a comment..." />
                <a name="" id="" className="btn btn-white text-primary" href="#" role="button">Post</a>
            </div>
        );
    }
}

class OptionDropdown extends Component {
    render() {
        return (
            <div>
                <button className="nav-link fas fa-ellipsis-h fa-md mr-n2 text-dark bg-transparent border-0" href="#" id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                </button>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                    <button className="dropdown-item row m-0 pl-2">
                        <i className="fas fa-edit fa-sm col-sm-4"></i>
                            Edit
                        </button>
                    <button className="dropdown-item row m-0 pl-2">
                        <i className="fas fa-times fa-sm col-sm-4"></i>
                            Delete
                    </button>
                </div>
            </div>
        )
    }
}

class Post extends Component {
    render() {
        return (
            <div className="card container w-50 p-0 my-3">
                <User username={this.props.username} userAvatar={this.props.userAvatar} />
                <PhotoList photos={this.props.photos} postId={this.props.id} />
                <div className="card-body px-3 py-2">
                    <Reaction likeCount={this.props.likeCount}
                        commentCount={this.props.commentCount} />
                    <Caption content={this.props.caption} username={this.props.username} />
                    {this.props.comments.map(comment => <Comment {...comment} key={comment.id} />)}
                </div>
                
                <CommentInput />
            </div>
        );
    }
}

export default Post;