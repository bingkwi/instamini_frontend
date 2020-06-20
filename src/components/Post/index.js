import React, { Component } from "react";
import Constant from '../../utils/Constants';

class User extends Component {
    render() {
        return (
            <div className="header container p-2 my-1 d-flex align-items-center justify-content-between">
                    <a className="d-flex align-items-center text-decoration-none text-dark ml-1 insta-bold" href={`/${this.props.username}`} aria-haspopup="true" aria-expanded="false"
                        style={{ fontSize: ".9rem" }}>
                        <img src={`${Constant.host}${this.props.userAvatar}`} 
                            className="img-fluid rounded-circle mr-2 ml-1" 
                            style={{ objectFit: "cover", width: "35px", height: "35px" }} 
                            alt="" />
                        <span className="ml-1">{this.props.username}</span>
                    </a>
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
                <div id={carouselId} className="carousel slide" data-ride="carousel" data-interval="0" onDoubleClick={this.props.onLike}>
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
                                    <img className="d-block w-100" src={`${Constant.host}${photo.link}`} alt="First slide" key="0" />
                                </div>;
                            } else {
                                return <div className="carousel-item">
                                    <img className="d-block w-100" src={`${Constant.host}${photo.link}`} alt="First slide" key={index} />
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
            return (<div onDoubleClick={this.props.onLike}>
                {this.props.photos.map(photo => <img src={`${Constant.host}${photo.link}`} className="card-img-top" alt="A photo" />)}
            </div>)
        }
    }
}

class Reaction extends Component {
    render() {
        return (
            <>
                <div className="mb-1" style={{ fontSize: "1.5rem" }}>
                    <button type="button" class="btn btn-lg btn-primary bg-transparent text-dark border-0 p-0 mr-2" onClick={this.props.onLikeClicked}>
                        <i className={this.props.liked ? "fas fa-heart fa-lg text-danger" : "far fa-heart fa-lg"}></i>
                    </button>
                    <button type="button" class="btn btn-lg btn-primary bg-transparent text-dark border-0 p-0" onClick={this.props.onCommentClicked}>
                        <i className="far fa-comment fa-lg" aria-hidden="true"></i>
                    </button>
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
                <a className="insta-bold text-decoration-none text-dark" href={`/${this.props.username}`}>{this.props.username}</a>
                <span className="card-text ml-1">{this.props.content}</span>
            </div>
        )
    }
}

class Caption extends Comment {

}

class CommentInput extends Component {
    constructor(props) {
        super(props);
        this.inputField = undefined;
    }
    focus = () => {
        this.inputField.focus();
    }
    render() {
        return (
            <div className="card-footer text-muted px-0 py-0 d-flex">
                <input ref={inputField => this.inputField = inputField} onChange={this.props.onChange} type="text" className="form-control border border-white" placeholder="Add a comment..." />
                <button className="btn btn-white text-primary">Post</button>
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
    constructor(props) {
        super(props);
        this.state = {
            ...props,
            liked: this.props.likedBy.some(like => like.username === this.props.sessionUser),
            pendingComment: ""
        };
        this.commentInput = undefined;
    }

    commitLike = (postId, token, willLike) => {
        console.log(`${this.props.id} is${this.state.liked ? "" : " not"} liked!`)
        fetch(`${Constant.host}/posts/${postId}/likes?key=${token}`,
        {
            method: willLike ? "POST" : "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(this.props.updatePosts);
    };

    createComment = postId => {

    };

    commitLikeCallback = () => this.commitLike(this.props.id, this.props.token, this.state.liked);

    render() {
        return (
            <div className="card container w-50 p-0 my-3">
                <User username={this.props.username} userAvatar={this.props.userAvatar} />
                <PhotoList photos={this.props.photos} postId={this.props.id} 
                    onLike={() => {this.setState({liked: true}, this.commitLikeCallback)}} />
                <div className="card-body px-3 py-2">
                    <Reaction likeCount={this.props.likeCount}
                        commentCount={this.props.commentCount}
                        liked={this.state.liked}
                        onLikeClicked={() => {this.setState({liked: !this.state.liked}, this.commitLikeCallback)}}
                        onCommentClicked={() => {this.commentInput.focus()}} />
                    <Caption content={this.props.caption} username={this.props.username} />
                    {this.props.comments.map(comment => <Comment {...comment} key={comment.id} />)}
                </div>
                <CommentInput ref={input => this.commentInput = input} 
                    onChange={() => this.setState({ pendingComment: this.commentInput.inputField.value.trim() })} />
            </div>
        );
    }
}

export default Post;